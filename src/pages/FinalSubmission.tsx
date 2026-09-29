import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, DocumentUpload } from "iconsax-react";
import { getProject, submitProject, CURRENT_USER_ID } from "../data/data";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, Modal, PrimaryButton } from "../components/uii";

// Earlier milestones are complete by the time the submit page is reachable.
const DONE = ["Research completed", "User flow completed", "UI screens completed"];

export default function FinalSubmission() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = getProject(projectId);
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [reflection, setReflection] = useState("");
  const [modal, setModal] = useState<"confirm" | "success" | null>(null);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  if (!project) return (
    <DashboardLayout title="Final Submission">
      <p className="p-8">Project not found.</p>
    </DashboardLayout>
  );

  const isLead = project.members.find((m) => m.id === CURRENT_USER_ID)?.isLead ?? false;

  const pending = [
    { label: "Project link added", ok: link.trim().length > 0 },
    { label: "Final presentation uploaded", ok: !!file },
    { label: "Team reflection added", ok: reflection.trim().length > 0 },
  ];

  const pickFile = (f?: File) => {
    if (!f) return;
    if (f.size > 50 * 1024 * 1024) return setError("Presentation must be 50MB or smaller.");
    setError("");
    setFile(f);
  };

  const confirm = async () => {
    await submitProject(project.id, { link, file: file!, reflection });
    setModal("success");
  };

  return (
    <DashboardLayout title="Final Project Submission" subtitle={project.title}>
      <div className="space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-full text-black bg-gray-100 px-4 py-2.5 text-sm font-medium">
          <ArrowLeft size={18} /> Go back
        </button>
        <h1 className="mt-6 text-2xl  font-semibold text-primary">Final Project Submission</h1>
        <p className="mt-2 text-sm text-black">
          Your team is ready to submit the completed project. Make sure all required files and links have been added before submitting.
        </p>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_1.1fr] text-black">
          <Card className="p-8">
            <h2 className="text-xl font-semibold">Submission checklist</h2>
            <ul className="mt-6 space-y-5">
              {[...DONE.map((label) => ({ label, ok: true, muted: true })), ...pending.map((p) => ({ ...p, muted: false }))].map((i) => (
                <li key={i.label} className="flex items-center gap-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 ${i.ok ? "border-green-500 bg-green-500 text-white" : "border-gray-300"}`}>
                    {i.ok && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>}
                  </span>
                  <span className={i.muted ? "text-black/60" : "text-black"}>{i.label}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-6 p-6">
            <div>
              <label htmlFor="link" className="text-sm font-medium">Project Link</label>
              <input
                id="link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://figma.com/..."
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-primary text-black"
              />
            </div>

            <div>
              <p className="text-sm font-medium">Final Presentation</p>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); pickFile(e.dataTransfer.files[0]); }}
                className="mt-2 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 py-12 text-sm text-black"
              >
                <DocumentUpload size={40} />
                {file ? (
                  <p className="font-medium">{file.name}</p>
                ) : (
                  <p>Drag and drop your file here or <button onClick={() => input.current?.click()} className="text-primary hover:underline">browse</button></p>
                )}
                <p className="text-xs text-black">PDF, PPT (Max 50MB)</p>
                <input ref={input} type="file" accept=".pdf,.ppt,.pptx" hidden onChange={(e) => pickFile(e.target.files?.[0])} />
              </div>
            </div>

            <div>
              <label htmlFor="reflection" className="text-sm font-medium">Team Reflection</label>
              <textarea
                id="reflection" rows={7} value={reflection} onChange={(e) => setReflection(e.target.value)}
                placeholder="Tell us briefly about your team's experience..."
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-primary text-black"
              />
            </div>

            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            <PrimaryButton
              className="w-full"
              disabled={!isLead}
              onClick={() => {
                if (!isLead) {
                  setError("Only the team lead can submit the final project.");
                  return;
                }
                pending.every((p) => p.ok) ? setModal("confirm") : setError("Add the project link, presentation and reflection to continue.");
              }}
            >
              <ArrowRight size={20} color="#fff" /> Submit Final Project
            </PrimaryButton>
            {!isLead && (
              <p className="text-center text-xs text-black mt-2">Only the team lead can submit the final project</p>
            )}
          </Card>
        </div>

        {modal === "confirm" && (
          <Modal>
            <h2 className="text-3xl font-bold text-black">Submit Final Project?</h2>
            <p className="mt-4 text-black">You're about to submit your team's final project for review. Make sure all required files and links have been added before submitting.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button onClick={() => setModal(null)} className="rounded-xl border border-gray-200 py-4 font-semibold text-black">Cancel</button>
              <PrimaryButton onClick={confirm}>Submit Project</PrimaryButton>
            </div>
          </Modal>
        )}

        {modal === "success" && (
          <Modal>
            <h2 className="text-3xl font-bold text-black">🎉 Project Submitted</h2>
            <p className="mt-4 text-black">Your team's project has been successfully submitted for review. We'll notify you when feedback is available.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button onClick={() => navigate("/group-projects")} className="rounded-xl border border-gray-200 py-4 font-semibold text-black">Back to Group Projects</button>
              <PrimaryButton onClick={() => navigate(`/group-projects/${project.id}`, { replace: true })}>View Project</PrimaryButton>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}
