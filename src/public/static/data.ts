import { ProjectType } from "@/pages/project";

export const projectsList: ProjectType[] = [
  {
    id: "3aa942ac-1eb9-4f25-8a11-873781c9a76e",
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
      {
        id: "af1d454a-969d-42f5-a2bc-f12d3b4dd641",
        name: "React",
        color: "red",
      },
      {
        id: "de4e24ca-0ce1-4475-9107-2a2501bca51e",
        name: "Next.js",
        color: "green",
      },
      {
        id: "7dc5f1ac-22fc-44a4-a89e-f544506fc0e4",
        name: "MUI",
        color: "default",
      },
      {
        id: "9f9baf4b-4b7f-4e86-98e7-158e2ab10652",
        name: "Typescript",
        color: "yellow",
      },
      {
        id: "580e75c9-df3d-46d4-aa47-370d3e4489d8",
        name: "Firebase",
        color: "yellow",
      },
      {
        id: "282ce03b-3721-4ab1-a4e5-f726cccc75c1",
        name: "Node.js",
        color: "green",
      },
      {
        id: "d27feaa0-4925-4c92-8475-4b98a947646b",
        name: "GCP",
        color: "orange",
      },
      {
        id: "38198d15-c4c8-4fba-80fa-bf5b2c8f564b",
        name: "React-Query",
        color: "orange",
      },
      {
        id: "0cb219ee-8291-40d7-9dda-895fb0fcfbf1",
        name: "Recoil",
        color: "brown",
      },
    ],
    description:
      "It is an working Website where you can try simulating trade of cryptocurrency based on real-time market and perform backtesting using custom auto trade algorithm with this website’s SDK. The server is being deployed using GCP with docker container and web is hosted using firebase.",
    projectURL:
      "https://www.notion.so/CityStocker-3aa942ac1eb94f258a11873781c9a76e",
    coverImage:
      "https://prod-files-secure.s3.us-west-2.amazonaws.com/a0ec525b-c9f2-436c-aef9-ca870ef1a69f/90babf93-fb27-480d-8bb1-6e80daa0404d/Optimized-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.31.34.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240403T193700Z&X-Amz-Expires=3600&X-Amz-Signature=d89989c5c52019c9c6500da7da9229d8520850bfcb7be3c8ab462b464b2f53a0&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    id: "d4d527a1-bca1-4961-98dc-7264a06c7a78",
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
      {
        id: "de4e24ca-0ce1-4475-9107-2a2501bca51e",
        name: "Next.js",
        color: "green",
      },
      {
        id: "9f9baf4b-4b7f-4e86-98e7-158e2ab10652",
        name: "Typescript",
        color: "yellow",
      },
      {
        id: "0de44423-0616-432a-b3de-72fc79158ed6",
        name: "NotionAPI",
        color: "pink",
      },
      {
        id: "a0d74bc4-d636-47ec-ab56-9d6f2707f894",
        name: "Tailwind CSS",
        color: "gray",
      },
    ],
    description:
      "A portfolio website built with Next.js and Tailwind CSS. The data of portfolios are received from Notion API by SSR.",
    projectURL:
      "https://www.notion.so/Portfolio-Website-d4d527a1bca1496198dc7264a06c7a78",
    coverImage:
      "https://prod-files-secure.s3.us-west-2.amazonaws.com/a0ec525b-c9f2-436c-aef9-ca870ef1a69f/3e669622-8dc8-42c9-a910-fd612e364b32/porfolio.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240403T193700Z&X-Amz-Expires=3600&X-Amz-Signature=2fda46b09777c55a45a9f67ff028548cf806cbbbd9ca4d40aa11af6e78129851&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    id: "9bc40da0-5590-4bb6-9ce0-1b6bf06859f5",
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
      {
        id: "4c2440fe-fa55-4764-99a3-0e3fb14c1b28",
        name: "React-Native",
        color: "blue",
      },
      {
        id: "38198d15-c4c8-4fba-80fa-bf5b2c8f564b",
        name: "React-Query",
        color: "orange",
      },
      {
        id: "0cb219ee-8291-40d7-9dda-895fb0fcfbf1",
        name: "Recoil",
        color: "brown",
      },
      {
        id: "9f9baf4b-4b7f-4e86-98e7-158e2ab10652",
        name: "Typescript",
        color: "yellow",
      },
    ],
    description:
      "Barcoder is React-Native app that support offline to online commerce that allows us to scan the barcode of product and find its online retail easily.",
    projectURL:
      "https://www.notion.so/Barcoder-9bc40da055904bb69ce01b6bf06859f5",
    coverImage:
      "https://prod-files-secure.s3.us-west-2.amazonaws.com/a0ec525b-c9f2-436c-aef9-ca870ef1a69f/9e86f2e1-d827-4634-8931-43bbd610f3e4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.58.56.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240403T193700Z&X-Amz-Expires=3600&X-Amz-Signature=8a22f2c318e6bc130b86c727ea506026a2e676124acd151ea807b8f9a0a5a09c&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    id: "7e693623-b11b-4973-b40b-0d98434ea46b",
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
      {
        id: "4c2440fe-fa55-4764-99a3-0e3fb14c1b28",
        name: "React-Native",
        color: "blue",
      },
      {
        id: "0cb219ee-8291-40d7-9dda-895fb0fcfbf1",
        name: "Recoil",
        color: "brown",
      },
      {
        id: "af1d454a-969d-42f5-a2bc-f12d3b4dd641",
        name: "React",
        color: "red",
      },
      {
        id: "38198d15-c4c8-4fba-80fa-bf5b2c8f564b",
        name: "React-Query",
        color: "orange",
      },
      {
        id: "9f9baf4b-4b7f-4e86-98e7-158e2ab10652",
        name: "Typescript",
        color: "yellow",
      },
    ],
    description:
      "Bobplace is an app that uses gamification to encourage users to go outside to have the meals to and solve the problem of delivery fee.",
    projectURL:
      "https://www.notion.so/BobPlace-7e693623b11b4973b40b0d98434ea46b",
    coverImage:
      "https://prod-files-secure.s3.us-west-2.amazonaws.com/a0ec525b-c9f2-436c-aef9-ca870ef1a69f/4cb1905b-fe90-4b6a-95d2-86e627f028b3/Frame_6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240403T193700Z&X-Amz-Expires=3600&X-Amz-Signature=aad3ea36b6ac03ee3d688f1bd86df5632571558859bf0c361bd6480026bfdd7b&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
];
