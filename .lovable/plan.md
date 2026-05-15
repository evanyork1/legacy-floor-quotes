## Problem

JivoChat renders its widget inside **Shadow DOM** (the `<jdiv>` host element attaches a shadow root). The current script in `index.html` uses `document.querySelector(...)` and `jivoWidget.querySelectorAll(...)`, which cannot see elements inside a shadow root. That's why clicking "Book an estimate" does nothing — the listener is never attached.

The session replay confirms the button is in fact rendering ("Text 'Book an estimate' appeared in chat interface"), but our selector never finds it.

## Fix

Replace the hijack script in `index.html` with one that:

1. **Recursively walks all shadow roots** on the page to find every element, not just light-DOM ones.
2. Matches any element whose trimmed text equals `book an estimate` (case-insensitive) — covers `<button>`, `<a>`, `<div role="button">`, etc., since Jivo's exact tag isn't guaranteed.
3. Uses **event delegation on `document`** in the capture phase as a backup, so even buttons inside shadow DOM that bubble events through the host get intercepted (`event.composedPath()` reveals the real target inside shadow DOM).
4. Keeps the `MutationObserver` + interval fallback so dynamically-rendered chat steps are caught.
5. Opens the booking URL in a new tab via `window.open(url, '_blank')` (preserves the chat session — a same-tab redirect would close the conversation).

### Technical sketch

```js
function findInShadows(root, predicate, hits = []) {
  const all = root.querySelectorAll('*');
  for (const el of all) {
    if (predicate(el)) hits.push(el);
    if (el.shadowRoot) findInShadows(el.shadowRoot, predicate, hits);
  }
  return hits;
}

// Backup: capture-phase delegation using composedPath()
document.addEventListener('click', (e) => {
  const target = e.composedPath().find(
    (n) => n.nodeType === 1 &&
           n.innerText &&
           n.innerText.trim().toLowerCase() === 'book an estimate'
  );
  if (target) {
    e.preventDefault();
    e.stopPropagation();
    window.open(bookingUrl, '_blank');
  }
}, true);
```

## File to change

- `index.html` — replace the existing hijack `<script>` block (added in the prior turn) with the shadow-DOM-aware version above. No other files touched.

## Verification

After the change, open the preview, trigger the chat, click **Book an estimate**, and confirm the Jobber booking page opens in a new tab.
