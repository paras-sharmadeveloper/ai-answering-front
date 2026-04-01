import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDubbing } from "./DubbingContext";
import { languageOptions, speakerOptions } from "./dubbingMock";
import logo from "../../../src/assets/formlogo.png";
import uploadicon from "../../../src/assets/Cloud-upload.png";
import uploadfile from "../../../src/assets/uploadfile.png";

const detectMediaType = (file) => {
    if (!file) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (file.type.startsWith("image/")) return "image";
    return "image";
};

const UploadPreview = ({ mediaUrl, mediaType }) => {
    if (!mediaUrl) {
        return (
            <div className="flex min-h-[180px] w-full flex-col items-center justify-center px-4 py-10 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border text-gray-200 bg-white">
                    <img src={uploadicon} alt="" />
                </div>
                <p className="text-sm font-semibold text-gray-800">
                    Choose a file or drag & drop it here.
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    Audio or Video file, up to 500MB or 45 minutes
                </p>
            </div>
        );
    }

    if (mediaType === "video") {
        return (
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-black">
                <video
                    src={mediaUrl}
                    controls
                    className="block h-full min-h-[250px] w-full object-cover"
                />
            </div>
        );
    }

    if (mediaType === "audio") {
        return (
            <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6">
                <audio src={mediaUrl} controls className="w-full" />
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <img
                src={mediaUrl}
                alt="Uploaded preview"
                className="block h-full min-h-[250px] w-full object-cover"
            />
        </div>
    );
};

const Dubbing = () => {
    const navigate = useNavigate();
    const { createProject } = useDubbing();
    const inputFileRef = useRef(null);

    const [form, setForm] = useState({
        projectName: "Public Domain Commercial",
        sourceLanguage: "English",
        targetLanguage: "Japanese",
        adjustableProject: false,
        reduceCharacters: false,
        numberOfSpeakers: "Detect",
        rangeStart: "00:00:00",
        rangeEnd: "00:01:45",
    });

    const [mediaUrl, setMediaUrl] = useState("");
    const [mediaType, setMediaType] = useState("image");
    const [previewDuration] = useState("00:01:39");

    const isReadyToCreate = useMemo(() => {
        return form.projectName.trim().length > 0;
    }, [form.projectName]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileType = detectMediaType(file);
        const objectUrl = URL.createObjectURL(file);

        setMediaType(fileType);
        setMediaUrl(objectUrl);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const project = createProject({
            ...form,
            mediaUrl:
                mediaUrl ||
                "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
            mediaType,
            previewDuration,
        });

        navigate(`/admin/dubbing/${project.id}`);
    };

    return (
        <div className="min-h-screen bg-[#f6f7f8] flex items-start justify-center px-4 py-6 md:py-10">
            <div className="relative w-full max-w-[760px] rounded-[28px] bg-gradient-to-b from-green-50 to-white p-4 shadow-2xl md:p-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 pb-0.5 text-2xl"
                >
                    ×
                </button>

                <div className="mx-auto mb-4 flex h-20 w-20 mt-8 items-center justify-center rounded-[20px] overflow-hidden bg-[#0a1a13] text-3xl text-white shadow-lg">
                    <img src={logo} alt="" />
                </div>

                <h2 className="text-center text-[24px] font-semibold text-gray-900">
                    Dub your content
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Dub your content with clear, natural-sounding voice.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Project Name
                        </label>
                        <input
                            type="text"
                            name="projectName"
                            value={form.projectName}
                            placeholder="Enter Project Name"
                            onChange={handleChange}
                            onFocus={() => {
                                if (form.projectName === "Public Domain Commercial") {
                                    setForm((prev) => ({ ...prev, projectName: "" }));
                                }
                            }}
                            onBlur={() => {
                                if (form.projectName.trim() === "") {
                                    setForm((prev) => ({
                                        ...prev,
                                        projectName: "Public Domain Commercial",
                                    }));
                                }
                            }}
                            className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Source Language
                            </label>
                            <select
                                name="sourceLanguage"
                                value={form.sourceLanguage}
                                onChange={handleChange}
                                className="h-10 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-black outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 12px center",
                                    backgroundSize: "16px",
                                }}
                            >
                                {languageOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Target Languages
                            </label>
                            <select
                                name="targetLanguage"
                                value={form.targetLanguage}
                                onChange={handleChange}
                                className="h-10 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-black outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 16px center",
                                    backgroundSize: "16px",
                                }}
                            >
                                {languageOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Audio or video source
                        </label>
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                            <UploadPreview mediaUrl={mediaUrl} mediaType={mediaType} />

                            {!mediaUrl && (
                                <div className="flex justify-center pb-10">
                                    <button
                                        type="button"
                                        onClick={() => inputFileRef.current?.click()}
                                        className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <img src={uploadfile} alt="" className="w-7 pr-2" />
                                        Upload File
                                    </button>
                                </div>
                            )}

                            <input
                                ref={inputFileRef}
                                type="file"
                                accept="audio/*,video/*,image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                name="adjustableProject"
                                checked={form.adjustableProject}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Create Dubbing project</p>
                                <p className="text-xs text-gray-500">
                                    This will make your dub adjustable in our editor.
                                </p>
                            </div>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                name="reduceCharacters"
                                checked={form.reduceCharacters}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Reduce character usage by 33%
                                </p>
                                <p className="text-xs text-gray-500">
                                    This will add a Vernal watermark to the video.
                                </p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Number of speakers
                        </label>
                        <select
                            name="numberOfSpeakers"
                            value={form.numberOfSpeakers}
                            onChange={handleChange}
                            className="h-10 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-black outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                            }}
                        >
                            {speakerOptions.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Time range to dub
                        </label>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <input
                                type="text"
                                name="rangeStart"
                                value={form.rangeStart}
                                onChange={handleChange}
                                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                            />
                            <input
                                type="text"
                                name="rangeEnd"
                                value={form.rangeEnd}
                                onChange={handleChange}
                                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isReadyToCreate}
                        className="mt-7 flex h-10 w-full items-center justify-center rounded-xl bg-[#22a447] px-4 text-sm font-semibold text-white transition hover:bg-[#1e903e] disabled:cursor-not-allowed disabled:opacity-90 shadow-[0_2px_0_0_#1a7a35] active:translate-y-[1px] active:shadow-[0_1px_0_0_#1a7a35]"
                    >
                        Create a Dubbing
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Credits remaining before this dub: 104,635
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Dubbing;