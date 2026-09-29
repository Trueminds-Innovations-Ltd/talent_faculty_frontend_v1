import { useRef, useState } from "react";
import { DocumentUpload, More } from "iconsax-react";
import type { Project, ProjectFile } from "../types/types";
import { CURRENT_USER_ID } from "../data/data";
import { Avatar, fmtDate } from "../components/uii";

const categoryOf = (name: string): ProjectFile["category"] =>
  /\.(pdf|docx?|pptx?)$/i.test(name) ? "Documents" : /\.(fig|png|jpe?g|svg)$/i.test(name) ? "Design" : "Others";

export default function FilesTab({ project }: { project: Project }) {
  const [files, setFiles] = useState(project.files);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    // TODO: upload to your API, then append the response instead.
    const added = Array.from(list).map<ProjectFile>((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      category: categoryOf(f.name),
      uploadedBy: CURRENT_USER_ID,
      uploadedAt: new Date().toISOString(),
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    setFiles((prev) => [...prev, ...added]);
  };

  return (
    <div>
      <h2 className="text-xl text-black font-semibold">Project Files</h2>
      <p className="mt-1 text-black">Keep your team's files and resources in one place.</p>

      <table className="mt-6 w-full text-left text-sm text-black">
        <thead>
          <tr>{["Name", "Uploaded By", "Uploaded", "Size", "Action"].map((h) => <th key={h} className="px-3 py-4 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {files.map((f) => {
            const by = project.members.find((m) => m.id === f.uploadedBy);
            return (
              <tr key={f.id}>
                <td className="px-3 py-4">
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-black">{f.category}</p>
                </td>
                <td className="px-3 py-4">
                  {by && (
                    <div className="flex items-center gap-3">
                      <Avatar member={by} size={40} /> {by.name.split(" ")[0]}
                      {by.id === CURRENT_USER_ID && <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] text-black">You</span>}
                    </div>
                  )}
                </td>
                <td className="px-3 py-4">
                  <p>{fmtDate(f.uploadedAt)}</p>
                  <p className="text-[10px] text-black">{new Date(f.uploadedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                </td>
                <td className="px-3 py-4">{f.size}</td>
                <td className="px-3 py-4"><button aria-label="File actions" className="p-2"><More size={22} color="#000000" className="rotate-90" /></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        className={`mt-4 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed py-12 text-sm transition ${dragging ? "border-primary bg-primary/5" : "border-gray-200"}`}
      >
        <DocumentUpload size={40} color="#000" />
        <p className="text-black">
          Drag and drop files to upload or{" "}
          <button onClick={() => input.current?.click()} className="text-primary hover:underline font-bold text-black">browse</button>
        </p>
        <input ref={input} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
      </div>
    </div>
  );
}
