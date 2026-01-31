export enum CharacterType {
  HUMAN = 'Human',
  ROBOT = 'Robot',
  ALIEN = 'Alien',
  MINIMAL = 'Minimal',
  STEVEN = 'Steven',
  RANMA = 'Ranma',
  MIWA = 'Miwa (Mikadono)',
}

export enum VoiceType {
  NATURAL = 'Natural',
  DEEP = 'Deep',
  HIGH = 'High',
  RADIO = 'Radio',
}

export type BackgroundType = 'solid' | 'gradient' | 'image';

export interface BackgroundConfig {
  type: BackgroundType;
  value: string; // Hex code, CSS gradient string, or Image URL
}

export interface AudioState {
  isCapturing: boolean;
  volume: number; // 0 to 1
  isMuted: boolean;
}

export interface AppConfig {
  url: string;
  character: CharacterType;
  voice: VoiceType;
  iframeMode: 'iframe' | 'popup';
  background: BackgroundConfig;
}