"use client";
import { TopNav } from "@/app/components/topNav";
import { useParams } from "next/navigation";
import { useGetPostByCategory } from "@/app/hooks/postsHook";
import { useNavigate } from "@/app/hooks";
import { Post } from "@/app/types";
import Image from "next/image";
import { VscComment } from "react-icons/vsc";
import { formatDate } from "@/app/lib/utils";
import { LoadingScreen } from "@/app/components/loadingScreen";

export default function PostCategoryPage() {
  const { category } = useParams<{ category: string }>();

  const { data: posts, isLoading } = useGetPostByCategory(category);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const brief: Record<string, string> = {
    Tech: "The latest tech news about the world’s best (and sometimes worst) hardware, apps, and much more. From top companies like Google and Apple to tiny startups vying for your attention, Verge Tech has the latest in what matters in technology daily.",
    Reviews:
      "Looking to buy your next phone, laptop, headphones, or other tech gear? Or maybe you just want to know all of the details about the latest products from Apple, Samsung, Google, and many others. The Verge Reviews is the place for all of that and more. Whether you’re looking for buying advice, how to use products you already own, or the best deals on products we’ve tested and used ourselves and can recommend, you needn’t look any further.",
    Science:
      "Featuring the latest in daily science news, Verge Science is all you need to keep track of what’s going on in health, the environment, and your whole world. Through our articles, we keep a close eye on the overlap between science and technology news — so you’re more informed.",
    Entertainment:
      "The Verge’s entertainment section collects the latest news from the worlds of pop culture, music, movies, television, and video games. Whether you want to know what to watch on Netflix or how to make the most of your streaming service budget, the entertainment section acts a reliable source. There’s simply too much to read, watch, hear, and play. Let us be your tour guide.",
    AI: "Artificial intelligence is more a part of our lives than ever before. While some might call it hype and compare it to NFTs or 3D TVs, generative AI is causing a sea change in nearly every part of the technology industry. OpenAI’s ChatGPT is still the best-known AI chatbot around, but with Google pushing Gemini, Microsoft building Copilot, and Apple adding its Intelligence to Siri, AI is probably going to be in the spotlight for a very long time. At The Verge, we’re exploring what might be possible with AI — and a lot of the bad stuff AI does, too.",
    Policy:
      "Tech is reshaping the world — and not always for the better. Whether it’s the rules for Apple’s App Store or Facebook’s plan for fighting misinformation, tech platform policies can have enormous ripple effects on the rest of society. They’re so powerful that, increasingly, companies aren’t setting them alone but sharing the fight with government regulators, civil society groups, and internal standards bodies like Meta’s Oversight Board. The result is an ongoing political struggle over harassment, free speech, copyright, and dozens of other issues, all mediated through some of the largest and most chaotic electronic spaces the world has ever seen.",
  };

  return (
    <div>
      <div className="bg-[#5200FF] px-100 pt-10 flex flex-col justify-between h-100 w-full mb-15 text-white ">
        <div className="flex flex-col gap-3 items-end justify-end mb-10">
          <TopNav textColor="text-white" borderColor="border-white" />
        </div>

        <div className="font-['manuka','manuka_Fallback',Impact,Helvetica,sans-serif] font-semibold italic-none text-white text-[80px] relative top-14">
          {category}
        </div>
      </div>

      <div className="px-100 mb-30">
        <div className="font-['fkRomanStandard','fkRomanStandard_Fallback',Georgia,serif] font-normal not-italic text-white text-[22px] leading-7.75">
          {brief[category] || "Category not found"}
        </div>
      </div>

      <div className="px-150">
        {posts?.data.map((post: Post, index: number) => (
          <Section key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export const Section = ({ post }: { post: Post }) => {
  const { navigateTo } = useNavigate();

  return (
    <div
      className="hover:cursor-pointer"
      onClick={() => navigateTo(`/post/${post.slug}`)}
    >
      <div className="absolute z-10 top-40 left-60">
        <Image
          src="/logo-dark-lg-transparent.png"
          alt="hero"
          width={140}
          height={140}
        />
      </div>

      <div className="relative h-125">
        <Image src={post.coverPhoto} alt="hero" fill className="object-fit" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="text-white px-30 relative top-[-50]">
        <div className="text-[3rem] hover:underline hover:decoration-[#3cffd0] decoration-1 font-black mb-4 leading-12 tracking-tighter">
          {post.title}
        </div>
        <div className="text-[1.5rem] mb-2 font-serif leading-8 tracking-tighter">
          {post.summary}
        </div>
        <div className="text-sm flex gap-4 text-stone-400">
          <span>{formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-2">
            <span>
              <VscComment />
            </span>
            {post.commentCount} Comment
            {post.commentCount > 1 && "s"}
          </span>
        </div>
      </div>
    </div>
  );
};
