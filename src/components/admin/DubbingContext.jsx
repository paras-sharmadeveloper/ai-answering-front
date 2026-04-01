import { createContext, useContext, useMemo, useState } from "react";
import { initialProjects } from "./dubbingMock";

const DubbingContext = createContext(null);

const createProjectId = () => `project-${Date.now()}`;

export const DubbingProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);

  const createProject = (payload) => {
    const newProject = {
      id: createProjectId(),
      name: payload.projectName.trim() || "Untitled Project",
      sourceLanguage: payload.sourceLanguage,
      targetLanguage: payload.targetLanguage,
      createdAtLabel: "Just now",
      status: "draft",
      mediaUrl: payload.mediaUrl,
      mediaType: payload.mediaType,
      duration: payload.previewDuration || "00:01:39",
      rangeStart: payload.rangeStart,
      rangeEnd: payload.rangeEnd,
      creditsRemaining: 104635,
      adjustableProject: payload.adjustableProject,
      reduceCharacters: payload.reduceCharacters,
      numberOfSpeakers: payload.numberOfSpeakers,
      speakers: [
        {
          id: "speaker-1",
          name: "Speaker 1",
          originalText:
            "This is editable transcript content. Replace it later with actual transcription API response.",
          translatedText:
            "これは編集可能な文字起こしコンテンツです。後で実際のAPI応答に置き換えてください。",
          audioGenerated: false,
        },
        {
          id: "speaker-2",
          name: "Speaker 2",
          originalText:
            "Second speaker block is also ready. You can dynamically render more blocks later.",
          translatedText:
            "2人目のスピーカーブロックも準備できています。後でさらに動的に追加できます。",
          audioGenerated: false,
        },
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const getProjectById = (projectId) => {
    return projects.find((project) => project.id === projectId) || null;
  };

  const updateProject = (projectId, updates) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const updateSpeaker = (projectId, speakerId, updates) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;

        return {
          ...project,
          speakers: project.speakers.map((speaker) =>
            speaker.id === speakerId ? { ...speaker, ...updates } : speaker
          ),
        };
      })
    );
  };

  const value = useMemo(
    () => ({
      projects,
      createProject,
      getProjectById,
      updateProject,
      updateSpeaker,
    }),
    [projects]
  );

  return (
    <DubbingContext.Provider value={value}>{children}</DubbingContext.Provider>
  );
};

export const useDubbing = () => {
  const context = useContext(DubbingContext);

  if (!context) {
    throw new Error("useDubbing must be used inside DubbingProvider");
  }

  return context;
};