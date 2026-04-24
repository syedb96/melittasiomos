export type TestimonialCategory =
  | "beginner"
  | "group"
  | "wedding"
  | "private"
  | "pura-ladies"
  | "online"
  | "community";

export interface Testimonial {
  name: string;
  label: string;
  platform: "google" | "personal";
  quote: string;
  category: TestimonialCategory;
}

const testimonials: Testimonial[] = [
  {
    name: "Lucia R.",
    label: "Pura Ladies Munich — Dance Team Leader, 7 years student",
    platform: "google",
    category: "pura-ladies",
    quote:
      "I've been a student of Melitta for over 7 years and she is still my favourite instructor. Even after trying lessons with some of the world's most famous teachers, I am still enjoying every opportunity I get to dance with Melitta. I highly recommend joining her classes or joining our team!",
  },
  {
    name: "Khaled R.",
    label: "Group Classes & Private Tuition, London",
    platform: "google",
    category: "group",
    quote: "An excellent tutor. Breaking down everything into small and easy steps. Her group classes are challenging and fun. Everyone is welcome.",
  },
  {
    name: "Olya Fedoseeva",
    label: "Online Student, Madrid (previously Russia)",
    platform: "personal",
    category: "online",
    quote:
      "I first met Melitta at a dance festival in Russia where I enjoyed her workshop so much I continued to follow Melitta on Social Media. Now that I am based in Madrid I take her online classes. It's affordable and easy to access. The content stays online for a week so I replay and practice the class as often as possible.",
  },
  {
    name: "Jan",
    label: "Private Tuition Student, Munich — 3+ years",
    platform: "personal",
    category: "private",
    quote:
      "I take private classes with Melitta for over 3 years now. With her I am able to improve my leading skills especially for the more advanced combinations. My musicality has improved significantly. The classes are fun and we also laugh a lot.",
  },
  {
    name: "Eva & Miguel",
    label: "Wedding Dance, 2023",
    platform: "google",
    category: "wedding",
    quote:
      "We were total beginners and honestly terrified about our first dance. Melitta broke everything down and made the lessons one of our favourite parts of wedding planning. She made us feel so confident and our guests couldn't believe it.",
  },
  {
    name: "Sofia & Patrizio",
    label: "Wedding Dance, 2022",
    platform: "google",
    category: "wedding",
    quote:
      "Melitta choreographed our wedding dance. We chose Salsa & Bachata because it felt romantic but also fun. Melitta did an excellent job with the choreography and all of this wouldn't have been possible without her. Our guests loved our performance and we will never forget that moment!",
  },
  {
    name: "Hannah & James",
    label: "Wedding",
    platform: "google",
    category: "wedding",
    quote: "Melitta understood exactly what we wanted — classy, not cheesy. The choreography felt like us and she was so patient from start to finish.",
  },
  {
    name: "Sarah M.",
    label: "Pura Nights Student, Chiswick",
    platform: "personal",
    category: "beginner",
    quote:
      "I came in knowing absolutely nothing about dance. Three weeks later I was on the dance floor at a social having the time of my life. Melitta's teaching style is so warm and clear. I never felt judged or behind.",
  },
  {
    name: "Marcus W.",
    label: "Chiswick Classes",
    platform: "personal",
    category: "community",
    quote:
      "Booked a 5-class bundle and by class 3 I was completely hooked. Best £55 I've ever spent in London. The community is unlike anything else — I've made real friends.",
  },
  {
    name: "Aisha T.",
    label: "Pura Ladies Member",
    platform: "personal",
    category: "pura-ladies",
    quote:
      "Pura Ladies has genuinely changed my confidence. Not just on the dance floor — in everything. The team is extraordinary and Melitta creates a culture of real support and high standards.",
  },
  {
    name: "Priya K.",
    label: "Beginner — Ealing Tuesdays",
    platform: "personal",
    category: "beginner",
    quote: "I was terrified of looking silly. By the second class I realised nobody cares — everyone's there to have fun. I came alone and left with new friends.",
  },
  {
    name: "James T.",
    label: "Complete Beginner, joined 2024",
    platform: "personal",
    category: "beginner",
    quote: "Walked in knowing nothing and within a month I was dancing socially. Melitta makes every beginner feel welcome.",
  },
  {
    name: "Daniel F.",
    label: "Improver — Chiswick Mondays",
    platform: "personal",
    category: "community",
    quote: "Monday nights at The George IV are the highlight of my week. Great music, great people, and Melitta pushes you just the right amount.",
  },
  {
    name: "Mark H.",
    label: "Private coaching, 2024",
    platform: "personal",
    category: "private",
    quote: "One private session with Melitta was worth more than a month of group classes. She identified exactly what I needed.",
  },
  {
    name: "Emma & Tom",
    label: "Wedding 2023",
    platform: "google",
    category: "wedding",
    quote: "Six sessions and we went from 'we can't dance' to a standing ovation. Melitta is a miracle worker.",
  },
];

export default testimonials;
