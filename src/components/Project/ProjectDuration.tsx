type Props = {
  duration: {
    start: string;
    end: string | null;
    timezone: null;
  };
};

export default function ProjectDuration({ duration }: Props) {
  const calculatedPeriod = (start: string, end: string) => {
    const startDateStringArray = start.split("-");
    const endDateStringArray = end.split("-");

    const startDate = new Date(
      Number(startDateStringArray[0]),
      Number(startDateStringArray[1]),
      Number(startDateStringArray[2])
    ).getTime();
    const endDate = new Date(
      Number(endDateStringArray[0]),
      Number(endDateStringArray[1]),
      Number(endDateStringArray[2])
    ).getTime();

    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);
    return result;
  };

  return duration.end ? (
    <h3 className="my-1 text-sm font-semibold ">
      Duration: {duration.start} ~ {duration.end} (
      {calculatedPeriod(duration.start, duration.end)} days)
    </h3>
  ) : (
    <h3 className="my-1 text-sm font-semibold">
      Duration: {duration.start} ~ Present
    </h3>
  );
}
