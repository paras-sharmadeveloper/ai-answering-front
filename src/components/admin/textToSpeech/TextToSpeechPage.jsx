import { useState } from "react";
import TTSHeader from "./TTSHeader";
import TTSComposer from "./TTSComposer";
import TTSRightPanel from "./TTSRightPanel";
import TTSShareModal from "./TTSShareModal";
import {
  promptChips,
  initialText,
  voices,
  models,
  historyItems,
} from "./ttsData";

const TextToSpeechPage = () => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [rightView, setRightView] = useState("settings");
  const [historyDetail, setHistoryDetail] = useState(null);

  const [sliders, setSliders] = useState({
    speed: 78,
    stability: 34,
    similarity: 56,
    style: 0,
  });

  const handleChipClick = (chip) => {
    const map = {
      "Narrate a story": initialText,
      "Speak in different languages":
        "Hello! This is a sample multilingual prompt. You can turn this into natural speech in many different voices and languages.",
      "Hear from a video game character":
        "Commander, we are entering the final zone. Stay alert, keep your shields up, and prepare for the next mission.",
      "Direct a dramatic movie scene":
        "No, don't walk away now. After everything we've been through, you owe me the truth.",
      "Give a meditation class":
        "Close your eyes, relax your shoulders, and take a deep breath in. Let your thoughts slow down gently.",
      "Introduce your podcast":
        "Welcome back to the show. Today we are diving into ideas, stories, and voices that inspire creative people every day.",
      "Record an advertisement":
        "Introducing the smarter way to create lifelike voiceovers. Fast, flexible, and ready for every kind of content.",
      "Tell a silly joke":
        "Why did the microphone go to school? Because it wanted to improve its voice notes!",
    };

    setText(map[chip] || initialText);
  };

  const handleGenerateSpeech = () => {
    if (!text.trim()) {
      setText(initialText);
    }
    setHasAudio(true);
    setRightView("settings");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="space-y-3">
        <TTSHeader />

        <div className="flex min-h-[calc(100vh-150px)] gap-3">
          <div className="min-w-0 flex-1">
            <TTSComposer
              text={text}
              setText={setText}
              onGenerate={handleGenerateSpeech}
              hasAudio={hasAudio}
              onChipClick={handleChipClick}
              selectedVoice={selectedVoice}
              promptChips={promptChips}
            />
          </div>

          <div className="hidden w-[320px] shrink-0 xl:block">
            <TTSRightPanel
              rightView={rightView}
              hasAudio={hasAudio}
              selectedVoice={selectedVoice}
              setSelectedVoice={setSelectedVoice}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              voices={voices}
              models={models}
              historyItems={historyItems}
              sliders={sliders}
              setSliders={setSliders}
              speakerBoost={speakerBoost}
              setSpeakerBoost={setSpeakerBoost}
              setRightView={setRightView}
              setHistoryDetail={setHistoryDetail}
              historyDetail={historyDetail}
            />
          </div>
        </div>
      </div>

      <TTSShareModal open={showShareModal} onClose={() => setShowShareModal(false)} />

      {hasAudio && (
        <button
          onClick={() => setShowShareModal(true)}
          className="fixed bottom-5 right-5 rounded-full bg-[#23b14a] px-4 py-3 text-[12px] font-semibold text-white shadow-lg xl:hidden"
        >
          Share
        </button>
      )}
    </div>
  );
};

export default TextToSpeechPage;