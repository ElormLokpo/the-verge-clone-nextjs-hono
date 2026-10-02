"use client";

import { useState } from "react";

import { BlogEditor } from "../../../components/blogEditor";
import { TopNav } from "@/app/components/topNav";
import { useCreatePost } from "@/app/hooks/postsHook";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Technology");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [body, setBody] = useState("");
  const { mutate, isPending } = useCreatePost()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    const post = {
      title,
      summary,
      coverPhoto,
      category,
      body,
      published: true,
    };

    console.log(post);
    mutate(post);
  }

  return (
    <main className="mx-auto max-w-7xl p-8 text-white">
      <div className="flex flex-col gap-3 items-end justify-end mb-10">
        <TopNav />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Create post</h1>

            <p className="mt-1 text-stone-400">
              Write and publish a new story.
            </p>
          </div>

          <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-800 px-9 py-3 text-sm font-medium text-white"
          >
            Publish
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Post title"
              className="w-full border-b border-stone-500 pb-2 text-4xl font-bold outline-none"
            />

            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Write a short summary..."
              rows={3}
              className="w-full resize-none  border border-stone-500 p-4 outline-none"
            />

            <BlogEditor onChange={setBody} />
          </section>

          <aside className="space-y-6">
            <div className=" border border-stone-500 p-5">
              <h2 className="mb-4 font-semibold">Publishing</h2>

              <label className="mb-2 block text-sm font-medium">Category</label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full  border border-stone-500 p-3"
              >
                <option>Technology</option>
                <option>AI</option>
                <option>Reviews</option>
                <option>Science</option>
                <option>Culture</option>
              </select>
            </div>

            <div className=" border border-stone-500 p-5">
              <h2 className="mb-4 font-semibold">Cover image</h2>

              <input
                value={coverPhoto}
                onChange={(event) => setCoverPhoto(event.target.value)}
                placeholder="Image URL"
                className="w-full  border border-stone-500 p-3"
              />
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}
