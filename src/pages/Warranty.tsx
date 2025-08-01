import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";

const Warranty = () => {
  return (
    <>
      <Helmet>
        <title>Warranty Information - Legacy Industrial Coatings</title>
        <meta 
          name="description" 
          content="Legacy Industrial Coatings Limited Lifetime Warranty for garage floor coatings. Learn about our warranty coverage, terms, and conditions."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">Legacy Industrial Coatings</h1>
                <hr className="border-primary mb-6" />
                <h2 className="text-2xl font-semibold text-primary">LIMITED LIFETIME WARRANTY</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Garage Floor Coatings</h3>
                  <p className="mb-2"><strong>Effective Date:</strong> January 2025</p>
                  <p className="mb-2"><strong>Warranty Issued By:</strong> Legacy Industrial Coatings, LLC</p>
                  <p><strong>Applicable To:</strong> Residential Garage Floor Coatings Installed by Legacy Industrial Coatings</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Coverage Terms</h3>
                  <p className="mb-4">
                    Legacy Industrial Coatings, LLC ("Legacy") provides a Limited Lifetime Warranty for garage 
                    floor coatings installed by Legacy Industrial Coatings, exclusively for residential use. This 
                    warranty covers delamination, chipping, and peeling caused by improper installation under 
                    normal daily use.
                  </p>
                  <p className="mb-4">
                    This warranty applies only to the original purchaser and is valid for as long as the purchaser 
                    owns the property in which the product was originally installed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Warranty Coverage by Package</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">• Gold Package:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Interior Spaces: Lifetime Warranty</li>
                      <li>Exterior Spaces: 15-Year Warranty</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">• Silver Package:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Interior Spaces: 15-Year Warranty</li>
                      <li>Exterior Spaces: 10-Year Warranty</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">• Single Coat System:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Interior Spaces: 10-Year Warranty</li>
                      <li>Exterior Spaces: 5-Year Warranty</li>
                    </ul>
                  </div>

                  <p className="text-sm italic bg-yellow-50 p-3 rounded">
                    <strong>Note*</strong> Warranty lengths may be amended based on floor conditions, this will be 
                    written out, described, and signed by customer on job quotes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Definition of Lifetime</h3>
                  <p>
                    "Lifetime" refers to the duration of ownership by the original purchaser. If the original 
                    purchaser transfers ownership to a family member, coverage may extend, provided the 
                    product remains installed at the same property and no commercial use has occurred.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Limitations and Exclusions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Abuse, misuse, or neglect</li>
                    <li>Impact damage, burns, or surface scratches due to objects being dragged on floor</li>
                    <li>Hydrostatic pressure or moisture vapor transmission</li>
                    <li>Structural movement, shifting, or settling of the substrate</li>
                    <li>Use of de-icing chemicals, battery acid, or corrosive substances</li>
                    <li>Acts of God or natural disasters (e.g., flooding, earthquakes)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Claims Process</h3>
                  <p className="mb-4">
                    All warranty claims must be submitted to Legacy Industrial Coatings, along with proof of 
                    purchase and photographs of the affected area. Legacy reserves the right to inspect the site 
                    and determine the validity of the claim.
                  </p>
                  <p>
                    If a valid claim is determined, Legacy may, at its sole discretion, repair or replace the 
                    affected area.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Transferability</h3>
                  <p>
                    This warranty is non-transferable beyond the original purchaser or their immediate family. 
                    It is voided upon sale of the property to a third party not related to the original purchaser.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Disclaimer</h3>
                  <p>
                    This Limited Lifetime Warranty is the exclusive warranty provided by Legacy Industrial 
                    Coatings. No other warranties, expressed or implied, including warranties of 
                    merchantability or fitness for a particular purpose, shall apply.
                  </p>
                </div>

                <div className="text-center pt-8">
                  <p className="font-semibold">Authorized Representative</p>
                  <p className="mt-2">Legacy Industrial Coatings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Warranty;