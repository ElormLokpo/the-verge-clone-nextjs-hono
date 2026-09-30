import Image from "next/image";
import { TopNav } from "./components/topNav";
import { articles, getRandomItems } from "./constants/mock-data-blog";
import { Article } from "./types";
import { VscComment } from "react-icons/vsc";




export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#131313] px-70 py-16 mb-30">
      <div className="flex flex-col gap-3 items-end justify-end mb-10">
        <TopNav />
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="col-span-2">

          <div className="mb-20">
            <HeaderSection />
          </div>

          <div className="mb-20">
            <FourGridSectionContainer />
          </div>

          <div className="mb-20">
            <FiveGridSectionContainer key={1} />
          </div>

          <div className="mb-20">
            <LinkSectionContainer key={3} />
          </div>

          <div className="mb-20">
            <FiveGridSectionContainer key={2} />
          </div>

          <div className="mb-20">
            <LinkSectionContainer key={4} />
          </div>


        </div>

        <div className="col-span-1 text-white p-5 border-l border-dashed border-stone-700">
          <RightSectionContainer />
        </div>

      </div>


    </div>
  );
}


const HeaderSection = () => {
  const article: Article[] = getRandomItems(articles, 1);

  return (
    <div className="hover:cursor-pointer">
      <div className="absolute z-10 top-40 left-60">
        <Image
          src="/logo-dark-lg-transparent.png"
          alt="hero"
          width={140}
          height={140}
        />
      </div>


      <div className="relative h-125" >
        <Image src={article[0].coverPhoto} alt="hero" fill className="object-fit" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="text-white px-30 relative top-[-50]">
        <div className="text-[3.5rem] hover:underline hover:decoration-[#3cffd0] decoration-1 font-black mb-4 leading-12 tracking-tighter">{article[0].title}</div>
        <div className="text-[1.5rem] mb-2 font-serif leading-8 tracking-tighter">{article[0].summary}</div>
        <div className="text-sm flex gap-4 text-stone-400">
          <span className="text-[#3cffd0]">{article[0].author.name}</span>
          <span>{article[0].date}</span>
          <span className="flex items-center gap-2"><span><VscComment /></span>{article[0].comments.length} Comment{article[0].comments.length > 1 && "s"}</span>
        </div>
      </div>

    </div>
  );
}


const FourGridSectionContainer = () => {
  const article: Article[] = getRandomItems(articles, 4);

  return (
    <div>
      <div className="grid grid-cols-2 gap ">
        <div className=" border-r border-stone-700 px-5">
          <FourGridSection article={article[0] as Article} />
        </div>
        <div className="px-5">
          <FourGridSection article={article[1]} />
        </div>

      </div>

      <div className=" my-5 border-t border-stone-700"></div>

      <div className="grid grid-cols-2 gap ">
        <div className=" border-r border-stone-700 px-5">
          <FourGridSection article={article[2] as Article} />
        </div>
        <div className="px-5">
          <FourGridSection article={article[3]} />
        </div>

      </div>


    </div>
  )
}

const FourGridSection = ({ article }: { article: Article }) => <div className="flex hover:cursor-pointer gap-3 text-white">
  <div className="w-40 relative"><Image src={article.coverPhoto} alt="hero" fill className="object-cover" /></div>

  <div className="">

    <div className="text-xl mb-2 font-semibold tracking-tighter leading-5 hover:underline hover:decoration-[#3cffd0] decoration-1">{article.title}</div>

    <div className="text-sm flex gap-4 text-stone-400">
      <span className="text-[#3cffd0]">{article.author.name}</span>
      <span className="flex items-center gap-2"><span><VscComment /></span>{article.comments.length} Comment{article.comments.length > 1 && "s"}</span>
    </div>


  </div>
</div>


