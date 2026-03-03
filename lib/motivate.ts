const QUOTES = [
  "Draft the vision, make some decisions. - phy",
  "Sometimes you gotta run before you can walk. - Tony Stark",
  "Part of the journey is the end. - Tony Stark",
  "I can do this all day. - Steve Rogers",
  "I’ve got red in my ledger. I’d like to wipe it out. - Natasha Romanoff",
  "That’s my secret, Captain. I’m always angry. - Bruce Banner",
 "If you step out that door, you are an Avenger. - Clint Barton",
 "I’m with you till the end of the line. - Steve Rogers",
 "I choose to run toward my problems, and not away from them - Thor",
 "I see this as an absolute win - Bruce Banner",
"In times of crisis, the wise build bridges, while the foolish build barriers. - T'Challa",
"You’re stronger than you think. - Thor",
"We create our own demons. - Tony Stark",
"This is what we train for. - Steve Rogers",
"“You’ve handled worse. You’ll handle this too. - Pepper Potts",
"Do the thing in front of you. Momentum comes after. - Pepper Potts",
"You don’t have to carry it alone—use your people. - Pepper Potts",
"You’re not behind—you’re building. - Pepper Potts",
"You can be tired and still be unstoppable. - Pepper Potts",
] as const;

export function getRandomMotivate(): string {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
