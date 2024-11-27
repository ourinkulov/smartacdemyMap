import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faCircle } from "@fortawesome/free-solid-svg-icons";

const ProgressBar = ({ percentage }: any) => {
  return (
    <div className="flex items-center relative">
      <div className="flex-1 h-4 bg-gray-200 mx-4 mt-14 rounded-lg">
        <div
          className="h-4 rounded-l-lg bg-blue-600 dark:bg-toggleBackground relative"
          style={{ width: `${percentage}%` }}
        ></div>

        <div
          className="absolute top-[0px] flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-toggleBackground text-white"
          style={{ left: `calc(${percentage}%)` }}
        >
          <FontAwesomeIcon
            icon={faCircle}
            className="absolute text-blue-600 dark:text-toggleBackground"
          />
          <span className="relative z-30">{percentage}%</span>
        </div>
      </div>

      <FontAwesomeIcon icon={faFlag} className="text-red-600 text-3xl" />
    </div>
  );
};

export default ProgressBar;
