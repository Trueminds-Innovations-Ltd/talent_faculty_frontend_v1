import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { ChevronLeft, Check, Link2, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

type VideoSource = "upload" | "link";

interface VideoResourceForm {
    title: string;
    description: string;
    source: VideoSource;
    file: File | null;
    url: string;
}

interface AddVideoResourceProps {
    onSubmit?: (data: VideoResourceForm) => void;
    onCancel?: () => void;
    backLabel?: string;
    maxFileSizeMb?: number;
}

function isValidUrl(value: string): boolean {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export default function VideoResource({
    onSubmit,
    onCancel,
    backLabel = "Back to Resources",
    maxFileSizeMb = 200,
}: AddVideoResourceProps) {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [source, setSource] = useState<VideoSource>("upload");

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState("");

    const [url, setUrl] = useState("");
    const [urlDraft, setUrlDraft] = useState("");
    const [isEditingUrl, setIsEditingUrl] = useState(true);

    const handleBack = () => {
        if (onCancel) return onCancel();
        navigate(-1);
    };

    const acceptFile = (candidate: File) => {
        if (candidate.type !== "application/pdf") {
            setFileError("PDF only");
            return;
        }
        if (candidate.size > maxFileSizeMb * 1024 * 1024) {
            setFileError(`Maximum file size ${maxFileSizeMb} MB`);
            return;
        }
        setFileError("");
        setFile(candidate);
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const candidate = e.target.files?.[0];
        if (candidate) acceptFile(candidate);
        e.target.value = "";
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const candidate = e.dataTransfer.files?.[0];
        if (candidate) acceptFile(candidate);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileError("");
    };

    const handleAttachUrl = () => {
        if (!urlDraft.trim()) return;
        setUrl(urlDraft.trim());
        setIsEditingUrl(false);
    };

    const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAttachUrl();
        }
    };

    const handleRemoveUrl = () => {
        setUrl("");
        setUrlDraft("");
        setIsEditingUrl(true);
    };

    const urlIsValid = isValidUrl(url);
    const canSubmit =
        title.trim().length > 0 && (source === "upload" ? !!file : urlIsValid);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit?.({ title, description, source, file, url });
    };

    return (
            <div className="max-w-3xl w-full px-6 py-4">
                <button
                    type="button"
                    onClick={handleBack}
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {backLabel}
                </button>

                <h1 className="text-2xl font-semibold text-gray-900">Add video resource</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Add a video where learners can watch as an additional course material.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="resource-title" className="mb-1.5 block text-sm font-medium text-gray-900">
                            Resources title
                        </label>
                        <input
                            id="resource-title"
                            type="text"
                            value={title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            placeholder="eg Introduction to UX design"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="resource-description" className="mb-1.5 block text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <textarea
                            id="resource-description"
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            placeholder="Learn the fundamentals of user experience and interface design, from research and wireframing to prototyping and creating intuitive digital experiences."
                            rows={4}
                            className="w-full resize-y rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">Video source</p>
                        <div className="space-y-1">
                            <label
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm ${source === "upload" ? "bg-gray-100" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="video-source"
                                    value="upload"
                                    checked={source === "upload"}
                                    onChange={() => setSource("upload")}
                                    className="h-4 w-4 accent-green-600"
                                />
                                <span className="text-gray-800">Upload video</span>
                            </label>
                            <label
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm ${source === "link" ? "bg-gray-100" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="video-source"
                                    value="link"
                                    checked={source === "link"}
                                    onChange={() => setSource("link")}
                                    className="h-4 w-4 accent-green-600"
                                />
                                <span className="text-gray-800">Video link</span>
                            </label>
                        </div>
                    </div>

                    {source === "upload" && (
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-900">Video upload</label>

                            {!file ? (
                                <>
                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setIsDragging(true);
                                        }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        className={`flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center ${isDragging ? "border-green-600 bg-green-50" : "border-gray-300"
                                            }`}
                                    >
                                        <UploadCloud className="mb-2 h-6 w-6 text-gray-400" />
                                        <p className="text-sm text-gray-500">Drag & drop your PDF here</p>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="mt-1 text-sm font-medium text-green-600 hover:text-green-700"
                                        >
                                            Or browse files
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        PDF only &middot; Maximum file size: {maxFileSizeMb} MB
                                    </p>
                                    {fileError && <p className="mt-1.5 text-xs text-red-600">{fileError}</p>}
                                </>
                            ) : (
                                <div className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 px-3.5 py-2.5">
                                    <div className="flex min-w-0 items-start gap-2.5">
                                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                                        </span>
                                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                                            <Link2 className="h-3 w-3 text-green-600" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm text-gray-900">{file.name}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">uploaded</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="flex-shrink-0 text-xs font-medium text-gray-400 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {source === "link" && (
                        <div>
                            <label htmlFor="video-url" className="mb-1.5 block text-sm font-medium text-gray-900">
                                Video link
                            </label>

                            {isEditingUrl ? (
                                <input
                                    id="video-url"
                                    type="text"
                                    value={urlDraft}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrlDraft(e.target.value)}
                                    onKeyDown={handleUrlKeyDown}
                                    onBlur={handleAttachUrl}
                                    placeholder="eg https://www.youtube.com/watch?v=..."
                                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                                />
                            ) : (
                                <div className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 px-3.5 py-2.5">
                                    <div className="flex min-w-0 items-start gap-2.5">
                                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                                        </span>
                                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                                            <Link2 className="h-3 w-3 text-green-600" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm text-gray-900">{url}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">uploaded</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveUrl}
                                        className="flex-shrink-0 text-xs font-medium text-gray-400 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            Add video
                        </button>
                    </div>
                </form>
            </div>
    );
}