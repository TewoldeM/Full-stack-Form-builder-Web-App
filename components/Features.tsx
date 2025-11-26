import { Bot, Shield, Palette, BarChart3, Lock, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Creation",
      description:
        "Describe your needs and watch AI build professional forms instantly.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance features to protect your data.",
    },
    {
      icon: Palette,
      title: "Complete Customization",
      description:
        "Custom domains, themes, and branding to match your business identity.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Detailed insights and reporting to optimize your form performance.",
    },
    {
      icon: Lock,
      title: "HIPAA Compliance",
      description:
        "Healthcare-ready infrastructure with BAA, audit logging, and PHI protection.",
    },
    {
      icon: Zap,
      title: "Powerful Integrations",
      description:
        "Connect with your favorite tools including CRMs, email platforms, and more.",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Powerful Features for Professional Forms
        </h2>

        <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
          Everything you need to create, manage, and optimize your business
          forms.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-500 to-brand-purple rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
