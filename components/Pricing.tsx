import { Check, Rocket, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      period: "FOREVER!",
      features: [
        "3 active forms",
        "100 responses/month",
        "Basic field types",
        "Basic templates",
        "Email notifications",
      ],
      buttonText: "🚀 GET STARTED",
      buttonClass: "bg-brand-blue text-white hover:bg-brand-blue/90",
      bgColor: "bg-blue-50",
      borderColor: "border-brand-blue",
      badge: null,
    },
    {
      name: "PRO",
      price: "$39",
      period: "Most Popular\n/month",
      features: [
        "100 forms",
        "10,000 responses/month",
        "All 19 advanced field types",
        "Premium templates (20+)",
        "Custom themes & branding",
        "Advanced analytics",
      ],
      buttonText: "🌟 GET STARTED",
      buttonClass: "bg-brand-purple text-white hover:bg-brand-purple/90",
      bgColor: "bg-purple-50",
      borderColor: "border-brand-purple",
      badge: "⚡ MOST POPULAR",
    },
    {
      name: "HIPAA",
      price: "$99",
      period: "Healthcare Compliance\n/month",
      features: [
        "Unlimited forms & responses",
        "HIPAA-compliant infrastructure",
        "Business Associate Agreement",
        "Team collaboration (10 members)",
        "Audit logging & encryption",
        "Compliance support",
      ],
      buttonText: "📋 LEARN MORE",
      buttonClass: "bg-brand-green text-white hover:bg-brand-green/90",
      bgColor: "bg-green-50",
      borderColor: "border-brand-green",
      badge: null,
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-20 bg-gradient-to-b from-white to-brand-blueLight"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>

        <p className="text-xl text-center text-muted-foreground mb-16">
          Choose the plan that fits your needs. No hidden fees, no surprises.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.bgColor} ${plan.borderColor} border-4 rounded-2xl p-8 hover:shadow-2xl transition-shadow relative`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-purple text-white px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="text-5xl font-bold text-foreground mb-1">
                  {plan.price}
                </div>
                <div className="text-sm font-semibold text-foreground whitespace-pre-line">
                  {plan.period}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom enterprise solution?
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-navy-light transition-colors font-bold">
            Contact Sales for Enterprise
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
