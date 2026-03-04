const QUOTES = [
  { text: "Draft the vision, make some decisions.", speaker: "phy" },
  { text: "Sometimes you gotta run before you can walk.", speaker: "Tony Stark" },
  { text: "Part of the journey is the end.", speaker: "Tony Stark" },
  { text: "I can do this all day.", speaker: "Steve Rogers" },
  { text: "I've got red in my ledger. I'd like to wipe it out.", speaker: "Natasha Romanoff" },
  { text: "That's my secret, Captain. I'm always angry.", speaker: "Bruce Banner" },
  { text: "If you step out that door, you are an Avenger.", speaker: "Clint Barton" },
  { text: "I'm with you till the end of the line.", speaker: "Steve Rogers" },
  { text: "I choose to run toward my problems, and not away from them.", speaker: "Thor" },
  { text: "I see this as an absolute win.", speaker: "Bruce Banner" },
  { text: "In times of crisis, the wise build bridges, while the foolish build barriers.", speaker: "T'Challa" },
  { text: "You're stronger than you think.", speaker: "Thor" },
  { text: "We create our own demons.", speaker: "Tony Stark" },
  { text: "This is what we train for.", speaker: "Steve Rogers" },
  { text: "You've handled worse. You'll handle this too.", speaker: "Pepper Potts" },
  { text: "Do the thing in front of you. Momentum comes after.", speaker: "Pepper Potts" },
  { text: "You don't have to carry it alone—use your people.", speaker: "Pepper Potts" },
  { text: "You're not behind—you're building.", speaker: "Pepper Potts" },
  { text: "You can be tired and still be unstoppable.", speaker: "Pepper Potts" },
] as const;

const SPEAKER_ICONS: Record<string, string> = {
  "Tony Stark": "/iron-man.svg",
  "Steve Rogers": "/captain.svg",
  "Natasha Romanoff": "/spider.svg",
  "Bruce Banner": "/hulk-Photoroom.svg",
  "Clint Barton": "/captain.svg",
  Thor: "/mjolnir.svg",
  "T'Challa": "/blackpanther-Photoroom.svg",
  "Pepper Potts": "💁🏼‍♀️",
  phy: "🎀",
};

export function getRandomMotivate(): { text: string; speaker: string } {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return {
    text: quote.text,
    speaker: quote.speaker,
  };
}

export function getSpeakerIcon(speaker: string): string {
  return SPEAKER_ICONS[speaker] ?? "/captain.svg";
}
