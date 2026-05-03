import { useState } from "react";
import { z } from "zod";
import { Mail, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Say something :)").max(2000),
});

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (flat[i.path[0] as string] = i.message));
      setErrors(flat);
      return;
    }
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const { name, email, message } = parsed.data;
      const { error } = await supabase
        .from("contact_submissions")
        .insert([{ id, name, email, message }]);
      if (error) throw error;

      // Best-effort email notification — silently no-ops if email infra not yet set up
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "contact-form-notification",
            recipientEmail: "srishtiranaa@gmail.com",
            idempotencyKey: `contact-notify-${id}`,
            templateData: parsed.data,
          },
        })
        .catch(() => {});

      toast.success("Message sent!", { description: "Thank you — I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { description: "Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-background/10 border border-primary-foreground/25 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/70 focus:bg-background/15 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs tracking-[0.25em] opacity-70 mb-2 block">NAME</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            className={inputCls}
            maxLength={100}
          />
          {errors.name && <p className="text-xs mt-1 opacity-90">{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs tracking-[0.25em] opacity-70 mb-2 block">EMAIL</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
            maxLength={255}
          />
          {errors.email && <p className="text-xs mt-1 opacity-90">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="text-xs tracking-[0.25em] opacity-70 mb-2 block">MESSAGE</label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Write something kind..."
          rows={4}
          className={`${inputCls} resize-none`}
          maxLength={2000}
        />
        {errors.message && <p className="text-xs mt-1 opacity-90">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-background text-primary px-7 py-3 font-display text-lg hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Sending..." : "Send message"}
      </button>
      <p className="text-xs opacity-60 flex items-center gap-2 pt-1">
        <Mail className="h-3 w-3" /> Goes straight to my inbox.
      </p>
    </form>
  );
};

export default ContactForm;
