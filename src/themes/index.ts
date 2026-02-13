export type ThemeName = 'anthropic' | 'deepseek' | 'perplexity' | 'openai' | 'mistral';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  accentHover: string;
  muted: string;
  border: string;
  cardBg: string;
  surface: string;
}

export const themes: Record<ThemeName, Record<ThemeMode, ThemeColors>> = {
  anthropic: {
    light: { bg: '#faf9f6', text: '#1a1a1a', accent: '#d97757', accentHover: '#c4644a', muted: '#6b6560', border: '#e8e4df', cardBg: '#ffffff', surface: '#f5f3ef' },
    dark: { bg: '#1a1410', text: '#f0ece6', accent: '#e8916e', accentHover: '#d97757', muted: '#a89e94', border: '#3d3530', cardBg: '#2a221c', surface: '#221b15' },
  },
  deepseek: {
    light: { bg: '#f8f9ff', text: '#1a1a2e', accent: '#4d6bfe', accentHover: '#3a58eb', muted: '#6b7194', border: '#e0e3f0', cardBg: '#ffffff', surface: '#f0f2fa' },
    dark: { bg: '#0f0f23', text: '#e8e8e8', accent: '#4d6bfe', accentHover: '#6b85ff', muted: '#8b8fa3', border: '#2a2a4a', cardBg: '#1a1a35', surface: '#15152d' },
  },
  perplexity: {
    light: { bg: '#ffffff', text: '#1b1b1b', accent: '#20808d', accentHover: '#1a6b76', muted: '#64748b', border: '#e2e8f0', cardBg: '#ffffff', surface: '#f8fafc' },
    dark: { bg: '#0f1419', text: '#e7e9ea', accent: '#2bb5c4', accentHover: '#20808d', muted: '#8899a6', border: '#2f3336', cardBg: '#1c2732', surface: '#15202b' },
  },
  openai: {
    light: { bg: '#ffffff', text: '#0d0d0d', accent: '#10a37f', accentHover: '#0d8c6c', muted: '#6e6e80', border: '#e5e5e5', cardBg: '#ffffff', surface: '#f7f7f8' },
    dark: { bg: '#0d0d0d', text: '#ececf1', accent: '#10a37f', accentHover: '#19c999', muted: '#8e8ea0', border: '#2d2d2d', cardBg: '#1a1a1a', surface: '#171717' },
  },
  mistral: {
    light: { bg: '#ffffff', text: '#1a1a2e', accent: '#f7931e', accentHover: '#e07d0a', muted: '#64748b', border: '#e2e8f0', cardBg: '#ffffff', surface: '#f8f9fa' },
    dark: { bg: '#12121f', text: '#e8e8f0', accent: '#f7931e', accentHover: '#ffab4a', muted: '#8b8fa3', border: '#2a2a40', cardBg: '#1c1c2e', surface: '#17172a' },
  },
};
