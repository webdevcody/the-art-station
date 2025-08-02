import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground text-lg">
            <strong>Last updated:</strong> January 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Addie's Art Station website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials on Addie's Art Station for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Purchasing Terms</h2>
            
            <h3 className="text-xl font-medium mb-3">Order Acceptance</h3>
            <p className="text-muted-foreground mb-4">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product information, or fraud prevention.
            </p>

            <h3 className="text-xl font-medium mb-3">Pricing</h3>
            <p className="text-muted-foreground mb-4">
              All prices are listed in USD and are subject to change without notice. We make every effort to ensure price accuracy, but errors may occur. If we discover a pricing error after you've placed an order, we'll contact you to inform you of the correct price.
            </p>

            <h3 className="text-xl font-medium mb-3">Payment</h3>
            <p className="text-muted-foreground">
              Payment is processed securely through Stripe. By providing payment information, you represent that you are authorized to use the payment method and authorize us to charge your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping and Returns</h2>
            <p className="text-muted-foreground mb-4">
              Shipping terms and return policies are detailed on our Shipping page. By purchasing from us, you agree to these policies.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>30-day return policy for most items</li>
              <li>Items must be returned in original condition</li>
              <li>Customer is responsible for return shipping costs unless item is defective</li>
              <li>Refunds processed within 5-7 business days after receipt</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Safeguarding the password and all activities under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information remains accurate and up-to-date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All artwork, images, text, graphics, logos, and other content on this website are the property of Addie's Art Station or the respective artists and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="text-muted-foreground mb-4">You may not use our website:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>For any unlawful purpose or to solicit others to engage in unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
            <p className="text-muted-foreground">
              The materials on Addie's Art Station website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall Addie's Art Station or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of California, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>Email: legal@artstation.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Art Street, Creative City, CA 90210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}