export const FiveGridSectionContainer = () => {
  const article: Article[] = getRandomItems(articles, 5);

  return (
    <div className="border-t-2 border-[#3cffd0] py-1 hover:cursor-pointer text-white">
      <div className="text-xl flex gap-3 items-center mb-4">
        <span className="font-bold">{article[0].category}
          <span className="text-[#3cffd0]">{" / "}</span>
          <span className=" font-semibold text-stone-300">{article[1].summary}</span></span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="relative  mb-2 "><Image src={article[0].coverPhoto} alt="hero" width={500} height={500} className="object-cover" /></div>

          <div>
            <div className="text-white">
              <div className="text-[2rem] hover:underline hover:decoration-[#3cffd0] decoration-1 font-black mb-4 leading-8 tracking-tighter">{article[0].title}</div>
              <div className="text-[1.4rem] text-stone-100 mb-2 font-serif leading-8 tracking-tighter">{article[0].summary}</div>
              <div className="text-sm flex gap-4 text-stone-400">
                <span className="text-[#3cffd0]">{article[0].author.name}</span>

                <span className="flex items-center gap-2"><span><VscComment /></span>{article[0].comments.length} Comment{article[0].comments.length > 1 && "s"}</span>
              </div>
            </div>
          </div>


        </div>

        <div>
          {article.slice(1).map((article, index) => <div key={index} className="py-4 border-b border-stone-700">
            <FiveGridSection article={article} />
          </div>)}


        </div>
      </div>


    </div>
  )


}


const FiveGridSection = ({ article }: { article: Article }) => <div className="grid grid-cols-6 hover:cursor-pointer gap-3 text-white">

  <div className="col-span-4">
    <div className="text-lg mb-2 font-semibold tracking-tighter leading-5 hover:underline hover:decoration-[#3cffd0] decoration-1">{article.title}</div>
    <div className="text-sm text-stone-300 mb-2 font-serif leading-6 tracking-tighter">{article.summary}</div>


    <div className="text-sm flex gap-4 text-stone-400">
      <span className="text-[#3cffd0]">{article.author.name}</span>
      <span className="flex items-center gap-2"><span><VscComment /></span>{article.comments.length} Comment{article.comments.length > 1 && "s"}</span>
    </div>
  </div>

  <div className="w-35 relative col-span-2 p-3"><Image src={article.coverPhoto} alt="hero" fill className="object-cover" /></div>
</div>


const LinkSectionContainer = () => {
  const article: Article[] = getRandomItems(articles, 5);

  return (
    <div className="border-t-2 text-white border-[#3cffd0] py-1 hover:cursor-pointer text-white">
      <div className="font-black text-2xl mb-5">Most Popular</div>

      <div>
        {article.map((article, index) => <div key={index} className="py-4 border-b border-stone-700">
          <LinkSecktion article={article} index={index + 1} />
        </div>)}
      </div>
    </div>
  )
}

const LinkSecktion = ({ article, index }: { article: Article, index: number }) => <div className="flex hover:cursor-pointer gap-3 text-white">
  <div className="w-20 relative ">
    <div className="bg-stone-700 mx-4 h-full text-center flex items-center justify-center text-lg hover:bg-indigo-600">
      {index}
    </div>
  </div>

  <div className="">

    <div className="text-xl mb-2 font-semibold tracking-tighter leading-5 hover:underline hover:decoration-[#3cffd0] decoration-1">{article.title}</div>

    <div className="text-sm flex gap-4 text-stone-400">
      <span className="text-[#3cffd0]">{article.author.name}</span>
      <span className="flex items-center gap-2">{article.date}</span>
    </div>


  </div>
</div>




const RightSectionContainer = () => {
  const article: Article[] = getRandomItems(articles, 11);

  return (
    <div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={0} article={article[0]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <ImageBottomSection article={article[1]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={2} article={article[2]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={4} article={article[4]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <ImageBottomSection article={article[3]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={6} article={article[6]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <ImageBottomSection article={article[5]} />
      </div>

      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={8} article={article[8]} />
      </div>



      <div className="mb-12 border-b border-stone-700 py-8">
        <FiveGridSection key={10} article={article[10]} />
      </div>



    </div>
  )
}

const ImageBottomSection = ({ article }: { article: Article }) => {

  return (
    <div>

      <div>
        <div className="text-white">
          <div className="text-[1.2rem] hover:underline hover:decoration-[#3cffd0] decoration-1 font-black mb-1 leading-5 tracking-tighter">{article.title}</div>
          <div className="text-[1rem] text-stone-100 mb-2 font-serif leading-5 tracking-tighter">{article.summary}</div>

        </div>
      </div>

      <div className="relative  mb-2 "><Image src={article.coverPhoto} alt="hero" width={500} height={500} className="object-cover" /></div>
      <div className="text-sm flex gap-4 text-stone-400">
        <span className="text-[#3cffd0]">{article.author.name}</span>

        <span className="flex items-center gap-2 mb-6"><span><VscComment /></span>{article.comments.length} Comment{article.comments.length > 1 && "s"}</span>
      </div>
    </div>
  )
}