import { FileText } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Templates"],
    Solutions: [
      "All Industries",
      "Healthcare",
      "Real Estate",
      "Digital Agencies",
      "Legal Services",
    ],
    Company: ["About Us", "Contact"],
    Support: ["Help Center"],
    Compliance: ["HIPAA", "Security", "BAA"],
  };

  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="border-t border-navy-light pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 text-lg mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span>HIPAA-ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span>BAA available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span>Encryption at rest & in transit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span>Built on Google Cloud</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-pink-500" />
              <span className="text-2xl font-bold">FormBuilder</span>
            </div>
            <p className="text-lg text-gray-400">
              The easiest way to create beautiful forms and collect responses.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4 text-xl">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-lg text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 FormBuilder. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
