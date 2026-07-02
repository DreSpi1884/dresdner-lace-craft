import { useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const Quote = () => {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    laceType: [] as string[],
    widths: "",
    usage: [] as string[],
    certified: [] as string[],
    quantity: [] as string[],
    name: "",
    company: "",
    email: "",
  });

  const toggleMulti = (key: "laceType" | "usage" | "certified" | "quantity", value: string) => {
    setForm((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const updateForm = (key: "widths" | "name" | "company" | "email", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const OptionButton = ({
    label,
    selected,
    onClick,
    subtitle,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
    subtitle?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-6 py-4 border transition-all duration-200 editorial-body-sm ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground/30"
      }`}
    >
      {label}
      {subtitle && (
        <span className={`block text-xs mt-1 ${selected ? "text-background/70" : "text-muted-foreground"}`}>
          {subtitle}
        </span>
      )}
    </button>
  );

  if (submitted) {
    return (
      <EditorialLayout>
        <section className="editorial-section">
          <div className="editorial-container max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-8">
              <Check size={32} />
            </div>
            <h1 className="editorial-heading-lg text-foreground mb-6">Thank you for your inquiry</h1>
            <p className="editorial-body text-muted-foreground">
              We have received your quote request and will respond within 2 business days
              with a tailored proposal. Our team looks forward to working with you.
            </p>
          </div>
        </section>
      </EditorialLayout>
    );
  }

  return (
    <EditorialLayout title="Let's create something together">
      <section className="editorial-section">
        <div className="editorial-container max-w-2xl mx-auto">
          <p className="editorial-body text-muted-foreground mb-12">
            Answer 5 short questions to receive a tailored quote. It takes less than a minute.
          </p>

          {/* Progress */}
          <div className="flex gap-1.5 mb-12">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 transition-colors duration-300 ${
                  s <= step ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Step 1 - Multi-select */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="editorial-heading-sm text-foreground">What type of lace do you need?</h2>
              <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Elastic", "Inelastic", "Both", "Not sure"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={form.laceType.includes(opt)}
                    onClick={() => toggleMulti("laceType", opt)}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                disabled={form.laceType.length === 0}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="editorial-heading-sm text-foreground">Required widths?</h2>
              <p className="editorial-body-sm text-muted-foreground">Please specify the desired widths in mm or cm.</p>
              <input
                type="text"
                value={form.widths}
                onChange={(e) => updateForm("widths", e.target.value)}
                placeholder="e.g., 15mm, 30mm, 50mm"
                className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 3 - Multi-select with Custom subtitle */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="editorial-heading-sm text-foreground">Design or usage?</h2>
              <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Lingerie" },
                  { label: "Outerwear" },
                  { label: "Technical" },
                  { label: "Custom", subtitle: "Requires large scale production" },
                  { label: "Not sure" },
                ].map((opt) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    subtitle={opt.subtitle}
                    selected={form.usage.includes(opt.label)}
                    onClick={() => toggleMulti("usage", opt.label)}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                disabled={form.usage.length === 0}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 4 - Multi-select with tooltip */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <h2 className="editorial-heading-sm text-foreground">Do you require certified materials?</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center justify-center cursor-help text-muted-foreground hover:text-foreground transition-colors">
                        <Info size={18} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-sm font-medium mb-1">Available certifications:</p>
                      <ul className="text-sm list-disc list-inside space-y-0.5">
                        <li>GRS certification</li>
                        <li>OEKO-TEX</li>
                        <li>STeP</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Yes", "No", "Not sure"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={form.certified.includes(opt)}
                    onClick={() => toggleMulti("certified", opt)}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                disabled={form.certified.length === 0}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 5 - Multi-select */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="editorial-heading-sm text-foreground">Estimated quantity?</h2>
              <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Sample", "Small batch", "Medium production", "Large scale"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={form.quantity.includes(opt)}
                    onClick={() => toggleMulti("quantity", opt)}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                disabled={form.quantity.length === 0}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 6 - Contact details */}
          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="editorial-heading-sm text-foreground">Your contact details</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateForm("company", e.target.value)}
                  placeholder="Company name"
                  className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors w-full justify-center"
              >
                Submit Quote Request <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={prevStep}
              className="mt-6 editorial-body-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Quote;
