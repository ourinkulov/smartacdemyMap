import Timeline from "../../components/timeline/Timeline";
import "../../styles/timeline.scss";

export default function TimelinePage() {
  return (
    <div className="h-[calc(100vh-65px)] flex max-xl:flex-col items-start max-xl:overflow-y-auto bg-white dark:bg-[#1f2a40] p-4  mx-4 rounded-lg shadow-lg">
      <Timeline />
    </div>
  );
}
