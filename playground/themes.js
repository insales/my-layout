const palettes = {
  dark: { background: '#202324', panel: '#2c3031', text: '#f0f0e8', muted: '#b0b4ad', border: '#545a55', accent: '#ff743d', accentHover: '#ff956b', onAccent: '#1b1d1b', radius: '0px', font: 'Arial, Helvetica, sans-serif', heading: 'Arial, Helvetica, sans-serif', imageBackground: '#111615' },
  light: { background: '#e4e6dd', panel: '#f4f5ed', text: '#20251e', muted: '#636d5e', border: '#aeb6a5', accent: '#cc4218', accentHover: '#e35123', onAccent: '#ffffff', radius: '0px', font: 'Arial, Helvetica, sans-serif', heading: 'Arial, Helvetica, sans-serif', imageBackground: '#c5ccba' },
};

export function getPalette({ theme = 'dark' } = {}) {
  return palettes[theme] || palettes.dark;
}

export function getAppearance() {
  return { theme: document.documentElement.dataset.theme || 'dark' };
}
