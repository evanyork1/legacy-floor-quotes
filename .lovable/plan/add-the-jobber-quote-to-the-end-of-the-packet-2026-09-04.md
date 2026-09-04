# Add the Jobber quote to the end of the packet

Today the builder is four fixed pages ending with "Schedule and investment", where the price is one number typed by hand. A real Jobber quote like #1375 has six line items, long descriptions, alternates, and a total — none of that fits in one box.

The fix: an upload step. You drop the Jobber quote PDF into the builder and it becomes extra branded pages at the end of the packet, styled to match pages 1–4, that the customer can read line by line.

## What you'll do

1. Fill out the four pages the way you do now.
2. New section at the bottom of the form: "Jobber quote" with a "Choose PDF" button.
3. Pick the quote PDF straight off your computer. The builder reads it and shows every line item it found — product/service, description, quantity, price.
4. Everything is editable before it prints. You can fix wording, delete a line, reorder, or add a line the PDF didn't catch. Nothing is locked to the file.
5. The preview immediately grows by however many pages the line items need (usually 2–3), and "Download PDF" exports the whole packet as one document.

## What the new pages look like

Branded to match the rest of the packet: navy header band with the Legacy logo, the quote number and the recipient, footer with page numbers and contact line.

Each line item prints as a block, not a cramped table row:

```text
  U-1  Main walkway — diamond grind + high-traffic urethane      2,223 sq ft
       Full diamond grind required to remove shot blasting
       lines as well as existing line striping...
                                                                  $14,449.50
```

Lines never split awkwardly across a page break — a block that doesn't fit moves whole to the next page, and pages are added automatically until everything fits.

The last quote page carries the total, the deposit terms line, and a signature/date row, matching how the Jobber quote closes.

## Handling your example quote

Quote #1375 has "Not included" rows and a $0.00 total because it's built as alternates. So:

- Rows the PDF marks "Not included" are imported but flagged, and you decide per line whether it prints as part of the total or as an option.
- The total is a field you can type over. If the packet is options-based you can leave it blank, and the page prints subtotals per line instead of a misleading grand total.

## If the PDF doesn't read cleanly

Every Jobber PDF is laid out the same way, so this should parse reliably. If a line ever comes through garbled, there's a "Paste quote text" box as a backup — paste the copied text and it splits into the same editable list. Either way you're never blocked.

## Technical notes

- All work stays inside `public/packetsformat.html`; no other page or route changes.
- PDF reading happens in the browser with pdf.js (loaded locally, no upload to any server) using `getTextContent()` positional data to group rows into line items. The file never leaves your machine.
- New quote pages are generated DOM pages appended after page 4, drawn with CSS rather than a fixed background plate, using the same navy/typography tokens already in the file, so pagination can be dynamic.
- The existing shrink-to-fit logic is reused per description block; overflow triggers a page break instead of shrinking past the minimum size.
- The PDF export path is extended to rasterize/emit the new pages in the same document as the four plate pages.
- Line items are added to the autosave/JSON state so Save, Load, and Copy data continue to round-trip a complete packet.
