type Props = {
  link: string;
};

export default function ProjectAndroidLink({ link }: Props) {
  return (
    <a
      href={link}
      className="mr-4 mt-4 flex flex-row hover:font-bold hover:scale-90 duration-100 items-center justify-center"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-147 -70 294 345"
        width="22"
        height="24"
        className="mr-2"
      >
        <g fill="#a4c639">
          <use strokeWidth="14.4" xlinkHref="#b" stroke="#FFF" />
          <use xlinkHref="#a" transform="scale(-1,1)" />
          <g id="a" stroke="#FFF" strokeWidth="7.2">
            <rect
              rx="6.5"
              transform="rotate(29)"
              height="86"
              width="13"
              y="-86"
              x="14"
            />
            <rect id="c" rx="24" height="133" width="48" y="41" x="-143" />
            <use y="97" x="85" xlinkHref="#c" />
          </g>
          <g id="b">
            <ellipse cy="41" rx="91" ry="84" />
            <rect rx="22" height="182" width="182" y="20" x="-91" />
          </g>
        </g>
        <g stroke="#FFF" strokeWidth="7.2" fill="#FFF">
          <path d="m-95 44.5h190" />
          <circle cx="-42" r="4" />
          <circle cx="42" r="4" />
        </g>
      </svg>
      <p>Android</p>
    </a>
  );
}
