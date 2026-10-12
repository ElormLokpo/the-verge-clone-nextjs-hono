"use client";

import Image from "next/image";
import { TiUser } from "react-icons/ti";
import Link from "next/link";
import { CLIENT_ROUTES } from "../constants";
import { useAuthStore } from "../store";
import { useNavigate } from "../hooks";

export const TopNav = ({
  textColor,
  logo,
  borderColor,
}: {
  textColor?: string;
  logo?: React.ReactNode;
  borderColor?: string;
}) => {
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { navigateTo } = useNavigate();

  const navItems = [
    { title: "Tech", link: "" },
    { title: "Reviews", link: "" },
    { title: "Science", link: "" },
    { title: "Entertainment", link: "" },
    { title: "AI", link: "" },
    { title: "Policy", link: "" },
  ];

  const handleSignOut = () => {
    if (token) {
      clearAuth();
    } else {
      navigateTo(CLIENT_ROUTES.signIn);
    }
  };

  return (
    <div>
      <div
        className={`flex justify-end items-center  gap-5 mb-3 ${textColor ?? "text-white"} `}
      >
        <div className="flex gap-1 hover:cursor-pointer">
          <div>
            <TiUser className={`${textColor ?? "text-[#3cffd0]"}`} />
          </div>
          <div
            onClick={handleSignOut}
            className={`text-xs ${textColor ? "" : "text-white"} hover:underline decoration-1 decoration-[#3cffd0]`}
          >
            {token ? "SIGN OUT" : "SIGN IN"}
          </div>
        </div>
      </div>

      <div className={`flex gap-5 border-b ${borderColor ?? "border-white"}`}>
        <div
          className="py-2 hover:cursor-pointer"
          onClick={() => navigateTo("/")}
        >
          {logo ?? (
            <Image src="/sm-dark-logo.svg" alt="logo" width={100} height={50} />
          )}
        </div>
        {navItems.map((item, index) => (
          <div
            onClick={() => navigateTo(`/category/${item.title}`)}
            key={index}
            className={`flex items-center ${textColor ?? "text-white"}  gap-5`}
          >
            <span className="text-lg hover: cursor-pointer hover:text-stone-600">
              {item.title}
            </span>
            <span>{"/"}</span>
          </div>
        ))}

        {token && (
          <Link href={CLIENT_ROUTES.createPost} className="flex items-center">
            <span
              className={`text-lg hover: cursor-pointer ${textColor ?? "text-[#3cffd0]"} ${textColor ? "hover:text-stone-500" : "hover:text-[#3cffd0]/50"}`}
            >
              Create Post
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};
