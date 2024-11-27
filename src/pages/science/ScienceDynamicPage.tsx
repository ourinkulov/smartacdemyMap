import DynamicsStats from "../../components/potential/DynamicsStats";
import ScienceDynamics from "../../components/potential/ScienceDynamics";

export default function ScienceDynamicPage() {
  return (
    <div className="h-[calc(100vh-65px)] flex gap-4 mx-4 max-xl:flex-col items-start max-xl:overflow-y-auto rounded-lg">
      <div
        data-testid="scientific-potential"
        className="w-4/5 max-xl:w-full h-full max-xl:h-auto flex flex-col items-center p-3 rounded-lg bg-white dark:bg-[#1f2a40] shadow-lg"
      >
        <ScienceDynamics />
      </div>
      <div
        data-testid="stats-potential"
        className="w-1/5 max-xl:w-full h-full flex flex-col items-center p-3 rounded-lg bg-white dark:bg-[#1f2a40] shadow-lg"
      >
        <DynamicsStats />
      </div>
    </div>
  );
}
