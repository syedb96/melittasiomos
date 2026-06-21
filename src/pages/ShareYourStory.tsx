/* Public testimonial submission. Insert is anon-allowed but locked to
   moderation_status='pending' + unpublished by RLS + trigger. */
import { useState } from "react";
import SeoHead from "@/components/SeoHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Star, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  person_name: z.string().trim().min(2, "Please enter your name").max(200),
  submitted_by_email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  context_label: z.string().trim().max(100).optional().or(z.literal("")),
  quote: z.string().trim().min(20, "Please write at least 20 characters").max(2000, "Please keep it under 2000 characters"),
  rating: z.number().int().min(1).max(5),
});

export default function ShareYourStory() {
  const [form, setForm] = useState({ person_name: "", submitted_by_email: "", context_label: "", quote: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.errors.forEach((e) => { if (e.path[0]) map[String(e.path[0])] = e.message; });
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      person_name: parsed.data.person_name,
      context_label: parsed.data.context_label || null,
      quote: parsed.data.quote,
      rating: parsed.data.rating,
      submitted_by_name: parsed.data.person_name,
      submitted_by_email: parsed.data.submitted_by_email || null,
      moderation_status: "pending",
      is_published: false,
      is_featured: false,
      platform: "personal",
      source_type: "direct",
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <SeoHead title="Thank you — Pura Nights" description="Thanks for sharing your story." path="/share-your-story/thank-you" noindex />
        <div className="max-w-md text-center space-y-4">
          <CheckCircle2 size={48} className="mx-auto text-primary" />
          <h1 className="font-display text-3xl font-bold">Thank you</h1>
          <p className="text-muted-foreground">Your story has been submitted for review. Once approved by our team it may appear on the site.</p>
          <Button asChild variant="outline"><a href="/">Back to home</a></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <SeoHead
        title="Share your story — Pura Nights"
        description="Loved your class or Latin Friday? Share your story and we may feature it on our site."
        path="/share-your-story"
        noindex
      />

      <div className="max-w-xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="font-display text-4xl font-bold">Share your story</h1>
          <p className="text-muted-foreground">Tell us about your experience at a class or Latin Friday. Submissions are reviewed before going live.</p>
        </header>

        <div className="space-y-4 bg-card border rounded-xl p-6">
          <div>
            <Label htmlFor="person_name">Your name *</Label>
            <Input id="person_name" value={form.person_name} onChange={(e) => setForm({ ...form, person_name: e.target.value })} maxLength={200} />
            {errors.person_name && <p className="text-xs text-destructive mt-1">{errors.person_name}</p>}
          </div>
          <div>
            <Label htmlFor="submitted_by_email">Email (optional — for follow-up only)</Label>
            <Input id="submitted_by_email" type="email" value={form.submitted_by_email} onChange={(e) => setForm({ ...form, submitted_by_email: e.target.value })} maxLength={255} />
            {errors.submitted_by_email && <p className="text-xs text-destructive mt-1">{errors.submitted_by_email}</p>}
          </div>
          <div>
            <Label htmlFor="context_label">Where did you experience it? (optional)</Label>
            <Input id="context_label" placeholder="e.g. Beginner Salsa, Ealing · Latin Friday" value={form.context_label} onChange={(e) => setForm({ ...form, context_label: e.target.value })} maxLength={100} />
          </div>
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map((r) => (
                <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} aria-label={`${r} stars`}>
                  <Star size={28} className={r <= form.rating ? "fill-primary text-primary" : "text-muted-foreground"} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="quote">Your story *</Label>
            <Textarea id="quote" rows={6} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} maxLength={2000} placeholder="What did you love? Who did you meet? How did it make you feel?" />
            <p className="text-xs text-muted-foreground mt-1">{form.quote.length} / 2000</p>
            {errors.quote && <p className="text-xs text-destructive mt-1">{errors.quote}</p>}
          </div>
          <Button onClick={submit} disabled={submitting} className="w-full">{submitting ? "Submitting…" : "Submit story for review"}</Button>
          <p className="text-[11px] text-muted-foreground text-center">By submitting you allow us to publish your story (name and rating) on our website. Email stays private.</p>
        </div>
      </div>
    </main>
  );
}
