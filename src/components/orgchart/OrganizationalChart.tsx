import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { ThemeContext } from "../../theme/ThemeContext";
import axiosInstance from "../../utils/AxiosInstance";

import "../../styles/orgchart.scss";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

type TreeProp = {
  child: ReactNode;
  childLabel: string;
  number: ReactNode;
};

type IOrgStructure = {
  id: number;
  name: string;
  name_ru: string;
  name_uz: string;
  parent_id: number;
  ordering: number;
  status: number;
  cnt: number;
  label: string;
  parent_name: string;
  recursion_level: number;
  children: IOrgStructure[];
};

type Props = {
  activeTree: string;
  setActiveTree: any;
};

type PropsRecursive = {
  data: IOrgStructure | undefined;
};

export const OrganizationalChart = ({ activeTree, setActiveTree }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [orgStructure, setOrgStructure] = useState<IOrgStructure>();
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation<string>();

  useEffect(() => {
    axiosInstance
      .get("/org_structure/tree-priority", {
        params: {},
      })
      .then((response) => {
        setOrgStructure(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching org-structure:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  const RecursiveDiv: React.FC<PropsRecursive> = ({ data }) => {
    if (!data) {
      return null;
    }

    return (
      <TreeNode
        className=""
        key={data.id}
        label={
          <StyledNode
            child={data.name}
            number={data.cnt}
            childLabel={data.name_uz}
          />
        }
      >
        {data.children &&
          data.children.map((child, index) => (
            <RecursiveDiv key={index} data={child} />
          ))}
      </TreeNode>
    );
  };

  const StyledNode: FC<TreeProp> = ({ child, childLabel, number }) => {
    return (
      <div
        className={`bg-white dark:bg-slate-700 border inline-block justify-center rounded-lg hover:cursor-pointer ${
          theme === "dark" ? "border-[#ffa500]" : "border-[#14059c]"
        }`}
        onClick={() => {
          setActiveTree(childLabel!.toString());
        }}
      >
        <div
          className={`px-1 py-2 rounded-t-lg text-sm ${
            i18n.language === "Ru" ? "max-w-[140px]" : "max-w-[120px]"
          } ${
            activeTree === child
              ? "bg-gray-300 dark:bg-slate-400 dark:text-black"
              : ""
          }`}
        >
          {child}
        </div>
        <div className="text-sm bg-[#14059c] dark:bg-orange-400 text-white dark:text-black rounded-b-lg">
          {number}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Tree
          lineWidth={"2px"}
          lineColor={theme === "dark" ? "orange" : "#14059c"}
          lineBorderRadius={"10px"}
          label={
            <div className="border p-2 inline-block relative bg-[#14059c] dark:bg-orange-400 text-white dark:text-black rounded-lg">
              {t("structurepage.academy short")}
            </div>
          }
        >
          <RecursiveDiv data={orgStructure} />
        </Tree>
      )}
    </div>
  );
};
