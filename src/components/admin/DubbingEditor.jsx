import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDubbing } from "./DubbingContext";
import next from "../../assets/Forward.png"
import settingicon from "../../assets/setting.png"


const parseDurationToSeconds = (duration = "0:00") => {
    const parts = duration.split(":").map(Number);

    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }

    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    return 0;
};

const formatClock = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
};

const getPreviewText = (text, max = 88) => {
    if (!text) return "";
    if (text.length <= max) return text;
    return `${text.slice(0, max)}...`;
};

const EditorIconButton = ({ children, onClick, className = "" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded-[8px]  bg-white text-[#7d7d7d] transition hover:bg-[#f7f7f7] ${className}`}
        >
            {children}
        </button>
    );
};

const MediaPanel = ({ project }) => {
    if (project.mediaType === "video") {
        return (
            <video
                src={project.mediaUrl}
                controls
                className="h-full w-full rounded-[14px] object-cover"
            />
        );
    }

    if (project.mediaType === "audio") {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#f8f8f8] p-6">
                <audio src={project.mediaUrl} controls className="w-full" />
            </div>
        );
    }

    return (
        <img
            src={project.mediaUrl}
            alt={project.name}
            className="h-full w-full rounded-[14px] object-cover"
        />
    );
};

const SpeakerCard = ({
    speaker,
    index,
    active,
    onOriginalChange,
    onTranslatedChange,
    onTranscribe,
    onGenerateAudio,
    onSwap,
    onSelect,
}) => {
    return (
        <div
            onClick={onSelect}
            className={`rounded-[14px] border bg-white p-4 transition ${active
                    ? "border-[#dfe9e1] shadow-[0_0_0_1px_#e8f3ea]"
                    : "border-[#e7e7e7]"
                }`}
        >
            <div className="mb-3 flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#29b34a]">
                    <span className="h-2 w-2 rounded-full bg-[#29b34a]" />
                </span>
                <span className="text-[12px] font-medium text-[#5f6368]">
                    Speaker {index + 1}
                </span>
            </div>

            <div className="grid grid-cols-[1fr_26px_1fr] gap-3 items-start">
                <div>
                    <textarea
                        value={speaker.originalText}
                        onChange={(e) => onOriginalChange(e.target.value)}
                        className="h-[96px] w-full resize-none rounded-[10px] border border-[#ececec] bg-[#fbfbfb] px-3 py-2 text-[12px] leading-[1.45] text-[#303030] outline-none transition focus:border-[#27ae45] focus:ring-2 focus:ring-[#e4f4e7]"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTranscribe();
                        }}
                        className="mt-3 inline-flex h-[42px] w-full items-center gap-2 rounded-[10px] border border-[#ececec] bg-[#fafafa] px-4 text-[13px] font-medium text-[#202124] transition hover:bg-[#f4f4f4]"
                    >
                        <span className="text-[16px] text-[#8b8b8b]">♫</span>
                        <span>Transcribe Audio</span>
                    </button>
                </div>

                <div className="flex h-full items-center justify-center pt-10">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSwap();
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ececec] bg-white text-[12px] text-[#8a8a8a] hover:bg-[#f8f8f8]"
                    >
                        ⇄
                    </button>
                </div>

                <div>
                    <textarea
                        value={speaker.translatedText}
                        onChange={(e) => onTranslatedChange(e.target.value)}
                        className="h-[96px] w-full resize-none rounded-[10px] border border-[#ececec] bg-[#fbfbfb] px-3 py-2 text-[12px] leading-[1.45] text-[#303030] outline-none transition focus:border-[#27ae45] focus:ring-2 focus:ring-[#e4f4e7]"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onGenerateAudio();
                        }}
                        className="mt-3 inline-flex h-[42px] w-full items-center gap-2 rounded-[10px] border border-[#ececec] bg-[#fafafa] px-4 text-[13px] font-medium text-[#202124] transition hover:bg-[#f4f4f4]"
                    >
                        <span className="text-[16px] text-[#8b8b8b]">♫</span>
                        <span>{speaker.audioGenerated ? "Audio Generated" : "Generate Audio"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const WaveformTrack = ({
    title,
    subTitle,
    theme = "blue",
    isSelected = false,
    onSelect,
    showControls = false,
    widthPercent = 100,
    split = false,
}) => {
    const themeMap = {
        blue: {
            bg: "bg-[#ebf4ff]",
            border: "border-[#bcd8fb]",
            bar: "rgba(93,122,164,0.45)",
            accent: "#86b8ff",
        },
        gray: {
            bg: "bg-[#f6f6f6]",
            border: "border-[#ececec]",
            bar: "rgba(120,120,120,0.20)",
            accent: "#d7d7d7",
        },
        pink: {
            bg: "bg-[#ffe8f4]",
            border: "border-[#f5bdd8]",
            bar: "rgba(174,123,155,0.40)",
            accent: "#ff8fc2",
        },
    };

    const current = themeMap[theme];
    const bars = Array.from({ length: 120 }, (_, i) => {
        const n = (i * 17 + 11) % 24;
        return 6 + n;
    });

    return (
        <div className="grid grid-cols-[185px_1fr_170px] items-stretch border-b border-[#f1f1f1] last:border-b-0">
            <div className="flex items-center justify-between px-4 py-3">
                <div>
                    <p className="text-[13px] font-medium text-[#202124]">{title}</p>
                    {subTitle ? (
                        <p className="mt-1 text-[12px] text-[#9aa0a6]">{subTitle}</p>
                    ) : null}
                </div>

                {showControls ? (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-7 w-7 items-center overflow-hidden justify-center rounded-full bg-white border-[#e9e9e9] text-[11px] text-[#666]"
                        >
                         <img src={settingicon} alt=""  className="rounded-full"/>

                        </button>
                        <button
                            type="button"
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e9e9e9] text-[11px] text-[#666]"
                        >
                            ⋮
                        </button>
                    </div>
                ) : theme !== "blue" ? (
                    <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e9e9e9] text-[11px] text-[#323232]"
                    >
                        🎧
                    </button>
                ) : null}
            </div>

            <div className="flex items-center px-0 py-2">
                <div
                    onClick={onSelect}
                    className={`relative h-[54px] w-full cursor-pointer overflow-hidden border ${current.border} ${current.bg} ${split ? "rounded-[8px]" : "rounded-[8px]"
                        }`}
                    style={{ width: `${widthPercent}%` }}
                >
                    <div className="absolute left-0 top-0 h-full w-[5px] rounded-l-[8px] bg-[#69aefc]" />

                    <div className="relative flex h-full items-center gap-[2px] px-4">
                        {bars.map((bar, index) => (
                            <span
                                key={`${title}-${index}`}
                                className="inline-block w-[2px] rounded-full"
                                style={{
                                    height: `${bar}px`,
                                    backgroundColor: current.bar,
                                }}
                            />
                        ))}
                    </div>

                    {split ? (
                        <>
                            <div className="absolute left-[56%] top-0 h-full w-[14px] rounded-[8px] border border-[#f191c0] bg-[#ffd6ea]" />
                            <div className="absolute left-[56.3%] top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center rounded-full border border-[#79aef8] bg-[#d9ebff] text-[10px] text-[#3d78d5]">
                                ✶
                            </div>
                        </>
                    ) : null}

                    {isSelected ? (
                        <div className="absolute inset-0 rounded-[8px] ring-1 ring-[#76aef8]" />
                    ) : null}
                </div>
            </div>

            <div className="flex items-center px-4 py-3">
                {title === "Background" ? (
                    <span className="text-[12px] text-[#9aa0a6]">No clips selected.</span>
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
};

const DubbingEditor = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { getProjectById, updateSpeaker } = useDubbing();

    const project = getProjectById(projectId);

    const totalSeconds = useMemo(
        () => parseDurationToSeconds(project?.duration || "1:39"),
        [project]
    );

    const [playing, setPlaying] = useState(false);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [selectedLang, setSelectedLang] = useState(project?.targetLanguage || "Japanese");
    const [zoomLevel, setZoomLevel] = useState(62);
    const [selectedTrack, setSelectedTrack] = useState("speaker-1-original");
    const timerRef = useRef(null);

    useEffect(() => {
        if (!playing) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setCurrentSeconds((prev) => {
                if (prev >= totalSeconds) {
                    clearInterval(timerRef.current);
                    setPlaying(false);
                    return totalSeconds;
                }
                return prev + 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [playing, totalSeconds]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#f6f6f6] p-6">
                <div className="mx-auto max-w-3xl rounded-[20px] border border-[#e7e7e7] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#202124]">Project not found</h2>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/dubbing")}
                        className="mt-4 rounded-[10px] bg-[#23a948] px-4 py-2 text-sm font-medium text-white"
                    >
                        Back to Dubbing
                    </button>
                </div>
            </div>
        );
    }

    const targetLang = project.targetLanguage || "Japanese";

    const handleOriginalChange = (speakerId, value) => {
        updateSpeaker(project.id, speakerId, { originalText: value });
    };

    const handleTranslatedChange = (speakerId, value) => {
        updateSpeaker(project.id, speakerId, { translatedText: value });
    };

    const handleTranscribe = (speakerId) => {
        const speaker = project.speakers.find((item) => item.id === speakerId);
        updateSpeaker(project.id, speakerId, {
            originalText:
                speaker?.originalText ||
                "Say, uh, maybe your little Devy Crockett didn't kill him a bar when he was only three, but...",
        });
    };

    const handleGenerateAudio = (speakerId) => {
        const speaker = project.speakers.find((item) => item.id === speakerId);
        updateSpeaker(project.id, speakerId, {
            translatedText:
                speaker?.translatedText ||
                "ええと、あなたの小さなデヴィ・クロケットは、3歳の時にバーを倒せなかったかもしれ...",
            audioGenerated: true,
        });
    };

    const handleSwap = (speakerId) => {
        const speaker = project.speakers.find((item) => item.id === speakerId);
        if (!speaker) return;

        updateSpeaker(project.id, speakerId, {
            originalText: speaker.translatedText,
            translatedText: speaker.originalText,
        });
    };

    const handleGenerateAll = () => {
        project.speakers.forEach((speaker) => {
            updateSpeaker(project.id, speaker.id, { audioGenerated: true });
        });
    };

    const timelineWidth = Math.max(72, Math.min(100, zoomLevel));

    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            <div className="mx-auto w-full max-w-[1500px]">
                <main className="min-h-screen rounded-none border border-[#ececec] bg-white">
                    <div className="flex items-center justify-between border-b border-[#ededed] px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Link
                                to="/admin/dubbing"
                                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#eaeaea] bg-[#fafafa] text-[22px] text-[#8c8c8c]"
                            >
                                ‹
                            </Link>
                            <h1 className="text-[15px] font-medium text-[#202124]">
                                {project.name || "Public Domain Commercial"}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[13px] text-[#7a7a7a]">
                                <span className="inline-block h-3 w-3 rounded-full border border-[#cdcdcd]" />
                                <span>Saving changes</span>
                            </div>

                            <EditorIconButton>
                                <img src={settingicon} alt="" />
                            </EditorIconButton>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="grid grid-cols-[1fr_450px] gap-4">
                            <div className="space-y-4">
                                {project.speakers.map((speaker, index) => (
                                    <SpeakerCard
                                        key={speaker.id}
                                        speaker={speaker}
                                        index={index}
                                        active={selectedTrack.includes(`speaker-${index + 1}`)}
                                        onOriginalChange={(value) => handleOriginalChange(speaker.id, value)}
                                        onTranslatedChange={(value) => handleTranslatedChange(speaker.id, value)}
                                        onTranscribe={() => handleTranscribe(speaker.id)}
                                        onGenerateAudio={() => handleGenerateAudio(speaker.id)}
                                        onSwap={() => handleSwap(speaker.id)}
                                        onSelect={() => setSelectedTrack(`speaker-${index + 1}-original`)}
                                    />
                                ))}
                            </div>

                            <div className="rounded-[14px] border border-[#e8e8e8] bg-white p-0 h-full min-h-[514px] overflow-hidden">
                                <MediaPanel project={project} />
                            </div>
                        </div>

                        <div className="mt-4 rounded-[14px] border border-[#e8e8e8] bg-white">
                            <div className="px-4 pb-3 pt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <EditorIconButton className="h-9 w-9">☷</EditorIconButton>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setCurrentSeconds((prev) => (prev + 5 > totalSeconds ? 0 : prev + 5))
                                            }
                                            className="text-[13px] font-medium text-[#202124]"
                                        >
                                            {formatClock(currentSeconds)}/{project.duration || "1:39"}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <button
                                            type="button"
                                            className="text-[16px] text-[#8d8d8d] rotate-180"
                                        >
                                            <img src={next} alt="" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (currentSeconds >= totalSeconds) {
                                                    setCurrentSeconds(0);
                                                }
                                                setPlaying((prev) => !prev);
                                            }}
                                            className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-black text-[12px] text-white"
                                        >
                                            {playing ? "❚❚" : "▶"}
                                        </button>

                                        <button
                                            type="button"
                                            className="text-[16px] text-[#8d8d8d]"
                                        >
                                            <img src={next} alt="" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <EditorIconButton>☼</EditorIconButton>
                                        <EditorIconButton>✎</EditorIconButton>
                                        <EditorIconButton>＋</EditorIconButton>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-[185px_1fr_170px] items-center">
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLang("Original")}
                                            className={`flex items-center gap-2 text-[13px] ${selectedLang === "Original"
                                                    ? "text-[#9aa0a6]"
                                                    : "text-[#9aa0a6]"
                                                }`}
                                        >
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e2e2e2] text-[11px]">
                                                🔇
                                            </span>
                                            <span>Original</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedLang(targetLang)}
                                            className="flex items-center gap-2 text-[13px] text-[#202124]"
                                        >
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e2e2e2] text-[11px]">
                                                🔊
                                            </span>
                                            <span>{targetLang}</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-6 pr-5 text-[13px] text-[#202124]">
                                        <span>00</span>
                                        <span>00:05</span>
                                        <span>00:10</span>
                                        <span>00:15</span>
                                        <span>00:20</span>
                                        <span>00:25</span>
                                    </div>

                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            type="button"
                                            className="text-[16px] text-[#8d8d8d]"
                                        >
                                            ⊖
                                        </button>
                                        <input
                                            type="range"
                                            min="72"
                                            max="100"
                                            value={zoomLevel}
                                            onChange={(e) => setZoomLevel(Number(e.target.value))}
                                            className="h-[4px] w-[70px] accent-[#39b56a]"
                                        />
                                        <button
                                            type="button"
                                            className="text-[16px] text-[#8d8d8d]"
                                        >
                                            ⊕
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-2 border-t border-[#f1f1f1]">
                                    <WaveformTrack
                                        title="Background"
                                        theme="blue"
                                        isSelected={selectedTrack === "background"}
                                        onSelect={() => setSelectedTrack("background")}
                                        widthPercent={timelineWidth}
                                    />

                                    <WaveformTrack
                                        title="Foreground"
                                        theme="gray"
                                        isSelected={selectedTrack === "foreground"}
                                        onSelect={() => setSelectedTrack("foreground")}
                                        widthPercent={timelineWidth}
                                    />

                                    <WaveformTrack
                                        title="Speaker 1"
                                        subTitle="Original"
                                        theme="pink"
                                        isSelected={selectedTrack === "speaker-1-original"}
                                        onSelect={() => setSelectedTrack("speaker-1-original")}
                                        showControls
                                        widthPercent={timelineWidth}
                                        split
                                    />

                                    <WaveformTrack
                                        title="Speaker 1"
                                        subTitle={targetLang}
                                        theme="pink"
                                        isSelected={selectedTrack === "speaker-1-japanese"}
                                        onSelect={() => setSelectedTrack("speaker-1-japanese")}
                                        showControls
                                        widthPercent={timelineWidth}
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-[13px] text-[#666]">
                                        Free credits remaining: {project.creditsRemaining || "16579"}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLang("Original")}
                                            className={`rounded-[8px] px-3 py-1.5 text-[12px] ${selectedLang === "Original"
                                                    ? "border border-[#e7e7e7] bg-[#f6f6f6] text-[#202124]"
                                                    : "border border-[#e7e7e7] bg-white text-[#606367]"
                                                }`}
                                        >
                                            Original
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedLang(targetLang)}
                                            className={`rounded-[8px] px-3 py-1.5 text-[12px] ${selectedLang === targetLang
                                                    ? "border border-[#e7e7e7] bg-[#f6f6f6] text-[#202124] font-medium"
                                                    : "border border-[#e7e7e7] bg-white text-[#606367]"
                                                }`}
                                        >
                                            {targetLang}
                                        </button>

                                        <button
                                            type="button"
                                            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e7e7e7] bg-white text-[#666]"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleGenerateAll}
                                            className="rounded-[8px] border border-[#e7e7e7] bg-white px-4 py-2 text-[12px] text-[#5f6368] transition hover:bg-[#f7f7f7]"
                                        >
                                            Generate Stale Audio
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => alert("Export started")}
                                            className="rounded-[8px] bg-[#27ae45] px-4 py-2 text-[12px] font-medium text-white transition hover:bg-[#22973c]"
                                        >
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 hidden rounded-[10px] border border-dashed border-[#ebebeb] bg-[#fafafa] p-3 text-[12px] text-[#8a8a8a] xl:block">
                            Selected clip:{" "}
                            {selectedTrack === "background"
                                ? "No clips selected."
                                : getPreviewText(
                                    project.speakers[0]?.originalText || "No clips selected."
                                )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DubbingEditor;