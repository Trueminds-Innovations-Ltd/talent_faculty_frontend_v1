import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronLeft, Link2, Check, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LinkResourceForm {
    title: string;
    description: string;
    url: string;
}

interface AddLinkResourceProps {
    onSubmit?: (data: LinkResourceForm) => void;
    onCancel?: () => void;
    backLabel?: string;
}

function isValidUrl(value: string): boolean {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export default function LinkResource({
    onSubmit,
    onCancel,
    backLabel = "Back to Resources",
}: AddLinkResourceProps) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [urlDraft, setUrlDraft] = useState("");
    const [isEditingUrl, setIsEditingUrl] = useState(true);

    const urlIsValid = isValidUrl(url);
    const canSubmit = title.trim().length > 0 && urlIsValid;

    const handleBack = () => {
        if (onCancel) return onCancel();
        navigate(-1);
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit?.({ title, description, url });
    };

    return (
            <div className="max-w-3xl w-full  px-6 py-4">
                <button
                    type="button"
                    onClick={handleBack}
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {backLabel}
                </button>

                <h1 className="text-2xl font-semibold text-gray-900">Add link resource</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Add an external link learners can access as part of this course.
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
                        <label htmlFor="resource-url" className="mb-1.5 block text-sm font-medium text-gray-900">
                            Link URL
                        </label>

                        {isEditingUrl ? (
                            <input
                                id="resource-url"
                                type="text"
                                value={urlDraft}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrlDraft(e.target.value)}
                                onKeyDown={handleUrlKeyDown}
                                onBlur={handleAttachUrl}
                                placeholder="eg https://example.com/resource"
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
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-green-600"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Open link
                                        </a>
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
                            Add link
                        </button>
                    </div>
                </form>
            </div>
    );
}