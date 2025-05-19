"use client";

import { useAuth } from "@/context/auth/AuthProvider";
import { Menu } from "lucide-react";
import ProfileDropdown from "../ui/profile-dropdown";
import type { FC } from "react";


type props = {
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: FC<props> = ({ setIsSheetOpen }) => {
  const { user } = useAuth()
  return (
    <nav className="sticky top-0 z-50 bg-[#F6F7F8] pt-4">
      <div className="flex items-center justify-between p-4 bg-white backdrop-blur-md rounded-t-2xl">
        <div className="flex items-center gap-5">
          <div
            className="p-3 hover:bg-mainBlue/25 rounded-full bg-slate-200 block xl:hidden"
            onClick={() => setIsSheetOpen(true)}
          >
            <Menu fontSize={32} className="text-mainBlue" />
          </div>
          <div className="flex flex-col gap-x-4">
            <p className="text-xs text-light_gray">Welcome back, {user?.name} 👋</p>
            <p className="text-[#0A1629] font-medium text-2xl">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Header;
