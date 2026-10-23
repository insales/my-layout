import { getPalette } from './themes.js';

const defaults = {
  width: 1120, top: 48, bottom: 48, mobileTop: 28, mobileBottom: 28,
  background: '#f0f3ec', wideBg: true, wideContent: false, edge: false,
  cardWidth: 220, gap: 20,
};

const baseCSS = (palette) => `.demo {
  --color-btn-bg: ${palette.accent};
  --color-btn-bg-minor-shade: ${palette.accentHover};
  --color-btn-color: ${palette.onAccent};
  --color-btn-second-color: ${palette.text};
  --color-btn-second-bg: ${palette.panel};
  --color-btn-second-bg-hover: ${palette.background};
  --color-btn-second-color-hover: ${palette.text};
  --color-btn-second-border-color: ${palette.border};
  --color-accent-text: ${palette.accent};
  --color-accent-text-minor-shade: ${palette.accentHover};
  --controls-btn-border-radius: ${palette.radius};
  --controls-form-border-radius: ${palette.radius};
  --color-form-controls-border-color: ${palette.border};
  --color-form-controls-bg: ${palette.panel};
  --color-form-controls-bg-disabled: ${palette.background};
  --color-btn-bg-disabled: ${palette.border};
  --color-btn-color-disabled: ${palette.muted};
  --color-success: ${palette.accent};
  --color-form-controls-placeholder: ${palette.muted};
  --color-form-controls-color: ${palette.text};
  --layout-side-padding: 32px;
  --layout-side-padding-mobile: 20px;
  --demo-surface: ${palette.panel};
  --demo-ink: ${palette.text};
  --demo-border: ${palette.border};
  --demo-image-bg: ${palette.imageBackground};
  --demo-radius: ${palette.radius};
  --font-family-heading: ${palette.heading};
  font-family: ${palette.font};
}
.demo p { margin: 0 0 20px; }
.demo h2 { font-size: clamp(28px, 4vw, 42px); letter-spacing: -.04em; font-weight: 600; }
.demo h3 { font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
.demo-kicker { display: block; margin-bottom: 14px; font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.demo-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.demo-heading h2 { margin-bottom: 0; }
.demo-heading > span { font-size: 12px; opacity: .65; white-space: nowrap; }
.demo .button { font-size: 14px; }
.demo a:focus-visible, .demo button:focus-visible, .demo input:focus-visible { outline: 3px solid var(--color-btn-bg); outline-offset: 3px; }
.demo-feedback { display: block; margin-top: 12px; font-size: 13px; }
@media (max-width: 767px) {
  .demo-heading { align-items: start; }
  .demo-heading > span { display: none; }
}`;

