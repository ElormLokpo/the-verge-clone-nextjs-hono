import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import { TiUser } from "react-icons/ti";
import Link from "next/link";
import { CLIENT_ROUTES } from "../constants";

export const TopNav = () => {

    const navItems = [
        { title: "Tech", link: "" },
        { title: "Reviews", link: "" },
        { title: "Science", link: "" },
        { title: "Entertainment", link: "" },
        { title: "AI", link: "" },
        { title: "Policy", link: "" }
    ]


    return (
        <div>
            <div className="flex justify-end items-center  gap-5 mb-3 text-white">
                <div className="bg-[#3cffd0] p-1 ">
                    <div className="text-xs text-stone-900">SUBSCRIBE</div>
                </div>

                <div className="flex gap-1 hover:cursor-pointer">
                    <div><TiUser className="text-[#3cffd0]" /></div>
                    <Link href={CLIENT_ROUTES.signIn} className="text-xs">SIGN IN</Link>
                </div>
            </div>


            <div className="flex gap-5 border-b border-white">
                <div className="py-2">
                    <Image src="/sm-dark-logo.svg" alt="logo" width={100} height={50} />
                </div>
                {
                    navItems.map((item, index) => (
                        <div key={index} className="flex items-center text-white  gap-5">
                            <span className="text-lg ">{item.title}</span><span>{"/"}</span>
                        </div>
                    ))
                }

                <div className="text-lg flex items-center ">
                    <IoMdNotificationsOutline className="text-white" />
                </div>

                <div className="text-lg flex items-center ">
                    <RxHamburgerMenu className="text-white" />
                </div>
            </div>
        </div>
    )
}