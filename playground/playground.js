import { examples, getExample, getDefaults, getHTML, getCSS, starter } from './examples.js';
import { getAppearance, getPalette } from './themes.js';

const frame = document.getElementById('preview-frame');
const stage = document.getElementById('preview-stage');
const canvas = document.getElementById('preview-canvas');
const controls = [...document.querySelectorAll('[data-setting]')];
const views = [...document.querySelectorAll('[data-view]')];
const toast = document.getElementById('toast');
let appearance = getAppearance();
let example = getExample('catalog');
let settings = getDefaults(example, appearance);
let viewport = 'fluid';
let frameHeight = 480;
let toastTimer;

const list = document.getElementById('example-list');
for (const item of examples) {
  const link = document.createElement('a');
  link.href = `#${item.id}`;
  link.dataset.example = item.id;
  link.innerHTML = `<span class="example-number">${item.number}</span><span><strong>${item.label}</strong><small>${item.subtitle}</small></span><span class="example-arrow" aria-hidden="true">↗</span>`;
  list.append(link);
}

function readLocation() {
  const [id, query = ''] = window.location.hash.slice(1).split('?');
  if (id && !examples.some((item) => item.id === id)) return false;
  example = getExample(id);
  settings = getDefaults(example, appearance);
  viewport = 'fluid';
  const params = new URLSearchParams(query);
  for (const control of controls) {
    const key = control.dataset.setting;
    if (!params.has(key)) continue;
    if (control.type === 'checkbox') settings[key] = params.get(key) === '1';
    else {
      const value = Number(params.get(key));
      if (!Number.isFinite(value)) continue;
      const step = Number(control.step);
      settings[key] = Math.max(Number(control.min), Math.min(Number(control.max), Math.round(value / step) * step));
    }
  }
  if (/^#[a-f\d]{6}$/i.test(params.get('background'))) settings.background = params.get('background');
  if (['390', '768'].includes(params.get('viewport'))) viewport = params.get('viewport');
  return true;
}

function saveLocation() {
  const params = new URLSearchParams();
  const defaults = getDefaults(example, appearance);
  for (const [key, value] of Object.entries(settings)) {
    if (value !== defaults[key]) params.set(key, typeof value === 'boolean' ? (value ? '1' : '0') : value);
  }
  if (viewport !== 'fluid') params.set('viewport', viewport);
  const query = params.toString();
  history.replaceState(null, '', `#${example.id}${query ? `?${query}` : ''}`);
}

function syncControls() {
  for (const control of controls) {
    const value = settings[control.dataset.setting];
    if (control.type === 'checkbox') control.checked = value;
    else {
      control.value = value;
      document.getElementById(`${control.id}-value`).value = `${value} px`;
    }
  }
  const palette = getPalette(appearance);
  const colors = [palette.background, palette.panel, '#193d35', '#ffffff'];
  const labels = ['Фон текущей темы', 'Поверхность текущей темы', 'Тёмно-зелёный', 'Белый'];
  [...document.querySelectorAll('[data-color]')].forEach((swatch, index) => {
    swatch.dataset.color = colors[index];
    swatch.style.setProperty('--swatch', colors[index]);
    swatch.setAttribute('aria-label', labels[index]);
  });
  document.getElementById('background-color').value = settings.background;
  document.getElementById('color-value').textContent = settings.background;
  for (const swatch of document.querySelectorAll('[data-color]')) {
    swatch.setAttribute('aria-pressed', swatch.dataset.color === settings.background ? 'true' : 'false');
  }
  document.getElementById('grid-settings').hidden = !example.grid;
  for (const button of document.querySelectorAll('[data-viewport]')) button.setAttribute('aria-pressed', button.dataset.viewport === viewport ? 'true' : 'false');
}

function sendPreview() {
  frame.contentWindow.postMessage({ type: 'my-layout:render', id: example.id, settings, appearance }, window.location.origin);
}

function update() {
  syncControls();
  document.getElementById('html-code').textContent = getHTML(example, settings);
  document.getElementById('css-code').textContent = getCSS(example, appearance);
  sendPreview();
  sizePreview();
}

function selectExample() {
  for (const link of list.querySelectorAll('a')) {
    if (link.dataset.example === example.id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  document.getElementById('example-title').textContent = example.title;
  document.getElementById('example-description').textContent = example.description;
  document.getElementById('example-tip').textContent = example.tip;
  const tags = document.getElementById('example-tags');
  tags.replaceChildren(...example.tags.map((tag) => {
    const code = document.createElement('code');
    code.textContent = tag;
    return code;
  }));
  update();
}

list.addEventListener('click', (event) => {
  const link = event.target.closest('[data-example]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (link.dataset.example === example.id) return;
  example = getExample(link.dataset.example);
  settings = getDefaults(example, appearance);
  history.pushState(null, '', `#${example.id}`);
  saveLocation();
  selectExample();
});

function sizePreview() {
  if (stage.clientWidth <= 40) return;
  const availableWidth = Math.max(1, stage.clientWidth - 40);
  const width = viewport === 'fluid' ? availableWidth : Number(viewport);
  const scale = Math.min(1, availableWidth / width);
  frame.style.width = `${width}px`;
  frame.style.height = `${frameHeight}px`;
  frame.style.transform = `scale(${scale})`;
  canvas.style.width = `${width * scale}px`;
  canvas.style.height = `${frameHeight * scale}px`;
  document.getElementById('viewport-label').textContent = `${Math.round(width)} px${width < 768 ? ' · мобильный' : ' · десктоп'}${scale < 1 ? ` · масштаб ${Math.round(scale * 100)}%` : ''}`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}

async function copy(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    showToast('Не удалось скопировать. Выделите код во вкладке и скопируйте вручную.');
  }
}

for (const control of controls) control.addEventListener('input', () => {
  settings[control.dataset.setting] = control.type === 'checkbox' ? control.checked : Number(control.value);
  update();
  saveLocation();
});

function setColor(color) {
  settings.background = color;
  update();
  saveLocation();
}
for (const swatch of document.querySelectorAll('[data-color]')) swatch.addEventListener('click', () => setColor(swatch.dataset.color));
document.getElementById('background-color').addEventListener('input', (event) => setColor(event.target.value));

for (const button of document.querySelectorAll('[data-viewport]')) button.addEventListener('click', () => {
  viewport = button.dataset.viewport;
  syncControls();
  sizePreview();
  saveLocation();
});

document.getElementById('reset-settings').addEventListener('click', () => {
  settings = getDefaults(example, appearance);
  update();
  saveLocation();
  showToast('Настройки примера сброшены');
});

function selectView(view) {
  for (const button of views) {
    const selected = button.dataset.view === view;
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    button.tabIndex = selected ? 0 : -1;
    document.getElementById(`panel-${button.dataset.view}`).hidden = !selected;
  }
  if (view === 'preview') sizePreview();
}
for (const button of views) {
  button.addEventListener('click', () => selectView(button.dataset.view));
  button.addEventListener('keydown', (event) => {
    const index = views.indexOf(button);
    let next;
    if (event.key === 'ArrowRight') next = views[(index + 1) % views.length];
    if (event.key === 'ArrowLeft') next = views[(index + views.length - 1) % views.length];
    if (event.key === 'Home') next = views[0];
    if (event.key === 'End') next = views.at(-1);
    if (!next) return;
    event.preventDefault();
    selectView(next.dataset.view);
    next.focus();
  });
}
for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', () => {
  const text = button.dataset.copy === 'starter' ? starter : button.dataset.copy === 'css' ? getCSS(example, appearance) : getHTML(example, settings);
  copy(text, 'Код скопирован');
});
document.getElementById('share-example').addEventListener('click', () => {
  saveLocation();
  copy(window.location.href, 'Ссылка с настройками скопирована');
});

document.addEventListener('my-layout:appearance', (event) => {
  if (appearance.theme === event.detail.theme) return;
  const oldDefaults = getDefaults(example, appearance);
  appearance = { theme: event.detail.theme };
  if (event.detail.restore) {
    readLocation();
    selectExample();
    return;
  }
  const newDefaults = getDefaults(example, appearance);
  for (const key of Object.keys(settings)) {
    if (settings[key] === oldDefaults[key]) settings[key] = newDefaults[key];
  }
  update();
  saveLocation();
});

window.addEventListener('hashchange', () => {
  if (readLocation()) selectExample();
});
window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin || event.source !== frame.contentWindow || event.data?.type !== 'my-layout:size') return;
  if (!Number.isFinite(event.data.height)) return;
  frameHeight = Math.max(160, Math.min(10000, event.data.height));
  sizePreview();
});
new ResizeObserver(sizePreview).observe(stage);
frame.addEventListener('load', sendPreview);
const previewURL = new URL('preview.html', import.meta.url);
previewURL.searchParams.set('theme', appearance.theme);
frame.src = previewURL.href;
document.getElementById('starter-code').textContent = starter;
readLocation();
selectExample();