const catalog = {
  id: 'catalog', title: 'Каталог товаров', label: 'Каталог', subtitle: 'Карточки и адаптивная сетка', number: '01',
  description: 'Карточки сами находят место. Настройте их ширину — количество колонок изменится автоматически.',
  tags: ['.layout', '.grid-list', '.img-ratio', '.button'], grid: true,
  tip: 'Попробуйте увеличить минимальную ширину карточки или выбрать 390 px: сетка перестроится без дополнительных медиазапросов.',
  settings: {},
  content: `<div class="demo-heading">
  <div><span class="demo-kicker">ВЕЛО / ДВИЖЕНИЕ КАЖДЫЙ ДЕНЬ</span><h2>Навстречу новому</h2></div>
  <span>Коллекция для ваших маршрутов</span>
</div>
<div class="grid-list grid-list_wide grid-list_items-stretch demo-products">
${[
    ['photo-1.jpg', 'Туринг на просёлочной дороге', 'ДЛЯ БОЛЬШИХ ПЛАНОВ', 'Туринг «Горизонт»', '42 900 ₽'],
    ['photo-2.jpg', 'Городской велосипед с корзиной', 'В РИТМЕ ГОРОДА', 'Ситибайк «Утро»', '28 500 ₽'],
    ['photo-3.jpg', 'Велосипеды на фоне гор', 'ПОДАЛЬШЕ ОТ АСФАЛЬТА', 'Гравийник «Перевал»', '56 800 ₽'],
  ].map(([image, alt, tag, title, price]) => `  <article class="demo-product">
    <div class="img-ratio img-ratio_cover" style="--img-ratio: 4/3;">
      <div class="img-ratio__inner"><img src="../static/${image}" alt="${alt}"></div>
    </div>
    <div class="demo-product-info"><span class="demo-kicker">${tag}</span><h3>${title}</h3>
      <div class="demo-product-bottom"><strong>${price}</strong><button type="button" class="button button_size-s" data-demo-action="cart" aria-label="Добавить ${title} в корзину">В корзину</button></div>
    </div>
  </article>`).join('\n')}
</div>
<output class="demo-feedback" id="cart-status" aria-live="polite"></output>`,
  css: `.demo-product { display: flex; flex-direction: column; min-width: 0; background: var(--demo-surface); color: var(--demo-ink); border-radius: var(--demo-radius); overflow: hidden; }
.demo-product .img-ratio { background: var(--demo-image-bg); }
.demo-product-info { display: flex; flex: 1; flex-direction: column; padding: 20px; }
.demo-product-info .demo-kicker { font-size: 9px; letter-spacing: .1em; opacity: .65; }
.demo-product-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
.demo-product-bottom strong { font-size: 17px; font-weight: 600; }`,
};

const hero = {
  id: 'hero', title: 'Обложка с изображением', label: 'Обложка', subtitle: 'Два столбца, один сюжет', number: '02',
  description: 'Большой первый экран с текстом и фотографией. На телефоне столбцы становятся друг под другом.',
  tags: ['.layout', '.grid-column', '.img-ratio'],
  tip: 'Отключите «Фон на всю ширину», чтобы увидеть разницу между фоном секции и фоном её контента.',
  settings: { background: '#f5eee4', top: 64, bottom: 64 },
  content: `<div class="grid-column demo-hero" style="--column-count: 2; --grid-column-column-gap: 40px; --grid-column-row-gap: 28px;">
  <div class="demo-hero-copy"><span class="demo-kicker">ВЕЛО / ВАШ НОВЫЙ МАРШРУТ</span><h2>Город ближе,<br>чем кажется.</h2><p>Утро без пробок. Кофе по пути. Поворот, за которым вы ещё не были. Всё начинается с велосипеда.</p><a class="button" href="#route">Найти свой маршрут ↗</a></div>
  <div class="img-ratio img-ratio_cover demo-hero-image" style="--img-ratio: 4/5;"><div class="img-ratio__inner"><img src="../static/photo-2.jpg" alt="Городской велосипед в лучах осеннего солнца"></div></div>
</div>
<div class="demo-route" id="route"><span>01 / ГОРОД</span><span>02 / ПРИРОДА</span><span>03 / ПРИКЛЮЧЕНИЯ</span></div>`,
  css: `.demo-hero { align-items: center; }
.demo-hero h2 { font-size: clamp(36px, 5vw, 64px); line-height: 1.05; }
.demo-hero-copy p { max-width: 340px; opacity: .75; }
.demo-hero-image { border-radius: var(--demo-radius); }
.demo-route { display: flex; justify-content: space-between; gap: 12px; margin-top: 36px; padding-top: 20px; border-top: 1px solid currentColor; font-size: 10px; letter-spacing: .12em; }
@media (max-width: 767px) {
  .demo-hero { --column-count: 1 !important; }
  .demo-hero-image { --img-ratio: 4/3 !important; }
  .demo-route { font-size: 8px; letter-spacing: .03em; }
}`,
};

