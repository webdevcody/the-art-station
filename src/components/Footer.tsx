import { authClient } from "@/lib/auth-client";

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
                <a href="#" className="hover:text-foreground transition-colors">
                  Browse Art
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Featured Artists
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Shipping
                </a>
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
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Art Station. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296C4.165 14.81 3.662 13.628 3.662 12.3c0-1.297.49-2.448 1.296-3.316C5.84 7.165 7.022 6.662 8.35 6.662c1.297 0 2.448.49 3.316 1.296.882.882 1.384 2.064 1.384 3.392 0 1.297-.49 2.448-1.296 3.316-.882.882-2.064 1.384-3.392 1.384zm7.718-1.296c-.882.882-2.064 1.384-3.392 1.384-1.297 0-2.448-.49-3.316-1.296C8.577 14.898 8.074 13.716 8.074 12.388c0-1.297.49-2.448 1.296-3.316.882-.882 2.064-1.384 3.392-1.384 1.297 0 2.448.49 3.316 1.296.882.882 1.384 2.064 1.384 3.392 0 1.297-.49 2.448-1.296 3.316z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
