import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/instruct/DashboardLayout";
import {
    ChevronLeft,
    Settings,
    X,
    Upload,
    Link2,
    FileText,
    CheckCircle2,
} from "lucide-react";

type SubmissionType = "file" | "link" | "text";
type GradingRelease = "auto" | "manual";


function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-green-600" : "bg-gray-300"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}


function SubmissionOption({
    active,
    icon,
    title,
    hint,
    onClick,
}: {
    active: boolean;
    icon: React.ReactNode;
    title: string;
    hint: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${active ? "border-green-600 bg-green-50/40" : "border-gray-200 hover:border-gray-300"
                }`}
        >
            <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${active ? "border-green-600" : "border-gray-300"
                    }`}
            >
                {active && <span className="w-2 h-2 rounded-full bg-green-600" />}
            </span>
            <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                {icon}
            </span>
            <span>
                <p className="text-[13px] font-semibold text-gray-900">{title}</p>
                <p className="text-[12px] text-gray-500">{hint}</p>
            </span>
        </button>
    );
}

export default function Assignment() {
    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [submissionType, setSubmissionType] = useState<SubmissionType>("file");
    const [scoringCriteria, setScoringCriteria] = useState("");
    const [maxScore, setMaxScore] = useState("");


    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [maxFileSize, setMaxFileSize] = useState("500");
    const [maxFilesPerSubmission, setMaxFilesPerSubmission] = useState("3");
    const [allowLateSubmission, setAllowLateSubmission] = useState(true);
    const [latePenalty, setLatePenalty] = useState("10");
    const [gradingRelease, setGradingRelease] = useState<GradingRelease>("auto");
    const [allowTeamSubmission, setAllowTeamSubmission] = useState(true);
    const [enablePeerReviews, setEnablePeerReviews] = useState(true);
    const [allowInstructorFeedback, setAllowInstructorFeedback] = useState(true);


    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 4000);
        return () => clearTimeout(t);
    }, [toast]);

    const handlePublish = () => {

        setToast(`${title || "Assignment"} created successfully`);
    };

    const handleCancel = () => {
        navigate("/instructor/courses/1");
    };

    return (
        <DashboardLayout>
            <div className=" min-h-screen bg-white">
                {/* Toast notification */}
                {toast && (
                    <div className="fixed top-5 right-5 z-[60] flex items-center gap-2 rounded-xl border border-gray-100 bg-white shadow-lg px-4 py-3 animate-[fadeIn_0.2s_ease-out]">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        <span className="text-[13px] font-medium text-gray-800">{toast}</span>
                    </div>
                )}

                <div className="max-w-[900px]  px-6 py-4">

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-1 text-[13px] text-black font-semibold hover:text-primary mb-6"
                    >
                        <ChevronLeft size={16} />
                        Back to activity
                    </button>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Assignment details</h1>
                            <p className="text-[13px] text-gray-500 mt-1">
                                Provide the essential information learners need to complete this assignment.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSettingsOpen(true)}
                            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 shrink-0"
                        >
                            <Settings size={18} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                                Assignment title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Introduction......"
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-black text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                                Task description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                rows={4}
                                className="w-full rounded-xl border text-black border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                                Deadline
                            </label>
                            <input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full rounded-xl border text-black border-gray-200 px-4 py-2.5 text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-3">
                                Submission Type
                            </label>
                            <div className="flex flex-col gap-2">
                                <SubmissionOption
                                    active={submissionType === "file"}
                                    onClick={() => setSubmissionType("file")}
                                    icon={<Upload size={16} />}
                                    title="File Upload"
                                    hint="Accepted formats: PDF, DOCX, PNG, ZIP........."
                                />
                                <SubmissionOption
                                    active={submissionType === "link"}
                                    onClick={() => setSubmissionType("link")}
                                    icon={<Link2 size={16} />}
                                    title="External Link"
                                    hint="Accepted formats: Figma, Github, Docs, Google drive........"
                                />
                                <SubmissionOption
                                    active={submissionType === "text"}
                                    onClick={() => setSubmissionType("text")}
                                    icon={<FileText size={16} />}
                                    title="Text Entry"
                                    hint="Learners type their response directly in the platform."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                                Scoring Criteria
                            </label>
                            <textarea
                                value={scoringCriteria}
                                onChange={(e) => setScoringCriteria(e.target.value)}
                                placeholder="- Research Objectives (20%)"
                                rows={4}
                                className="w-full rounded-xl border text-black border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                                Maximum Score
                            </label>
                            <input
                                type="text"
                                value={maxScore}
                                onChange={(e) => setMaxScore(e.target.value)}
                                placeholder="e.g 100"
                                className="w-full rounded-xl border text-black border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center w-full gap-20 mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-xl border border-gray-200 px-6 py-2.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handlePublish}
                            className="rounded-xl bg-gray-200 px-6 py-2.5 text-[13px] font-semibold text-gray-500 hover:bg-primary hover:text-white transition-colors"
                        >
                            Publish
                        </button>
                    </div>
                </div>

                {/* Assessment Settings side panel */}
                {isSettingsOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black/30"
                        onClick={() => setIsSettingsOpen(false)}
                    >
                        <div
                            className="absolute top-6 right-6 bottom-6 w-[380px] bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <h2 className="text-[15px] font-bold text-gray-900">Assessment Settings</h2>
                                <button
                                    type="button"
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-[12px] text-gray-500 mb-6">
                                Configure how learners submit, how grades are released, and how feedback is
                                provided.
                            </p>

                            <p className="text-[12px] font-semibold text-gray-800 mb-3">Submission Rules</p>

                            <div className="mb-4">
                                <label className="block text-[12px] text-gray-600 mb-1.5">
                                    Maximum file size (MB)
                                </label>
                                <input
                                    type="text"
                                    value={maxFileSize}
                                    onChange={(e) => setMaxFileSize(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-[12px] text-gray-600 mb-1.5">
                                    Maximum files per submission
                                </label>
                                <input
                                    type="text"
                                    value={maxFilesPerSubmission}
                                    onChange={(e) => setMaxFilesPerSubmission(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[13px] text-gray-800">Allow Late Submission</span>
                                <Toggle checked={allowLateSubmission} onChange={setAllowLateSubmission} />
                            </div>

                            {allowLateSubmission && (
                                <div className="mb-6">
                                    <label className="block text-[12px] text-gray-600 mb-1.5">
                                        Late penalty (% per day)
                                    </label>
                                    <input
                                        type="text"
                                        value={latePenalty}
                                        onChange={(e) => setLatePenalty(e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                                    />
                                </div>
                            )}

                            <p className="text-[12px] font-semibold text-gray-800 mb-3">Grading &amp; Review</p>

                            <div className="flex flex-col gap-2 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setGradingRelease("auto")}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${gradingRelease === "auto" ? "border-primary" : "border-gray-300"
                                            }`}
                                    >
                                        {gradingRelease === "auto" && (
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </span>
                                    <span className="text-[13px] text-gray-800">Automatically after grading</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGradingRelease("manual")}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${gradingRelease === "manual" ? "border-primary" : "border-gray-300"
                                            }`}
                                    >
                                        {gradingRelease === "manual" && (
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </span>
                                    <span className="text-[13px] text-gray-800">Manually release</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-800">
                                        Group work - allow team submission
                                    </span>
                                    <Toggle checked={allowTeamSubmission} onChange={setAllowTeamSubmission} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-800">Enable peer reviews</span>
                                    <Toggle checked={enablePeerReviews} onChange={setEnablePeerReviews} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-gray-800">Allow instructor feedback</span>
                                    <Toggle checked={allowInstructorFeedback} onChange={setAllowInstructorFeedback} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}