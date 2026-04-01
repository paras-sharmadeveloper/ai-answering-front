import img1 from "../../../assets/a.png"
import img2 from "../../../assets/book.png"
import img3 from "../../../assets/elements.png"
import img4 from "../../../assets/img4.png"
import img5 from "../../../assets/img5.png"
import img6 from "../../../assets/img6.png"
import img7 from "../../../assets/img7.png"
import img8 from "../../../assets/img8.png"

export const promptChips = [
  { text: "Speak in different languages", img: img1 },
  { text: "Narrate a story", img: img2 },
  { text: "Hear from a video game character", img: img3 },
  { text: "Direct a dramatic movie scene", img: img4 },
  { text: "Give a meditation class", img: img5 },
  { text: "Introduce your podcast", img: img6 },
  { text: "Record an advertisement", img: img7 },
  { text: "Tell a silly joke", img: img8 },
];

export const initialText =
  "From ancient tools to modern tech, product design has shaped the way we live, work, and play. But how did we get here? Who were the pioneers that revolutionized the way we interact with the world? In this video, we're diving into the fascinating history of product design-exploring the movements, innovations, and game-changing moments that brought us everything from minimalist furniture to cutting-edge gadgets. Let's take a journey through time and see how design has evolved to shape our everyday lives!";

export const voices = [
  {
    id: "james",
    name: "James",
    tag: "Narrative & Story",
    desc: "A slightly husky and bassy voice...",
    countries: ["🇮🇹 Italy", "🇷🇺 Russia", "+3 More"],
    accent: "green",
  },
  {
    id: "benjamin",
    name: "Benjamin",
    tag: "Conversational",
    desc: "A gentle and warm middle age America...",
    countries: [" Italy", "🇷🇺 Russia", "+3 More"],
    accent: "purple",
  },
  {
    id: "mark",
    name: "Mark Wood",
    tag: "Narration",
    desc: "A British, London accent with clear pron...",
    countries: ["🇺🇸 United", "🇷🇺 Russia", "+3 More"],
    accent: "orange",
  },
  {
    id: "harry",
    name: "Harry Brooks",
    tag: "Characters",
    desc: "Easy to follow and expressive...",
    countries: ["🇯🇵 Japan", "🇺🇸 United", "+9 More"],
    accent: "emerald",
  },
  {
    id: "will",
    name: "Will Young",
    tag: "Social Media",
    desc: "Calm and gentle. A clean, light baritone...",
    countries: ["🇷🇺 Russia", "🇮🇹 Italy", "+3 More"],
    accent: "sky",
  },
];

export const models = [
  {
    id: "m1",
    name: "Vernal Multilingual v2",
    desc: "Our most life-like, emotionally rich model in 20 languages.",
    tags: ["🇮🇹 Italy", "🇷🇺 Russia", "+18 More"],
    badge: "High Quality",
  },
  {
    id: "m2",
    name: "Vernal Flash v2.5",
    desc: "Ultra low latency model in 30 languages.",
    tags: ["🇺🇸 United States", "🇯🇵 Japan", "+28 More"],
    badge: "50% Cheaper",
  },
  {
    id: "m3",
    name: "Vernal Turbo v2.5",
    desc: "High quality, low latency model in 24 languages.",
    tags: ["🇳🇿 New Zealand", "🇩🇪 Germany", "+22 More"],
    badge: "50% Cheaper",
  },
  {
    id: "m4",
    name: "Vernal Turbo v2",
    desc: "English-only low latency model.",
    tags: ["🏴 England", "🇺🇸 United States", "+16 More"],
    badge: "50% Cheaper",
  },
];

export const historyItems = [
  {
    id: "h1",
    title: "Let's rewind time and explore...",
    voice: "Benjamin",
    time: "20 seconds ago",
    color: "from-pink-400 to-violet-500",
  },
  {
    id: "h2",
    title: "From ancient tools to...",
    voice: "James",
    time: "09 minutes ago",
    color: "from-lime-400 to-green-600",
  },
  {
    id: "h3",
    title: "Tech, product design has shap...",
    voice: "Mark Wood",
    time: "31 minutes ago",
    color: "from-pink-400 to-orange-500",
  },
];