const journal = {
  id: 'journal', title: 'Журнал и истории', label: 'Журнал', subtitle: 'Контентные карточки', number: '03',
  description: 'Сетка материалов с одинаковыми пропорциями обложек и свободной высотой текста.',
  tags: ['.layout', '.grid-list', '.img-ratio', '.static-text'], grid: true,
  tip: 'У сетки auto-fill: свободные ячейки сохраняются. В каталоге используется grid-list_wide с auto-fit — карточки занимают всё доступное место.',
  settings: { background: '#ffffff', gap: 28, cardWidth: 240 },
  content: `<div class="demo-heading"><div><span class="demo-kicker">ВЕЛО / ЖУРНАЛ</span><h2>Есть куда ехать</h2></div><span>И есть что рассказать</span></div>
<div class="grid-list demo-journal">
${[
    ['photo-3.jpg', 'Велосипеды в горах', 'МАРШРУТЫ · 7 МИН', 'Выходные выше облаков', 'Как спланировать первый выезд в горы и взять с собой только нужное.'],
    ['photo-2.jpg', 'Велосипед с корзиной в городе', 'ГОРОД · 4 МИН', 'Медленное утро', 'Пять маленьких привычек, с которыми дорога на работу становится любимой частью дня.'],
    ['photo-1.jpg', 'Туринг на природе', 'ПРАКТИКА · 5 МИН', 'Первые сто километров', 'Темп, вода и правильный настрой. Готовимся к длинной поездке без лишних сложностей.'],
  ].map(([image, alt, tag, title, text]) => `  <article class="demo-story">
    <div class="img-ratio img-ratio_cover" style="--img-ratio: 16/10;"><div class="img-ratio__inner"><img src="../static/${image}" alt="${alt}"></div></div>
    <span class="demo-kicker">${tag}</span><h3>${title}</h3><div class="static-text"><p>${text}</p></div>
    <details><summary>Читать историю ↗</summary><p>Начните с короткого знакомого маршрута. Проверьте давление в шинах, возьмите воду и оставьте время на остановки. Самые интересные открытия случаются по пути.</p></details>
  </article>`).join('\n')}
</div>`,
  css: `.demo-story { min-width: 0; }
.demo-story .img-ratio { margin-bottom: 22px; border-radius: var(--demo-radius); }
.demo-story .demo-kicker { font-size: 9px; opacity: .65; }
.demo-story p { font-size: 14px; opacity: .75; }
.demo-story summary { cursor: pointer; font-size: 13px; font-weight: 600; }
.demo-story details p { padding-top: 12px; }`,
};

const subscribe = {
  id: 'subscribe', title: 'Форма подписки', label: 'Подписка', subtitle: 'Поля и состояния формы', number: '04',
  description: 'Контрастная секция с формой: связанные подписи, обязательные поля и сообщение об успешной проверке.',
  tags: ['.layout', '.form-field', '.form-control', '.button'],
  tip: 'Это демонстрационная форма: адрес никуда не отправляется. Браузер проверит email, а пример покажет состояние успеха.',
  settings: { background: '#193d35', top: 64, bottom: 64 },
  content: `<div class="demo-subscribe">
  <span class="demo-kicker">ПИСЬМА С ХОРОШИМ МАРШРУТОМ</span><h2>Иногда нужно<br>просто сменить путь.</h2><p>Истории, новые маршруты и полезные находки.<br>Одно письмо в месяц — по делу и с настроением.</p>
  <form id="demo-subscribe-form" class="demo-subscribe-form">
    <div class="form-field"><label for="demo-email">Ваш email</label><div class="demo-email-row"><input class="form-control" id="demo-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required><button class="button" type="submit">Подписаться ↗</button></div></div>
    <label class="demo-consent"><input type="checkbox" name="consent" required> Согласен с обработкой email для этой демонстрации</label>
    <output class="demo-feedback" id="subscribe-status" aria-live="polite"></output>
  </form>
</div>`,
  css: `.demo-subscribe { max-width: 620px; margin: auto; text-align: center; }
.demo-subscribe h2 { font-size: clamp(34px, 5vw, 54px); line-height: 1.1; }
.demo-subscribe > p { opacity: .7; }
.demo-subscribe-form { margin: 28px auto 0; max-width: 480px; text-align: left; }
.demo-subscribe-form .form-field > label { display: block; margin-bottom: 8px; font-size: 13px; }
.demo-email-row { display: flex; gap: 8px; }
.demo-email-row .form-control { width: 100%; min-width: 0; background: var(--demo-surface); }
.demo-email-row .button {  flex-shrink: 0; }
.demo-consent { display: flex; align-items: start; gap: 8px; font-size: 11px; opacity: .8; }
.demo-consent input { margin-top: 2px; accent-color: var(--color-btn-bg); }
@media (max-width: 480px) { .demo-email-row { flex-direction: column; } }`,
};

