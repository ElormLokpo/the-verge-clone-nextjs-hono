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
import { useCreateComment, useDeleteComment, useGetComments, useUpdateComment } from "@/app/hooks/commentsHook";
import { CommentResponse } from "@/app/types";
import { formatDate } from "@/app/lib/utils";
import { useAuthStore } from "@/app/store";
import { MdOutlineDelete } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";

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
            <div className="mb-4 font-['polySans',Helvetica,Arial,sans-serif] underline decoration-1 font-medium text-[65px] leading-16.25">
              {post.title}
            </div>

            <div className="mb-3 font-['polySans',Helvetica,Arial,sans-serif] font-light text-[26px] leading-7.25">
              {post.summary}
            </div>

            <div className="mb-4 font-['polySans',Helvetica,Arial,sans-serif] font-medium text-[18px] leading-5">
              {post.author.name}
            </div>

            <div className="text-xl flex gap-2">
              <div className="border rounded-full p-2">
                <HiOutlineLink />
              </div>
              <div className="border rounded-full p-2">
                <IoIosShareAlt />
              </div>

              <div className="flex gap-2 text-sm items-center">
                <GoComment /> <span>{post.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-100 py-10 mb-10">
        <BlogContent content={post.body} />
      </div>

      <div className="px-100 mb-10">
        <div>
          <CommentsSection
            slug={post.slug}
            postId={post.id}
            commentCount={post.commentCount}
          />
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
        prose-a:text-stone-400
        prose-a:underline
        prose-li:text-stone-400
      "
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

type Comment = {
  postId: string;
  body: string;
};

function CommentsSection({
  postId,
  commentCount,
  slug,
}: {
  postId?: string;
  commentCount: number;
  slug: string;
}) {
  const [comment, setComment] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [edittedComment, setEdittedComment] = useState("");

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);


  const userId = useAuthStore((state) => state.user?.id);

  const { mutate: createComment, isPending } = useCreateComment(slug);
  const { data: commentsData } = useGetComments(postId || "");

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment()
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = comment.trim();

    if (!content) return;

    const newComment: Comment = {
      postId: postId || "",
      body: content,
    };

    createComment(newComment);

    setComment("");
  }

  const handleDeleteComment = async (id: string) => {
    setDeletingCommentId(id);

    try {
      await deleteComment(id);
    } finally {
      setDeletingCommentId(null);
    }
  }

  const handleUpdateComment = async (id: string) => {
    const content = edittedComment.trim();

    await updateComment({ id, data: { body: content } });
  }

  if (!commentsData?.data) {
    return <div>Loading Comments...</div>;
  }

  return (
    <section className="w-full max-w-3xl py-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight ">Comments</h2>

        <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600">
          {commentCount} {commentCount > 1 ? "Comments" : "Comment"}
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
            disabled={!comment.trim() || isPending}
            className=" bg-[#D6F31F] px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-[#D6F31F]/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Posting comment..." : "Post comment"}
          </button>
        </div>
      </form>

      <div className="divide-y divide-stone-600">
        {commentCount === 0 ? (
          <p className="py-10 text-center text-sm text-stone-500">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          commentsData.data.toReversed().map((comment: CommentResponse) => (
            <article key={comment.id} className="flex gap-4 py-6 first:pt-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6F31F] text-sm font-semibold text-stone-700">
                {comment.author.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-sm font-semibold text-stone-100">
                    {comment.author.name}
                  </h3>

                  <time className="text-xs text-stone-400">
                    {formatDate(comment.createdAt)}
                  </time>

                  {comment.author.id === userId && <span> | </span>}


                  {comment.author.id === userId && <div className="flex gap-4 items-center">

                    <button onClick={() => {
                      setEditingCommentId(comment.id);
                      setEdittedComment(comment.body)

                    }} className="flex gap-1 items-center text-xs text-stone-200 hover:text-stone-300">
                      <span><RiEditLine /> </span>
                      <span>Edit</span>
                    </button>

                    <button key={comment.id} disabled={isDeleting} onClick={() => handleDeleteComment(comment.id)} className="flex gap-1 items-center text-xs text-red-500 hover:text-red-700">
                      <span><MdOutlineDelete /> </span>
                      <span>  {deletingCommentId === comment.id ? "Deleting..." : "Delete"}</span>
                    </button>


                  </div>}
                </div>

                {editingCommentId === comment.id ? <form onSubmit={() => handleUpdateComment(comment.id)} className="mb-10">


                  <textarea
                    id="comment"
                    value={edittedComment}
                    onChange={(event) => setEdittedComment(event.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    maxLength={2000}
                    className="w-full resize-y border border-stone-300  px-4 py-3 text-sm leading-6 text-stone-100 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                  />

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-400">
                      {edittedComment.length}/2000 characters
                    </span>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setEditingCommentId(null)}
                        disabled={!edittedComment.trim() || isPending}
                        className=" bg-stone-600 text-white px-5 py-2.5 text-sm font-medium  transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={!edittedComment.trim() || isPending}
                        className=" bg-[#D6F31F] px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-[#D6F31F]/50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isPending ? "Editting comment..." : "Edit comment"}
                      </button>
                    </div>


                  </div>
                </form>
                  : <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-stone-300">
                    {comment.body}
                  </p>}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
