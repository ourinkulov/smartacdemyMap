import ChairsPotential from "../../components/potential/ChairsPotential";

export default function ChairsPotentialPage() {
  return (
    <div className="h-[calc(100vh-65px)] flex max-xl:flex-col items-start max-xl:overflow-y-auto bg-white dark:bg-[#1f2a40] p-2 2xl:p-2 mx-4 rounded-lg shadow-lg">
      <div className="w-full max-xl:w-full h-full max-xl:h-auto flex flex-col items-center xl:mx-4">
        <ChairsPotential />
      </div>
    </div>
  );
}
