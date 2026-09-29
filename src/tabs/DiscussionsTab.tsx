import { useState } from "react";
import { Like1, Send2 } from "iconsax-react";
import type { Project } from "../types/types";
import { CURRENT_USER_ID } from "../data/data";
import { Avatar, fmtDate } from "../components/uii";

export default function DiscussionsTab({ project }: { project: Project }) {
  const [comments, setComments] = useState(project.comments);
  const [text, setText] = useState("");

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setComments((c) => [...c, { id: crypto.randomUUID(), authorId: CURRENT_USER_ID, createdAt: new Date().toISOString(), text: value, replies: 0, likes: 0 }]);
    setText("");
  };

  const toggleLike = (id: string) =>
    setComments((c) => c.map((x) => (x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)));

  return (
    <div className="flex min-h-[60vh] flex-col">
      <h2 className="text-xl text-black font-semibold">Project Discussions</h2>
      <p className="mt-1 text-black">Start a conversation with your team about the project.</p>

      <div className="mt-6 flex-1 space-y-4 text-black">
        {comments.map((c) => {
          const author = project.members.find((m) => m.id === c.authorId)!;
          return (
            <article key={c.id} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <Avatar member={author} size={48} />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{author.name}</span>
                  <span className="ml-4 text-black">
                    {fmtDate(c.createdAt, { month: "long", day: "numeric", year: "numeric" })},{" "}
                    {new Date(c.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </span>
                </p>
                <p className="mt-2 text-black">{c.text}</p>
                {c.replies > 0 && <button className="mt-4 text-sm text-primary">{c.replies} replies</button>}
              </div>
              <button
                onClick={() => toggleLike(c.id)}
                aria-pressed={c.liked}
                className="flex h-9 items-center gap-2 self-end rounded-lg border border-gray-200 px-3 text-sm text-primary"
              >
                <Like1 size={18} color="#34C759" variant="Bold" /> {c.likes}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-full border text-black border-gray-200 bg-white px-5 py-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent  outline-none"
        />
        <button onClick={send} aria-label="Send message" className="text-primary"><Send2 size={22} color="#34C759" /></button>
      </div>
    </div>
  );
}
