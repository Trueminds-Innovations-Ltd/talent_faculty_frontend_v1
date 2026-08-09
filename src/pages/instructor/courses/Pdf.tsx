import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/instruct/DashboardLayout";
import {
    ChevronLeft,
    UploadCloud,
    FileText,
    CheckCircle2,
    X,
    Info,
} from "lucide-react";


type UploadStatus = "idle" | "uploading" | "uploaded" | "error";

interface UploadedFile {
    name: string;
    sizeLabel: string;
    status: UploadStatus;
}

const MAX_FILE_SIZE_MB = 200;

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
}



const Toast: React.FC<{ message: string; onClose: () => void }> = ({
    message,
    onClose,
}) => (
    <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
        <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
        <span className="text-sm font-medium text-gray-700">{message}</span>
        <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="ml-2 text-gray-300 transition hover:text-gray-500"
        >
            <X size={14} />
        </button>
    </div>
);

const FileRow: React.FC<{
    file: UploadedFile;
    onRemove: () => void;
}> = ({ file, onRemove }) => (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
            {file.status === "uploading" ? (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-500" />
                </div>
            ) : (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
            )}
            <FileText size={16} className="shrink-0 text-gray-400" />
            <div>
                <div className="text-sm font-medium text-gray-800">{file.name}</div>
                <div className="text-xs text-gray-400">
                    {file.status === "uploading" ? "Uploading…" : "Uploaded"} ·{" "}
                    {file.sizeLabel}
                </div>
            </div>
        </div>
        <button
            onClick={onRemove}
            aria-label="Remove file"
            className="text-gray-300 transition hover:text-gray-500"
        >
            <X size={16} />
        </button>
    </div>
);


export default function PdfSec() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<UploadedFile | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const canSubmit = title.trim().length > 0 && file?.status === "uploaded";

    const handleFile = useCallback((selected: File | undefined) => {
        if (!selected) return;
        setError(null);

        if (selected.type !== "application/pdf") {
            setError("Only PDF files are supported.");
            return;
        }
        if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`File is larger than ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }

        const sizeLabel = formatBytes(selected.size);
        setFile({ name: selected.name, sizeLabel, status: "uploading" });


        window.setTimeout(() => {
            setFile((prev) =>
                prev ? { ...prev, status: "uploaded" } : prev
            );
        }, 900);
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
        },
        [handleFile]
    );

    const onSubmit = () => {
        if (!canSubmit) return;
        setShowToast(true);
        window.setTimeout(() => setShowToast(false), 3500);
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl w-full   px-6 py-8">
                {showToast && (
                    <Toast
                        message="PDF added successfully"
                        onClose={() => setShowToast(false)}
                    />
                )}

                <div className="mx-auto max-w-2xl">
                    {/* Back link */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-700"
                    >
                        <ChevronLeft size={16} />
                        Back to Resource
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Upload PDF Resource
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Add a PDF file for learners to access as part of this course.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Resource title */}
                        <div>
                            <label
                                htmlFor="resource-title"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Resource title
                            </label>
                            <input
                                id="resource-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="eg Introduction to UX design"
                                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="resource-description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="resource-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Learn the fundamentals of user experience and interface design, from research and wireframing to prototyping and creating intuitive digital experiences."
                                className="w-full resize-y rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Upload / file */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {file ? "PDF file" : "Upload a PDF"}
                            </label>

                            {file ? (
                                <FileRow file={file} onRemove={() => setFile(null)} />
                            ) : (
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={onDrop}
                                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${isDragging
                                        ? "border-emerald-400 bg-emerald-50/50"
                                        : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <UploadCloud size={22} className="text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                        Drag &amp; drop your PDF here
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Or{" "}
                                        <button
                                            type="button"
                                            onClick={() => inputRef.current?.click()}
                                            className="font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            Browse files
                                        </button>
                                    </p>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={(e) => handleFile(e.target.files?.[0])}
                                    />
                                </div>
                            )}

                            <p className="mt-2 text-xs text-gray-400">
                                PDF only · Maximum file size: {MAX_FILE_SIZE_MB} MB
                            </p>

                            {error && (
                                <p className="mt-2 flex items-center gap-1 text-xs text-rose-500">
                                    <Info size={12} />
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <Link
                                to="/instructor/resources"
                                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="button"
                                disabled={!canSubmit}
                                onClick={onSubmit}
                                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${canSubmit
                                    ? "bg-gray-200 text-gray-800 hover:bg-emerald-600 hover:text-white"
                                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                                    }`}
                            >
                                Add PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}