import ScientificPotential from "../../components/potential/ScientificPotential";
import StatsPotential from "../../components/potential/StatsPotential";

export default function SciencePage() {
  return (
    <div className="h-[calc(100vh-65px)] flex gap-4 mx-4 max-xl:flex-col items-start max-xl:overflow-y-auto rounded-lg">
      <div
        data-testid="scientific-potential"
        className="w-3/5 max-xl:w-full h-full max-xl:h-auto flex flex-col items-center p-3 rounded-lg bg-white dark:bg-[#1f2a40] shadow-lg"
      >
        <ScientificPotential />
      </div>
      <div
        data-testid="stats-potential"
        className="w-2/5 max-xl:w-full h-full flex flex-col items-center p-3 rounded-lg bg-white dark:bg-[#1f2a40] shadow-lg"
      >
        <StatsPotential />
      </div>
    </div>
  );
}
