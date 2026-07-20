import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLang } from "@/i18n/LanguageContext";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

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

const initialForm = {
  textileType: "" as string,
  laceType: [] as string[],
  widths: "",
  widthsNotSure: false,
  usage: [] as string[],
  quantity: [] as string[],
  name: "",
  company: "",
  email: "",
  message: "",
};

export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useLang();
  const NOT_SURE = t("I'm not sure", "Ich bin mir nicht sicher");

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const isSpitze = form.textileType === "Spitze";
  const totalSteps = isSpitze ? 6 : 5;

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
    key: "textileType" | "widths" | "name" | "company" | "email" | "message",
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !isSpitze) {
      setStep(3);
    } else {
      setStep((s) => Math.min(s + 1, 6) as Step);
    }
  };

  const prevStep = () => {
    if (step === 3 && !isSpitze) {
      setStep(1);
    } else {
      setStep((s) => Math.max(s - 1, 1) as Step);
    }
  };

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
  const continueLabel = t("Continue", "Weiter");
  const multiHint = t("You can select multiple options.", "Sie können mehrere Optionen auswählen.");

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
            {t("Request", "Anfrage")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t(
              "Multi-step enquiry form to request a tailored quote.",
              "Mehrstufiges Anfrageformular für ein individuelles Angebot."
            )}
          </DialogDescription>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                <Check size={32} />
              </div>
              <h2 className="editorial-heading-sm text-foreground mb-4">
                {t("Thank you for your inquiry", "Vielen Dank für Ihre Anfrage")}
              </h2>
              <p className="editorial-body text-muted-foreground">
                {t(
                  "We have received your quote request and will respond within 2 business days with a tailored proposal.",
                  "Wir haben Ihre Angebotsanfrage erhalten und melden uns innerhalb von 2 Werktagen mit einem individuellen Vorschlag bei Ihnen."
                )}
              </p>
            </div>
          ) : (
            <div className="mt-2">
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
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
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("What type of textile are you looking for?", "Welche Art von Textil suchen Sie?")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "Spitze", label: t("Lace", "Spitze") },
                      { value: "Kettengewirke", label: t("Warp-knitted fabrics", "Kettengewirke") },
                      { value: "Funktionale Textilien", label: t("Functional textiles", "Funktionale Textilien") },
                    ].map((opt) => (
                      <OptionButton
                        key={opt.value}
                        label={opt.label}
                        selected={form.textileType === opt.value}
                        onClick={() => updateForm("textileType", opt.value)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={form.textileType === ""}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {continueLabel} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 2 - Lace type (only if Spitze) */}
              {step === 2 && isSpitze && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("What type of lace do you need?", "Welche Art von Spitze benötigen Sie?")}
                  </h3>
                  <p className="editorial-body-sm text-muted-foreground">{multiHint}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "Elastic", label: t("Elastic", "Elastisch") },
                      { value: "Inelastic", label: t("Inelastic", "Unelastisch") },
                      { value: "Both", label: t("Both", "Beides") },
                      { value: NOT_SURE, label: NOT_SURE },
                    ].map((opt) => (
                      <OptionButton
                        key={opt.value}
                        label={opt.label}
                        selected={form.laceType.includes(opt.value)}
                        onClick={() => toggleMulti("laceType", opt.value)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={form.laceType.length === 0}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {continueLabel} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("Required widths?", "Gewünschte Breiten?")}
                  </h3>
                  <p className="editorial-body-sm text-muted-foreground">
                    {t(
                      "Please specify the desired widths in mm or cm.",
                      "Bitte geben Sie die gewünschten Breiten in mm oder cm an."
                    )}
                  </p>
                  <input
                    type="text"
                    value={form.widths}
                    onChange={(e) => updateForm("widths", e.target.value)}
                    placeholder={t("e.g., 15mm, 30mm, 50mm", "z. B. 15 mm, 30 mm, 50 mm")}
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
                    {continueLabel} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("Area of application?", "Einsatzbereich?")}
                  </h3>
                  <p className="editorial-body-sm text-muted-foreground">{multiHint}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "Lingerie", label: t("Lingerie", "Dessous") },
                      { value: "Outerwear", label: t("Outerwear", "Oberbekleidung") },
                      { value: "Technical", label: t("Technical", "Technisch") },
                      { value: "Custom", label: t("Custom", "Individuell"), subtitle: t("Requires large scale production", "Erfordert Großserienproduktion") },
                      { value: NOT_SURE, label: NOT_SURE },
                    ].map((opt) => (
                      <OptionButton
                        key={opt.value}
                        label={opt.label}
                        subtitle={opt.subtitle}
                        selected={form.usage.includes(opt.value)}
                        onClick={() => toggleMulti("usage", opt.value)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={form.usage.length === 0}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {continueLabel} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("Estimated quantity?", "Geschätzte Menge?")}
                  </h3>
                  <p className="editorial-body-sm text-muted-foreground">{multiHint}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "Sample", label: t("Sample", "Muster") },
                      { value: "Small batch", label: t("Small batch", "Kleinserie") },
                      { value: "Medium production", label: t("Medium production", "Mittlere Serie") },
                      { value: "Large scale", label: t("Large scale", "Großserie") },
                      { value: NOT_SURE, label: NOT_SURE },
                    ].map((opt) => (
                      <OptionButton
                        key={opt.value}
                        label={opt.label}
                        selected={form.quantity.includes(opt.value)}
                        onClick={() => toggleMulti("quantity", opt.value)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={form.quantity.length === 0}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {continueLabel} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 6 */}
              {step === 6 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="editorial-heading-sm text-foreground">
                    {t("Your contact details", "Ihre Kontaktdaten")}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder={t("Your name", "Ihr Name")}
                      className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => updateForm("company", e.target.value)}
                      placeholder={t("Company name", "Firmenname")}
                      className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder={t("Email address", "E-Mail-Adresse")}
                      className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                    <textarea
                      value={form.message}
                      onChange={(e) => updateForm("message", e.target.value)}
                      placeholder={t("Your message (optional)", "Ihre Nachricht (optional)")}
                      rows={5}
                      className="w-full border border-border bg-background px-6 py-4 editorial-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!contactValid}
                    className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t("Submit Quote Request", "Angebot anfordern")} <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="mt-6 editorial-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t("Back", "Zurück")}
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </QuoteModalContext.Provider>
  );
};
