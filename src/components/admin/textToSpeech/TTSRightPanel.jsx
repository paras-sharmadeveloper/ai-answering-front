import TTSSettingsPanel from "./TTSSettingsPanel";
import TTSVoicePanel from "./TTSVoicePanel";
import TTSModelPanel from "./TTSModelPanel";
import TTSHistoryEmpty from "./TTSHistoryEmpty";
import TTSHistoryList from "./TTSHistoryList";
import TTSHistoryDetail from "./TTSHistoryDetail";

const TTSRightPanel = ({
  rightView,
  hasAudio,
  selectedVoice,
  setSelectedVoice,
  selectedModel,
  setSelectedModel,
  voices,
  models,
  historyItems,
  sliders,
  setSliders,
  speakerBoost,
  setSpeakerBoost,
  setRightView,
  setHistoryDetail,
}) => {
  if (rightView === "voice") {
    return (
      <TTSVoicePanel
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        voices={voices}
        onBack={() => setRightView("settings")}
      />
    );
  }

  if (rightView === "model") {
    return (
      <TTSModelPanel
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        models={models}
        onBack={() => setRightView("settings")}
      />
    );
  }

  if (rightView === "historyEmpty") {
    return <TTSHistoryEmpty onBackSettings={() => setRightView("settings")} />;
  }

  if (rightView === "historyList") {
    return (
      <TTSHistoryList
        historyItems={historyItems}
        onBackSettings={() => setRightView("settings")}
        onOpenDetail={(item) => {
          setHistoryDetail(item);
          setRightView("historyDetail");
        }}
      />
    );
  }

  if (rightView === "historyDetail") {
    return (
      <TTSHistoryDetail
        sliders={sliders}
        onBackHistory={() => setRightView("historyList")}
      />
    );
  }

  return (
    <TTSSettingsPanel
      selectedVoice={selectedVoice}
      selectedModel={selectedModel}
      onVoiceOpen={() => setRightView("voice")}
      onModelOpen={() => setRightView("model")}
      sliders={sliders}
      setSliders={setSliders}
      speakerBoost={speakerBoost}
      setSpeakerBoost={setSpeakerBoost}
      onSwitchHistory={() => setRightView(hasAudio ? "historyList" : "historyEmpty")}
    />
  );
};

export default TTSRightPanel;