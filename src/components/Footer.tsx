import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const { data: sessionData } = authClient.useSession();

  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-gradient-primary to-gradient-secondary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-semibold">Art Station</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting young artists and bringing unique artwork to collectors
              worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Gallery</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-foreground transition-colors">
                  Browse Art
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-foreground transition-colors">
                  Shipping
                </Link>
              </li>
              {!sessionData && (
                <li>
                  <button
                    onClick={handleSignIn}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Addie's Art Station. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
}
