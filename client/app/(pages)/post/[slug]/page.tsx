"use client";

import { TopNav } from "@/app/components/topNav";
import Image from "next/image";
import { HiOutlineLink } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { GoComment } from "react-icons/go";
import DOMPurify from "isomorphic-dompurify";
import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useGetPost } from "@/app/hooks/postsHook";


export default function PostPage() {
    const { slug } = useParams<{ slug: string }>();

    const { data, isLoading, isError } = useGetPost(slug);

    const post = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load post.</div>;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }
   


    return (
        <div className="text-white">
            <div className="bg-[#D6F31F] px-100 py-10 h-160 w-full mb-10 text-[#131313] ">
                <div className="flex flex-col gap-3 items-end justify-end mb-10">
                    <TopNav textColor="text-black" borderColor="border-black" />
                </div>

                <div className="grid grid-cols-2 gap-2">


                    <div className="relative w-120 mb-2 ">
                        <Image
                            src={post.coverPhoto}
                            alt="hero"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <div className="mb-4 font-['polySans',Helvetica,Arial,sans-serif] underline decoration-1 font-medium text-[65px] leading-16.25">{post.title}</div>

                        <div className="mb-3 font-['polySans',Helvetica,Arial,sans-serif] font-light text-[26px] leading-7.25">{post.summary}</div>

                        <div className="mb-4 font-['polySans',Helvetica,Arial,sans-serif] font-medium text-[18px] leading-5">{post.author.name}</div>

                        <div className="text-xl flex gap-2">
                            <div className="border rounded-full p-2"><HiOutlineLink /></div>
                            <div className="border rounded-full p-2"><IoIosShareAlt /></div>

                            <div className="flex gap-2 text-sm items-center"><GoComment /> <span>{post.commentCount}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-100 py-10 mb-10">
                <BlogContent content={
                    post.body
                } />
            </div>

            <div className="px-100 mb-10">
                <div>
                    <CommentsSection />
                </div>
            </div>
        </div>
    );
}



type BlogContentProps = {
    content: string;
};

const BlogContent = ({ content }: BlogContentProps) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <article
            className="
        prose prose-lg max-w-none
        prose-headings:font-semibold
        prose-headings:text-white
        prose-p:text-stone-400
        prose-p:leading-7
        prose-strong:font-semibold
        prose-blockquote:border-l-4
        prose-blockquote:border-[#D6F31F]
        prose-blockquote:pl-4
        prose-a:text-blue-600
        prose-a:underline
      "
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
}






type Comment = {
    id: string;
    author: string;
    content: string;
    createdAt: string;
};

const initialComments: Comment[] = [
    {
        id: "1",
        author: "Kwame Mensah",
        content:
            "This is a really interesting experiment. I've been trying to organize my workflow with AI tools too, and the results have been mixed.",
        createdAt: "2 hours ago",
    },
    {
        id: "2",
        author: "Ama Boateng",
        content:
            "The point about confusing productivity with following a checklist really resonates with me. Sometimes we optimize everything except the actual work.",
        createdAt: "5 hours ago",
    },
    {
        id: "3",
        author: "Daniel Owusu",
        content:
            "I would love to see a follow-up on how the assistant handles unexpected changes to your schedule.",
        createdAt: "1 day ago",
    },
];

function CommentsSection() {
    const [comments, setComments] = useState(initialComments);
    const [comment, setComment] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const content = comment.trim();

        if (!content) return;

        const newComment: Comment = {
            id: crypto.randomUUID(),
            author: "You",
            content,
            createdAt: "Just now",
        };

        setComments((previous) => [newComment, ...previous]);
        setComment("");
    }

    return (
        <section className="w-full max-w-3xl py-8 text-white">

            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight ">
                    Comments
                </h2>

                <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
                    {comments.length}
                </span>
            </div>


            <form onSubmit={handleSubmit} className="mb-10">
                <label
                    htmlFor="comment"
                    className="mb-3 block text-sm font-medium text-stone-100"
                >
                    Join the conversation
                </label>

                <textarea
                    id="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    maxLength={2000}
                    className="w-full resize-y border border-stone-300  px-4 py-3 text-sm leading-6 text-stone-100 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                />

                <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-400">
                        {comment.length}/2000 characters
                    </span>

                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className=" bg-[#D6F31F] px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-[#D6F31F]/50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Post comment
                    </button>
                </div>
            </form>


            <div className="divide-y divide-stone-600">
                {comments.length === 0 ? (
                    <p className="py-10 text-center text-sm text-stone-500">
                        No comments yet. Be the first to share your thoughts.
                    </p>
                ) : (
                    comments.map((item) => (
                        <article key={item.id} className="flex gap-4 py-6 first:pt-0">

                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6F31F] text-sm font-semibold text-stone-700">
                                {item.author
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <h3 className="text-sm font-semibold text-stone-100">
                                        {item.author}
                                    </h3>

                                    <time className="text-xs text-stone-400">
                                        {item.createdAt}
                                    </time>
                                </div>

                                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-stone-300">
                                    {item.content}
                                </p>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}