const images = {
  id: 'images', title: 'Пропорции изображений', label: 'Изображения', subtitle: 'Cover, contain и размер', number: '05',
  description: 'Одна фотография в трёх контейнерах. Сравните кадрирование cover и полное изображение contain.',
  tags: ['.layout', '.grid-list', '.img-ratio_cover', '.img-ratio_contain'], grid: true,
  tip: 'Пропорция задаётся через --img-ratio. При cover часть изображения обрезается; contain сохраняет весь кадр внутри контейнера.',
  settings: { background: '#f5eee4', cardWidth: 210 },
  content: `<div class="demo-heading"><div><span class="demo-kicker">МЕДИА / БЕЗ СЮРПРИЗОВ</span><h2>Кадр решает</h2></div><span>Один снимок. Три способа показать.</span></div>
<div class="grid-list grid-list_wide demo-images">
${[['4/3', 'cover', 'Пейзажный кадр', '4 / 3 · cover'], ['1', 'cover', 'Квадратная обложка', '1 / 1 · cover'], ['1', 'contain', 'Фотография целиком', '1 / 1 · contain']].map(([ratio, fit, title, label]) => `  <figure class="demo-image-card"><div class="img-ratio img-ratio_${fit}" style="--img-ratio: ${ratio};"><div class="img-ratio__inner"><img src="../static/photo-1.jpg" alt="Велосипед на просёлочной дороге"></div></div><figcaption><strong>${title}</strong><span>${label}</span></figcaption></figure>`).join('\n')}
</div>`,
  css: `.demo-image-card { margin: 0; min-width: 0; }
.demo-image-card .img-ratio { overflow: hidden; border-radius: var(--demo-radius); background: var(--demo-image-bg); }
.demo-image-card figcaption { display: grid; gap: 6px; padding-top: 16px; font-size: 13px; }
.demo-image-card figcaption strong { font-weight: 600; }
.demo-image-card figcaption span { opacity: .6; font-family: monospace; font-size: 12px; }`,
};

const elements = {
  id: 'elements', title: 'Базовые элементы', label: 'Элементы', subtitle: 'Типографика, кнопки, поля', number: '06',
  description: 'Базовые классы в одном месте: размеры кнопок, дополнительные действия и состояния полей.',
  tags: ['.button', '.button_second', '.form-control', '.form-message'],
  tip: 'Цвета, радиусы и высота элементов задаются CSS-переменными. Стили этой темы приведены во вкладке «CSS примера».',
  settings: { background: '#ffffff' },
  content: `<div class="demo-heading"><div><span class="demo-kicker">ОСНОВА / ДЕТАЛИ ИМЕЮТ ЗНАЧЕНИЕ</span><h2>Один язык интерфейса</h2></div></div>
<div class="demo-elements">
  <section><span class="demo-kicker">КНОПКИ</span><div class="demo-button-row"><button class="button button_size-s" type="button" data-demo-action="button">Маленькая</button><button class="button" type="button" data-demo-action="button">Обычная</button><button class="button button_size-l" type="button" data-demo-action="button">Большая ↗</button></div><div class="demo-button-row"><button class="button button_second" type="button" data-demo-action="button">Дополнительная</button><button class="button button_border-round" type="button" data-demo-action="button">Скруглённая</button><button class="button" type="button" disabled>Недоступна</button></div><output id="button-status" class="demo-feedback" aria-live="polite"></output></section>
  <section><span class="demo-kicker">ПОЛЯ ФОРМЫ</span><div class="form-field"><label for="example-name">Ваше имя</label><input class="form-control form-control_wide" id="example-name" placeholder="Например, Саша" autocomplete="given-name"></div><div class="form-field"><label for="example-city">Город доставки</label><select class="form-control form-control_wide" id="example-city"><option>Москва</option><option>Санкт-Петербург</option><option>Казань</option></select></div><div class="form-field"><label for="example-promo">Промокод</label><input class="form-control form-control_wide" id="example-promo" value="FIRST-RIDE" aria-describedby="promo-message" readonly><div id="promo-message" class="form-message form-message_success">Промокод применён</div></div></section>
</div>`,
  css: `.demo-elements { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; }
.demo-elements > section { min-width: 0; }
.demo-button-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
.demo-elements .form-field label { display: block; margin-bottom: 6px; font-size: 13px; }
.demo-elements .form-message { margin-top: 6px;  }
@media (max-width: 767px) { .demo-elements { grid-template-columns: 1fr; gap: 28px; } }`,
};

