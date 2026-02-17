

## Splash Screen: Residential vs. Commercial Selector

### What We're Building
A sleek, full-screen landing page at `/` with a black background and two blue buttons ("Residential" and "Commercial"). This replaces the current behavior where `/` loads the DFW residential page directly.

### User Flow
- **Visit `/`** --> See black splash screen with Legacy logo + two buttons
- **Click "Residential"** --> Navigate to `/dfw` (current home page content)
- **Click "Commercial"** --> Navigate to `/commercialfloors` (new placeholder page)

### Design
- Full-screen black background with centered content
- Legacy logo at the top
- Subtle tagline text
- Two large blue buttons with white text, styled with hover effects and subtle animations (fade-in on load)
- Clean, premium feel matching the brand

### Changes

**1. New file: `src/pages/SplashSelect.tsx`**
- Full-screen black background (`min-h-screen bg-black`)
- Legacy logo centered at top
- Brief tagline in white/gray text
- Two large blue buttons side-by-side (stacked on mobile):
  - "Residential" --> navigates to `/dfw`
  - "Commercial" --> navigates to `/commercialfloors`
- Fade-in animation on mount using CSS

**2. New file: `src/pages/CommercialFloors.tsx`**
- Simple placeholder page with black background
- "Commercial Floors - Coming Soon" heading
- Brief message
- Back button to return to `/`

**3. Update `src/App.tsx`**
- Change `/` route from `<DFW />` to `<SplashSelect />`
- Keep `/dfw` route pointing to `<DFW />` (so residential content still accessible)
- Add `/commercialfloors` route pointing to `<CommercialFloors />`

### Technical Details

The splash page will use `useNavigate()` from react-router-dom. Buttons will use the brand blue (`bg-blue-600 hover:bg-blue-700`) with white text, rounded corners, and a subtle scale transform on hover. The page will have a simple fade-in CSS animation for a polished entrance. The Legacy logo (`/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png`) will be displayed above the buttons.

