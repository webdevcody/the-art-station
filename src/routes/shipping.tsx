import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Shipping Information</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Shipping Methods & Rates</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Domestic Shipping (US)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Standard (5-7 business days)</span>
                    <span className="font-medium">$8.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express (2-3 business days)</span>
                    <span className="font-medium">$14.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overnight (1 business day)</span>
                    <span className="font-medium">$24.99</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between font-semibold text-green-600">
                      <span>Free shipping on orders over $75!</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">International Shipping</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Canada (10-14 business days)</span>
                    <span className="font-medium">$19.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Europe (10-14 business days)</span>
                    <span className="font-medium">$24.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Australia/Asia (14-21 business days)</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                  <div className="pt-2 border-t border-border text-sm text-muted-foreground">
                    <p>* Customs fees and import duties may apply</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Packaging & Protection</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                We take great care in packaging your artwork to ensure it arrives in perfect condition:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Artwork is carefully wrapped in acid-free tissue paper</li>
                <li>• Protected with bubble wrap and foam padding</li>
                <li>• Placed in custom-sized, rigid cardboard mailers</li>
                <li>• Marked as "FRAGILE - ARTWORK" for careful handling</li>
                <li>• Tracking information provided for all shipments</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Processing Time</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Standard Orders</h3>
                <p className="text-muted-foreground">
                  Most orders are processed and shipped within 1-2 business days of payment confirmation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Large or Special Orders</h3>
                <p className="text-muted-foreground">
                  Larger pieces or special requests may require additional processing time. We'll contact you with expected timelines.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Tracking Your Order</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                Once your order ships, you'll receive:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Email confirmation with tracking number</li>
                <li>• Real-time tracking updates</li>
                <li>• Delivery confirmation</li>
                <li>• SMS notifications (optional)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">International Customers</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                For international orders, please note:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Customs forms are completed accurately for faster processing</li>
                <li>• You are responsible for any customs fees, duties, or taxes</li>
                <li>• Delivery times may vary due to customs processing</li>
                <li>• Some countries may have restrictions on certain materials</li>
              </ul>
            </div>
          </section>

          <div className="mt-16 text-center bg-gradient-to-r from-gradient-primary to-gradient-secondary text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Questions about shipping?</h2>
            <p className="mb-6 opacity-90">
              Our customer service team is here to help with any shipping questions or concerns.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}