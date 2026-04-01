export const languageOptions = [
  "English",
  "Japanese",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Punjabi",
  "Urdu",
];

export const speakerOptions = [
  "Detect",
  "1 Speaker",
  "2 Speakers",
  "3 Speakers",
  "4+ Speakers",
];

export const initialProjects = [
  {
    id: "project-1001",
    name: "Public Domain Commercial",
    sourceLanguage: "English",
    targetLanguage: "Japanese",
    createdAtLabel: "3 hours ago",
    status: "draft",
    mediaUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    mediaType: "image",
    duration: "00:01:39",
    rangeStart: "00:00:00",
    rangeEnd: "00:01:45",
    creditsRemaining: 104635,
    adjustableProject: false,
    reduceCharacters: false,
    numberOfSpeakers: "Detect",
    speakers: [
      {
        id: "speaker-1",
        name: "Speaker 1",
        originalText:
          "Say, uh, maybe your little Dey Crockett didn't kill him a bar when he was only three, but",
        translatedText:
          "ええと、あなたの小さなデイ・クロケットは3歳の時に彼を殺したわけではないかもしれないけれど、",
        audioGenerated: false,
      },
      {
        id: "speaker-2",
        name: "Speaker 2",
        originalText:
          "Swanson quick frozen drumsticks. And how his politicking starts. He wants",
        translatedText:
          "スワンソンの急速冷凍ドラムスティック。そして彼の政治活動が始まる。彼は望んでいる。",
        audioGenerated: false,
      },
    ],
  },
];