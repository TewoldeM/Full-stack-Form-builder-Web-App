import { FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-brand-pink" />
          <span className="text-xl font-bold text-foreground">FormBuilder</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#solutions"
            className="text-foreground hover:text-brand-blue transition-colors"
          >
            Solutions
          </a>
          <a
            href="#templates"
            className="text-foreground hover:text-brand-blue transition-colors"
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="text-foreground hover:text-brand-blue transition-colors"
          >
            Pricing
          </a>
          <a
            href="#hipaa"
            className="text-foreground hover:text-brand-blue transition-colors"
          >
            HIPAA
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-brand-blue transition-colors">
            Sign in
          </button>
          <button className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors font-medium">
            Get Started Free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
