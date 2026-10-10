"use client";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import { TiUser } from "react-icons/ti";
import Link from "next/link";
import { CLIENT_ROUTES } from "../constants";
import { useAuthStore } from "../store";
import { useNavigate } from "../hooks";

export const TopNav = ({ textColor, logo, borderColor }: { textColor?: string; logo?: React.ReactNode; borderColor?: string }) => {
  const token = useAuthStore((state) => state.token);
  const { navigateTo } = useNavigate();

  const navItems = [
    { title: "Tech", link: "" },
    { title: "Reviews", link: "" },
    { title: "Science", link: "" },
    { title: "Entertainment", link: "" },
    { title: "AI", link: "" },
    { title: "Policy", link: "" },
  ];

  return (
    <div>
      <div className={`flex justify-end items-center  gap-5 mb-3 ${textColor ?? "text-white"} `}>
        <div className={`${textColor ? "" : "bg-[#3cffd0]"} p-1 `}>
          <div className="text-xs text-stone-900">SUBSCRIBE</div>
        </div>
        <div className="flex gap-1 hover:cursor-pointer">
          <div>
            <TiUser className={`${textColor ?? "text-[#3cffd0]"}`} />
          </div>
          <Link href={token ? "" : CLIENT_ROUTES.signIn} className="text-xs">
            {token ? "ACCOUNT" : "SIGN IN"}
          </Link>
        </div>
      </div>

      <div className={`flex gap-5 border-b ${borderColor ?? "border-white"}`}>
        <div className="py-2 hover:cursor-pointer" onClick={() => navigateTo("/")}>
          <Image src="/sm-dark-logo.svg" alt="logo" width={100} height={50} />
        </div>
        {navItems.map((item, index) => (
          <div key={index} className={`flex items-center ${textColor ?? "text-white"}  gap-5`}>
            <span className="text-lg hover: cursor-pointer hover:text-stone-600">
              {item.title}
            </span>
            <span>{"/"}</span>
          </div>
        ))}

        {token && (
          <Link href={CLIENT_ROUTES.createPost} className="flex items-center">
            <span className={`text-lg hover: cursor-pointer ${textColor ?? "text-[#3cffd0]"} ${textColor ? "hover:text-stone-500" : "hover:text-[#3cffd0]/50"}`}>
              Create Post
            </span>
          </Link>
        )}

        <div className="text-lg flex items-center ">
          <IoMdNotificationsOutline className={`${textColor ?? "text-white "}`} />
        </div>

        <div className="text-lg flex items-center ">
          <RxHamburgerMenu className={`${textColor ?? "text-white "}`} />
        </div>
      </div>
    </div>
  );
};
