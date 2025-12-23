import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: ["All Products", "Vegetables", "Fruits", "Dairy", "Seasonal"],
    company: ["About Us", "How It Works", "For Farmers", "Sustainability"],
    support: ["FAQs", "Contact", "Delivery Info", "Returns"],
  };

  return (
    <footer className="bg-foreground text-background mt-20 noise-overlay">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl text-background">
                Local<span className="italic text-primary">Bazar</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-8">
              Bridging the gap between local farmers and conscious consumers. 
              Fresh, sustainable, and community-driven.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-background/60 hover:text-primary text-sm font-medium transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-background mb-6">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-background mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-background mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-background mb-6">Stay Fresh</h4>
            <p className="text-background/60 text-sm mb-4">
              Get weekly picks and farmer stories.
            </p>
            <Link 
              to="#" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Subscribe
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/50">
            © 2024 LocalBazar. Supporting local farmers with every order.
          </p>
          <div className="flex gap-6 text-xs text-background/50">
            <Link to="#" className="hover:text-background/70 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-background/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;