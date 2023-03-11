type Props = {
  link: string;
};

export default function ProjectSiteLink({ link }: Props) {
  return (
    <a
      href={link}
      className="mr-4 mt-4 flex flex-row hover:font-bold hover:scale-90 duration-100 items-center justify-center"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
      <p>Link</p>
    </a>
  );
}
