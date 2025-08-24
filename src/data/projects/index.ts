export interface ProjectData {
  id: string;
  title: string;
  duration: { start: string; end: string | null; timezone: null };
  github: string | null;
  demo: string | null;
  ios: string | null;
  android: string | null;
  tech: { id: string; color: string; name: string }[];
  description: string | null;
  coverImage: string | null;
  site: string | null;
  readmeContent?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "citystocker",
    title: "CityStocker",
    duration: {
      start: "2023-03-16",
      end: null,
      timezone: null,
    },
    github: "https://github.com/psh320/citystocker",
    demo: null,
    site: "https://stocker-c11e2.web.app/",
    ios: null,
    android: null,
    tech: [
      { id: "react", name: "React", color: "red" },
      { id: "nextjs", name: "Next.js", color: "green" },
      { id: "mui", name: "MUI", color: "default" },
      { id: "typescript", name: "Typescript", color: "yellow" },
      { id: "firebase", name: "Firebase", color: "yellow" },
      { id: "nodejs", name: "Node.js", color: "green" },
      { id: "gcp", name: "GCP", color: "orange" },
      { id: "react-query", name: "React-Query", color: "orange" },
      { id: "recoil", name: "Recoil", color: "brown" },
    ],
    description:
      "A working website where you can simulate cryptocurrency trading based on real-time market data and perform backtesting using custom auto-trade algorithms with this website's SDK. The server is deployed using GCP with Docker containers and the web app is hosted using Firebase.",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    duration: {
      start: "2023-03-09",
      end: "2023-03-11",
      timezone: null,
    },
    github: "https://github.com/psh320/sungho-park",
    demo: null,
    site: "https://sungho-park.vercel.app/",
    ios: null,
    android: null,
    tech: [
      { id: "nextjs", name: "Next.js", color: "green" },
      { id: "typescript", name: "Typescript", color: "yellow" },
      { id: "tailwind", name: "Tailwind CSS", color: "gray" },
    ],
    description:
      "A modern portfolio website built with Next.js and Tailwind CSS. Features a terminal-like interface, dark mode support, and responsive design. Now uses local markdown files instead of Notion API for better performance and independence.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "barcoder",
    title: "Barcoder",
    duration: {
      start: "2023-01-18",
      end: "2023-02-06",
      timezone: null,
    },
    github: "https://github.com/psh320/barcoder",
    demo: "https://youtu.be/ordkU8CMEoc",
    site: null,
    ios: "https://apps.apple.com/hk/app/바코더-barcoder/id1667796829",
    android: null,
    tech: [
      { id: "react-native", name: "React-Native", color: "blue" },
      { id: "react-query", name: "React-Query", color: "orange" },
      { id: "recoil", name: "Recoil", color: "brown" },
      { id: "typescript", name: "Typescript", color: "yellow" },
    ],
    description:
      "Barcoder is a React-Native app that supports offline-to-online commerce, allowing users to scan product barcodes and easily find online retailers.",
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
  },
  {
    id: "bobplace",
    title: "BobPlace",
    duration: {
      start: "2022-05-01",
      end: "2022-07-31",
      timezone: null,
    },
    github: "https://github.com/psh320/bobplace_user",
    demo: "https://youtu.be/5WCTnaL8dBg",
    site: null,
    ios: "https://apps.apple.com/kr/app/%EB%B0%A5%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4/id1634665858",
    android: "https://play.google.com/store/apps/details?id=com.bob_frontend",
    tech: [
      { id: "react-native", name: "React-Native", color: "blue" },
      { id: "recoil", name: "Recoil", color: "brown" },
      { id: "react", name: "React", color: "red" },
      { id: "react-query", name: "React-Query", color: "orange" },
      { id: "typescript", name: "Typescript", color: "yellow" },
    ],
    description:
      "BobPlace is an app that uses gamification to encourage users to go outside to have meals and solve the problem of delivery fees.",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&crop=center",
  },
];