export const examples = [catalog, hero, journal, subscribe, images, elements];
export const getExample = (id) => examples.find((example) => example.id === id) || catalog;
export function getDefaults(example, appearance) {
  const palette = getPalette(appearance);
  return { ...defaults, ...example.settings, background: palette.background };
}
export function getCSS(example, appearance = { theme: 'dark' }) {
  const palette = getPalette(appearance);
  const treatment = `.demo h2, .demo h3 { text-transform: uppercase; font-weight: 700; letter-spacing: -.04em; }
.demo-product { border: 1px solid var(--demo-border); }
.demo-product-info { padding: 16px; }
.demo .demo-kicker { font-family: monospace; font-size: 9px; letter-spacing: .06em; }
.demo .button { font-family: monospace; text-transform: uppercase; font-size: 11px; }`;
  return `${baseCSS(palette)}\n\n${example.css}\n\n${treatment}`;
}

export function getHTML(example, settings) {
  const variables = {
    '--bg': settings.background,
    '--bg-is-dark': isDark(settings.background) ? 'true' : 'false',
    '--layout-content-max-width': `${settings.width}px`,
    '--layout-pt-desktop-px': `${settings.top}px`,
    '--layout-pb-desktop-px': `${settings.bottom}px`,
    '--layout-pt-mobile-px': `${settings.mobileTop}px`,
    '--layout-pb-mobile-px': `${settings.mobileBottom}px`,
  };
  if (settings.wideBg) variables['--layout-wide-bg'] = 'true';
  if (settings.wideContent) variables['--layout-wide-content'] = 'true';
  if (settings.edge) variables['--layout-edge'] = 'true';
  if (example.grid) {
    variables['--grid-list-min-width'] = `${settings.cardWidth}px`;
    variables['--grid-list-row-gap'] = `${settings.gap}px`;
    variables['--grid-list-column-gap'] = `${settings.gap}px`;
  }
  const style = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`).join('\n');
  return `<section class="layout demo" style="\n${style}\n">\n  <div class="layout__content">\n${example.content.split('\n').map((line) => `    ${line}`).join('\n')}\n  </div>\n</section>`;
}

function isDark(hex) {
  const components = hex.slice(1).match(/../g).map((component) => parseInt(component, 16) / 255);
  const linear = components.map((channel) => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722 < .179;
}

export const starter = `<link rel="stylesheet" href="dist/styles/core-css.css">\n\n<section class="layout" style="\n  --layout-content-max-width: 1120px;\n  --layout-pt-desktop-px: 64px;\n  --layout-pb-desktop-px: 64px;\n  --layout-pt-mobile-px: 32px;\n  --layout-pb-mobile-px: 32px;\n">\n  <div class="layout__content">\n    <h2>Здесь начинается ваша секция</h2>\n    <p>Остальное — дело ваших идей.</p>\n  </div>\n</section>`;
