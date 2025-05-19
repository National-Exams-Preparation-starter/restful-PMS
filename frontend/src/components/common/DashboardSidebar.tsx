import { logout } from "@/services/utils.service";
import type { NavItem } from "@/types/common";
import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Separator } from "../ui/separator";
import UserCard from "./UserCard";
import { useAuth } from "@/context/auth/AuthProvider";
import { getNavItems, type UserRole } from "@/utils/constants";

interface Props {
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarMinimized: boolean;
  setIsSidebarMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: FC<Props> = ({
  isSidebarMinimized,
  setIsSidebarMinimized,
}) => {
  const { user } = useAuth();
  const pathName = location.pathname;
  const navItems = getNavItems(user?.role as UserRole);

  const renderNavItem = (item: NavItem) => {
    const isActive = pathName === `${item.href}`;
    return (
      <Link
        to={item.href!}
        key={item.name}
        className={`text-sm transition duration-300 hover:bg-primary hover:text-white h-[44px] px-3 rounded-lg text-[#494C52] w-full flex items-center justify-between gap-2 font-medium ${
          isActive ? "bg-primary !text-white relative" : ""
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            isSidebarMinimized ? "absolute w-full z-50" : ""
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <Icon icon={item.icon as string} fontSize={24} />
          </div>
          {!isSidebarMinimized && item.name}
        </div>
      </Link>
    );
  };

  return (
    <main
      className={`bg-white h-full w-full pt-4 pb-[3rem] max-h-[1024px] flex flex-col rounded-2xl ${
        isSidebarMinimized ? "" : "min-w-[264px]"
      }`}
    >
      <div className="text-mainBlue text-xl font-semibold px-[1rem]">Logo</div>
      <button
        className="absolute -right-2.5 top-10 transform translate-y-[-50%] bg-primary text-white rounded-full w-8 h-8 hidden xl:flex items-center justify-center shadow-md hover:bg-blue-800 transition"
        onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
      >
        <Icon
          icon={isSidebarMinimized ? "mdi:chevron-right" : "mdi:chevron-left"}
          fontSize={24}
        />
      </button>

      <div className="h-full flex flex-col gap-2 mt-5 justify-between">
        <div className="flex flex-col gap-2 px-[1rem]">
          {navItems.map(renderNavItem)}
        </div>
        <div>
          <div className="px-1">
            <button
              onClick={() => logout()}
              className={`text-sm transition hover:bg-neutral-100 duration-300 h-[44px] px-3 border-none rounded-lg text-[#494C52] w-full flex items-center justify-between gap-2 font-medium`}
            >
              <div
                className={`flex items-center gap-2 ${
                  isSidebarMinimized ? "absolute w-full z-50" : ""
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Icon
                    icon={"tabler:logout-2"}
                    fontSize={24}
                    className="text-red-700 text-2xl"
                  />
                </div>
                {!isSidebarMinimized && "Logout"}
              </div>
            </button>
          </div>
          <Separator orientation="horizontal" className="bg-primary/5 my-2" />
          <div className={"px-1"}>
            <UserCard
              isCollapsed={isSidebarMinimized}
              name={user?.name}
              email={user?.email || ""}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardSidebar;
