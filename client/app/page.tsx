import Image from "next/image";
import { TopNav } from "./components/topNav";


export default function Home() {

  return (
    <div className="h-screen w-screen bg-[#131313] px-100 py-16">
      <div className="flex flex-col gap-3 items-end justify-end mb-10">
        <TopNav />
      </div>

      <div>
        <div>
            <Image src="/logo-dark-lg-transparent.png" alt="hero" width={140} height={500} />
        </div>
      
      </div>
    </div>
  );
}


