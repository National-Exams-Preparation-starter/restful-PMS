import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { logout } from "@/services/utils.service";
import { useAuth } from "@/context/auth/AuthProvider";

const ProfileDropdown = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer focus:outline-none"
        asChild
      >
        <Icon
          color="#343E4A"
          className="text-[2rem] hover:text-gray-600 transition-colors duration-200"
          icon={"carbon:user-avatar-filled-alt"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`${isAdmin ? "/admin" : ""}/profile`}>
            <DropdownMenuItem className="!cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
