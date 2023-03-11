type Props = {
  link: string;
};

export default function ProjectDemoLink({ link }: Props) {
  return (
    <a
      href={link}
      className="mr-4 mt-4 flex flex-row hover:font-bold hover:scale-90 duration-100 items-center justify-center"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="24"
        viewBox="0 0 159 110"
      >
        <path
          d="m154 17.5c-1.82-6.73-7.07-12-13.8-13.8-9.04-3.49-96.6-5.2-122 0.1-6.73 1.82-12 7.07-13.8 13.8-4.08 17.9-4.39 56.6 0.1 74.9 1.82 6.73 7.07 12 13.8 13.8 17.9 4.12 103 4.7 122 0 6.73-1.82 12-7.07 13.8-13.8 4.35-19.5 4.66-55.8-0.1-75z"
          fill="#f00"
        />
        <path d="m105 55-40.8-23.4v46.8z" fill="#fff" />
      </svg>
      <p>Demo</p>
    </a>
  );
}
