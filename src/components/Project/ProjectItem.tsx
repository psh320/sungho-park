import { ProjectType } from "@/pages/project";
import Image from "next/image";
type Props = {
  project: ProjectType;
};
export default function ProjectItems({ project }: Props) {
  const calculatedPeriod = (start, end) => {
    const startDateStringArray = start.split("-");
    const endDateStringArray = end.split("-");

    const startDate = new Date(
      startDateStringArray[0],
      startDateStringArray[1],
      startDateStringArray[2]
    ).getTime();
    const endDate = new Date(
      endDateStringArray[0],
      endDateStringArray[1],
      endDateStringArray[2]
    ).getTime();

    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);
    return result;
  };
  return (
    <div className="flex flex-col m-3 bg-slate-700 rounded-md max-w-md ">
      <Image
        className="rounded-t-xl"
        width={300}
        height={500}
        src={
          project.coverImage
            ? project.coverImage
            : "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
        }
        alt="project image"
        quality={100}
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <h3 className="mt-4 text-xl">{project.description}</h3>
      </div>
    </div>
  );
}
