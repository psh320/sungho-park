type Props = {
  tags: { id: string; color: string; name: string }[];
};

export default function ProjectTags({ tags }: Props) {
  return (
    <div className="flex items-start my-1 flex-wrap">
      {tags.map((tag, index) => (
        <h1
          key={index}
          className="px-2 py-1 mb-2 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 font-medium cursor-default"
        >
          {tag.name}
        </h1>
      ))}
    </div>
  );
}
