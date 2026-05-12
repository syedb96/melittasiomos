# 37 — Contact Form QA Checklist (success / error / spam protection)

Verifies the `/contact` form on **staging** (`https://melittasiomos.lovable.app/contact`) and **production** (`https://www.puranights.com/contact`).

> Run every test on **both** environments. Mark `[x]` when verified, with the date and tester initials.

## 1. Happy-path success

- [ ] Fill all required fields with valid data, wait ≥ 2s before submitting.
- [ ] Click **Send Message**.
- [ ] Button shows "Sending…" and is disabled.
- [ ] Form is replaced with the green confirmation panel containing:
  - "Message Sent!" heading
  - The submitted **name**, **email**, **enquiry type**, and a truncated copy of the **message** (so the user can verify what was received).
  - A "WhatsApp Melitta" fallback link.
- [ ] Confirmation auto-dismisses after ~8s and the form is reset.
- [ ] Row appears in `contact_submissions` (admin → Enquiries).

## 2. Validation (Zod, client-side)

- [ ] Empty **name** → "Name is required" inline error, no submit.
- [ ] Invalid **email** ("foo") → "Please enter a valid email".
- [ ] Phone over 30 chars → "Phone must be under 30 characters".
- [ ] No **enquiry type** selected → "Please select an enquiry type".
- [ ] Empty **message** → "Message is required".
- [ ] Message > 5000 chars → "Message must be under 5000 characters".
- [ ] All errors clear correctly when the user fixes the field and resubmits.

## 3. Error messaging (server failure)

Simulate by temporarily blocking the Supabase request in DevTools (Network → block `*supabase.co*`).

- [ ] Red banner appears above the form: "We couldn't send your message right now. Please try again in a moment, or WhatsApp Melitta directly on +44 7449 482 343 — she replies within hours."
- [ ] WhatsApp number is **clickable** and opens `wa.me/447449482343`.
- [ ] Form data is preserved (user can retry without retyping).
- [ ] Submit button re-enables.

## 4. Spam protection — honeypot

- [ ] Open DevTools, run:
      `document.querySelector('#website-url').value = 'http://spam.example'`
- [ ] Submit the form.
- [ ] UI shows the **success** state (silent acceptance — bots must not learn).
- [ ] **No row** appears in `contact_submissions`.
- [ ] **No** Supabase POST in the Network tab.

## 5. Spam protection — timing trap (< 2s)

- [ ] Reload the contact page.
- [ ] Within **1.5 seconds**, fill in valid data and click submit (use a script or paste pre-filled fields then click).
- [ ] UI shows the success state.
- [ ] **No row** in `contact_submissions`.

Recommended console snippet:
```js
const f = document.querySelector('form');
f.querySelector('[type=text]').value='Bot';
f.querySelector('[type=email]').value='b@b.com';
f.querySelector('select').value='General Enquiry';
f.querySelector('textarea').value='hi';
f.requestSubmit();
```

## 6. WhatsApp fallback visibility

- [ ] WhatsApp card is visible above the form on mobile (≤ 768 px).
- [ ] On desktop, WhatsApp card is the **first** card in the left column.
- [ ] Both `wa.me/447449482343` links open WhatsApp Web (desktop) and WhatsApp app (mobile).
- [ ] Pre-filled message renders: "Hi Melitta, I'd like to get in touch".

## 7. Accessibility quick checks

- [ ] Tabbing reaches every visible field in order; honeypot is **not** in tab order.
- [ ] Error messages are announced (each has `text-destructive` and is adjacent to its input).
- [ ] Success state is rendered as a region the user lands on (focus check optional).

## 8. Email notification to Melitta (post email-domain setup)

> Pending — requires the Lovable Cloud email domain to be configured. Until then, the Supabase `contact_submissions` insert + WhatsApp fallback are the source of truth. Once enabled, append:

- [ ] Submission triggers transactional email to `siomosmelitta@gmail.com`.
- [ ] Email subject contains the enquiry type.
- [ ] Email body includes name, email, phone, enquiry type, message.
- [ ] Email arrives within 1 minute of submission.
- [ ] No duplicate emails on retry (idempotency key works).

## Sign-off

| Env | Tester | Date | Pass? | Notes |
|-----|--------|------|-------|-------|
| Staging    |  |  |  |  |
| Production |  |  |  |  |
