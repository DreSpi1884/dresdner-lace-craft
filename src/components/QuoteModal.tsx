import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Step = 1 | 2 | 3 | 4 | 5;

type QuoteModalContextType = {
  open: () => void;
  close: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextType | null>(null);

export const useQuoteModal = () => {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
};

const NOT_SURE = "I'm not sure";

const initialForm = {
  laceType: [] as string[],
  widths: "",
  widthsNotSure: false,
  usage: [] as string[],
  quantity: [] as string[],
  name: "",
  company: "",
  email: "",
};

export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const open = useCallback(() => {
    setForm(initialForm);
    setStep(1);
    setSubmitted(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const toggleMulti = (
    key: "laceType" | "usage" | "quantity",
    value: string,
  ) => {
    setForm((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const updateForm = (
    key: "widths" | "name" | "company" | "email",
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);
  const handleSubmit = () => setSubmitted(true);

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

  const contactValid = form.name.trim() !== "" && form.email.trim() !== "";

  return (
    <QuoteModalContext.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-6 md:p-10 sm:rounded-none border-border"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="editorial-heading-md text-foreground font-normal">
            Let's create something together
          </DialogTitle>
          <DialogDescription className="sr-only">
            Multi-step enquiry form to request a tailored quote.
          </DialogDescription>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                <Check size={32} />
              </div>
              <h2 className="editorial-heading-sm text-foreground mb-4">
                Thank you for your inquiry
              </h2>
              <p className="editorial-body text-muted-foreground">
                We have received your quote request and will respond within 2 business days
                with a tailored proposal.
              </p>
            </div>
          ) : (
            <div className="mt-2">
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      s <= step ? "bg-foreground" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">What type of lace do you need?</h3>
                  <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Elastic", "Inelastic", "Both", NOT_SURE].map((opt) => (
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
                  <h3 className="editorial-heading-sm text-foreground">Required widths?</h3>
                  <p className="editorial-body-sm text-muted-foreground">Please specify the desired widths in mm or cm, or skip.</p>
                  <input
                    type="text"
                    value={form.widths}
                    onChange={(e) => updateForm("widths", e.target.value)}
                    placeholder="e.g., 15mm, 30mm, 50mm"
                    disabled={form.widthsNotSure}
                    className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors disabled:opacity-40"
                  />
                  <OptionButton
                    label={NOT_SURE}
                    selected={form.widthsNotSure}
                    onClick={() =>
                      setForm((p) => ({ ...p, widthsNotSure: !p.widthsNotSure, widths: !p.widthsNotSure ? "" : p.widths }))
                    }
                  />
                  <button
                    onClick={nextStep}
                    disabled={!form.widthsNotSure && form.widths.trim() === ""}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">Design or usage?</h3>
                  <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Lingerie" },
                      { label: "Outerwear" },
                      { label: "Technical" },
                      { label: "Custom", subtitle: "Requires large scale production" },
                      { label: NOT_SURE },
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

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <h3 className="editorial-heading-sm text-foreground">Do you require certified materials?</h3>
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
                    {["Yes", "No", NOT_SURE].map((opt) => (
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

              {/* Step 5 */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">Estimated quantity?</h3>
                  <p className="editorial-body-sm text-muted-foreground">You can select multiple options.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Sample", "Small batch", "Medium production", "Large scale", NOT_SURE].map((opt) => (
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

              {/* Step 6 */}
              {step === 6 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">Your contact details</h3>
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
                    disabled={!contactValid}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Quote Request <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="mt-6 editorial-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </QuoteModalContext.Provider>
  );
};
