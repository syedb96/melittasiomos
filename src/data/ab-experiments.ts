// A/B experiment definitions. ONE source of truth for both React
// pages and the Wix replication. Each variant is even-split unless
// `weight` is given. Keep variant `id` stable forever — analytics
// joins on it.
//
// Reading winners (SQL, run after ≥14 days):
//
//   select cta_label, count(*) clicks
//   from cta_events
//   where cta_label like 'ab_click:home_hero_primary:%'
//     and created_at > now() - interval '14 days'
//   group by 1
//   order by 2 desc;
//
// Compare to the matching `ab_impression:...` counts for CTR.

import type { Experiment } from "@/lib/ab";

export const HOME_HERO_PRIMARY: Experiment<{ label: string; href: string }> = {
  key: "home_hero_primary",
  description: "Homepage hero — primary book button copy.",
  page: "/",
  variants: [
    { id: "a_live", label: "Come dance with us — from £10", payload: {
        label: "Come dance with us — from £10 →",
        href: "https://www.tickettailor.com/events/puranights",
    }},
    { id: "b_pick_night", label: "Save your spot for Monday or Tuesday", payload: {
        label: "Save your spot for Monday or Tuesday →",
        href: "https://www.tickettailor.com/events/puranights",
    }},
    { id: "c_find_first", label: "Find your first class", payload: {
        label: "Find your first class →",
        href: "https://www.tickettailor.com/events/puranights",
    }},
  ],
};

export const PURA_NIGHTS_HERO_PRIMARY: Experiment<{ label: string; href: string }> = {
  key: "puranights_hero_primary",
  description: "/pura-nights hero — primary CTA copy.",
  page: "/pura-nights",
  variants: [
    { id: "a_live", label: "Come dance with us", payload: {
      label: "Come dance with us →",
      href: "https://www.tickettailor.com/events/puranights",
    }},
    { id: "b_drop_in", label: "Drop in this week", payload: {
      label: "Drop in this week →",
      href: "https://www.tickettailor.com/events/puranights",
    }},
    { id: "c_pick_night", label: "Pick your night", payload: {
      label: "Pick your night →",
      href: "https://www.tickettailor.com/events/puranights",
    }},
  ],
};

export const LOYALTY_SUBMIT: Experiment<{ label: string }> = {
  key: "loyalty_submit",
  description: "/loyalty join-form submit button copy.",
  page: "/loyalty",
  variants: [
    { id: "a_live", label: "Count me in", payload: { label: "Count me in →" } },
    { id: "b_add_me", label: "Add me to the loyalty card", payload: { label: "Add me to the loyalty card →" } },
    { id: "c_start", label: "Start my loyalty card", payload: { label: "Start my loyalty card →" } },
  ],
};

export const PRICES_GIFT_VOUCHER: Experiment<{ label: string }> = {
  key: "prices_gift_voucher",
  description: "/prices gift voucher CTA copy.",
  page: "/prices",
  variants: [
    { id: "a_live", label: "Buy a Gift Voucher", payload: { label: "Buy a Gift Voucher" } },
    { id: "b_send_gift", label: "Send the gift of dance", payload: { label: "Send the gift of dance →" } },
  ],
};

export const WL_HERO_PRIMARY: Experiment<{ label: string; to: string }> = {
  key: "westlondon_hero_primary",
  description: "/salsa-bachata-west-london hero primary CTA.",
  page: "/salsa-bachata-west-london",
  variants: [
    { id: "a_local", label: "Find my local class", payload: { label: "Find my local class →", to: "/schedule" } },
    { id: "b_schedule", label: "See Chiswick + Ealing schedule", payload: { label: "See Chiswick + Ealing schedule →", to: "/schedule" } },
    { id: "c_dance", label: "Come dance in West London", payload: { label: "Come dance in West London →", to: "/pura-nights" } },
  ],
};

export const ALL_EXPERIMENTS = [
  HOME_HERO_PRIMARY,
  PURA_NIGHTS_HERO_PRIMARY,
  LOYALTY_SUBMIT,
  PRICES_GIFT_VOUCHER,
  WL_HERO_PRIMARY,
];
