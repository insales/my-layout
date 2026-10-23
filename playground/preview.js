import { getExample, getDefaults, getCSS, getHTML } from './examples.js';
import { getPalette } from './themes.js';

const root = document.getElementById('example-root');
const style = document.getElementById('example-style');
let cartCount = 0;

function render(id, settings, appearance) {
  const example = getExample(id);
  const palette = getPalette(appearance);
  document.documentElement.style.colorScheme = appearance.theme;
  document.documentElement.style.background = palette.background;
  document.body.style.background = palette.background;
  style.textContent = getCSS(example, appearance);
  root.innerHTML = getHTML(example, settings);
  document.title = `${example.title} — my-layout`;
  cartCount = 0;
  reportSize();
}

function reportSize() {
  if (window.parent === window) return;
  window.parent.postMessage({ type: 'my-layout:size', height: Math.ceil(root.getBoundingClientRect().height), width: window.innerWidth }, window.location.origin);
}

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'my-layout:render') return;
  render(event.data.id, event.data.settings, event.data.appearance);
});

root.addEventListener('click', (event) => {
  const action = event.target.closest('[data-demo-action]');
  if (action?.dataset.demoAction === 'cart') {
    cartCount += 1;
    document.getElementById('cart-status').textContent = `В демонстрационной корзине: ${cartCount}. Заказ не оформляется.`;
    action.textContent = 'Добавлено ✓';
  }
  if (action?.dataset.demoAction === 'button') {
    document.getElementById('button-status').textContent = `Нажата кнопка «${action.textContent.trim()}».`;
  }
});

root.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.id !== 'demo-subscribe-form') return;
  document.getElementById('subscribe-status').textContent = 'Готово! Форма заполнена верно. Это демо — email никуда не отправлен.';
});

new ResizeObserver(reportSize).observe(root);
window.addEventListener('resize', reportSize);
root.addEventListener('load', reportSize, true);
const params = new URLSearchParams(window.location.search);
const appearance = { theme: params.get('theme') || 'dark' };
const example = getExample(params.get('example'));
render(example.id, getDefaults(example, appearance), appearance);
