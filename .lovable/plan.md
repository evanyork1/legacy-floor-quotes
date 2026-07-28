## Change requested
Remove the contact form section at the very end of the Residential Garage Floors page.

## Location to remove
File: `src/pages/ResidentialGarageFloors.tsx`  
Lines: ~440-449 (the `Contact Form Section` with `<LeadForm />` inside a `bg-slate-50` section, just above the `<BookingModal>`).

## Plan
1. Remove the entire `{/* Contact Form Section */}` block from `src/pages/ResidentialGarageFloors.tsx`.
2. Verify that `LeadForm` import is still needed by other parts of the page. If not, remove the unused import.
3. Run a type check to ensure no errors remain.

This will leave the page ending with the CTA section, then the BookingModal, then the Footer.