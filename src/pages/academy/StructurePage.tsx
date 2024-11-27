import OrgChartChairs from "../../components/orgchart/OrgChartChairs";
import { useTranslation } from "react-i18next";
import { OrganizationalChart } from "../../components/orgchart/OrganizationalChart";
import { useState } from "react";
import OrgChartManagement from "../../components/orgchart/OrgChartManagement";
import OrgChartFaculties from "../../components/orgchart/OrgChartFaculties";
import OrgChartSubjects from "../../components/orgchart/OrgChartSubjects";
import OrgChartServices from "../../components/orgchart/OrgChartServices";
import OrgChartDepartments from "../../components/orgchart/OrgChartDepartments";
import OrgChartGroups from "../../components/orgchart/OrgChartGroups";
import OrgChartDeparts from "../../components/orgchart/OrgChartDeparts";
import { useNavigate } from "react-router-dom";
import {
  setActiveMenuIndex,
  setActiveSubmenuIndex,
  setOpenSubmenus,
} from "../../redux/dataStored/userReducer";
import { useDispatch } from "react-redux";

function StructurePage() {
  const [activeTree, setActiveTree] = useState<string>("Rahbariyat");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation<string>();

  const topic = (activeTree: string) => {
    switch (activeTree) {
      case "Kafedralar":
        return <OrgChartChairs />;
      case "Rahbariyat":
        return <OrgChartManagement />;
      case "Fakultetlar":
        return <OrgChartFaculties />;
      case "Fanlar":
        return <OrgChartSubjects />;
      case "Xizmatlar":
        return <OrgChartServices />;
      case "Boshqarmalar":
        return <OrgChartDepartments />;
      case "Guruhlar":
        return <OrgChartGroups />;
      case "Bo'limlar":
        return <OrgChartDeparts />;
      case "Ta'lim oluvchilar":
      case "Ta'lim turlari":
      case "Ta'lim yo'nalishlar":
        navigate("/education");
        dispatch(setActiveMenuIndex(2));
        dispatch(setActiveSubmenuIndex(1));
        dispatch(setOpenSubmenus(2));
        return;
      default:
        return <OrgChartChairs />;
    }
  };

  return (
    <div className="flex max-xl:flex-wrap max-xl:overflow-auto gap-4 h-full">
      <div className="orgchart p-2 ml-4 xl:w-3/5 max-xl:w-full max-xl:mr-4 bg-white dark:bg-headerFooterBackground h-auto xl:h-[calc(100vh-60px)] shadow-lg rounded-lg">
        <OrganizationalChart
          activeTree={activeTree}
          setActiveTree={setActiveTree}
        />
      </div>
      <div
        id="scroll"
        className="mr-4 xl:w-2/5 max-xl:w-full max-xl:ml-4 bg-white dark:bg-headerFooterBackground overflow-y-auto h-auto xl:h-[calc(100vh-60px)] shadow-lg rounded-lg"
      >
        {topic(activeTree)}
      </div>
    </div>
  );
}

export default StructurePage;
