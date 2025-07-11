# DFW Residential Landing Page - Portable Bundle

This is a self-contained, portable version of the DFW Residential Landing Page from Legacy Industrial Coatings. It includes all necessary components, assets, and dependencies to be easily integrated into any React project.

## Package Contents

```
dfw-res-landing/
├── DFWResLanding.tsx           # Main page component with scoped styles
├── DFWResLanding.css           # Complete CSS file with all styles
├── components/                 # All required components
│   ├── LandingMinimalHeader.tsx
│   ├── LandingMinimalFooter.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── TrustedBrandSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── GalleryPreview.tsx
│   ├── CommercialSection.tsx
│   ├── CTASection.tsx
│   └── ui/                     # UI components
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts                # Utility functions
├── assets/                     # All images and assets
│   └── lovable-uploads/        # Image files (16 total)
├── package.json                # Dependencies
└── README.md                   # This file
```

## Assets Included

The bundle includes 16 essential images:
- Logo and branding images
- Hero section images  
- Feature showcase images
- Gallery preview images
- Commercial application images
- Trust indicators and testimonials

## Integration Instructions

### Step 1: Install Dependencies

```bash
npm install react-helmet-async react-router-dom lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

### Step 2: Copy Files

1. Copy the entire `dfw-res-landing/` directory to your project root
2. Move assets to your public directory:
   ```bash
   mkdir -p public/assets
   cp -r dfw-res-landing/assets/* public/assets/
   ```

### Step 3: Add Route

In your main App.tsx or routing file:

```tsx
import DFWResLanding from './dfw-res-landing/DFWResLanding';

// Add this route to your router
<Route path="/dallas" element={<DFWResLanding />} />
```

### Step 4: Helmet Provider (if not already present)

Wrap your app with HelmetProvider:

```tsx
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      {/* Your app content */}
    </HelmetProvider>
  );
}
```

## Features

- **Responsive Design**: Fully responsive across all device sizes
- **Scoped Styles**: All styles are scoped to prevent conflicts
- **Self-Contained**: No external dependencies beyond React ecosystem
- **SEO Optimized**: Complete meta tags and structured data
- **Performance Optimized**: Lazy loading and optimized images

## Customization

### Styling
- Edit `DFWResLanding.css` to modify colors, spacing, or layout
- All styles are scoped to `.dfw-res-landing` class
- CSS custom properties make theme changes easy

### Content
- Modify component files in `components/` directory
- Update images in `assets/lovable-uploads/` 
- Change navigation paths in components as needed

### Navigation
The components currently expect these routes:
- `/quotedfw` - Quote form
- `/gallery` - Gallery page

Update these paths in the components to match your project's routing.

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## License

MIT License - See the original project for full license details.

## Support

For issues with this portable bundle, refer to the original Legacy Industrial Coatings project or modify the components as needed for your specific use case.