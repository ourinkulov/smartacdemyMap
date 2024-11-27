import { FC, ReactNode } from "react";
import "../styles/styles.scss";
import Sidebar from "./Sidebar";
import { IAuth } from "../redux/dataStored/authReducer";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: IAuth) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <div className="layout-wrapper" data-testid="layout-wrapper">
          <Sidebar />
          <div className="main-wrapper">
            <Topbar />
            <div className="main-content h-[calc(100vh-48px)]">{children}</div>
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default Layout;
