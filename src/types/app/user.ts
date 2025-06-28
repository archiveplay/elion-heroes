/**
 * Represents a Telegram user profile with in-game player stats.
 */
export interface User {
  id: number;
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  photoUrl: string;
  referredById: number | null;
  balance: number;
  createdAt: string;
  player: Player
}

/**
 * Represents an in-game player stats.
 */
export interface Player {
  id: number;
  userId: number;
  health: number;
  maxHealth: number;
  damage: number;
  attackRange: number;
  attackSpeed: number;
  movementSpeed: number;
  level: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
}
