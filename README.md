## Файл библиотеки для использования 

`dist/styles/my-layout.css`

## Установка зависимостей

```bash
npm ci
```

## Комнады

### Режим разработки

```bash
npm run dev
```

После запуска, доступна песочница с подключённой библиотекой.

Адрес: [http://localhost:8000/](http://localhost:8000/)

### Собрать библиотеку

```bash
npm run build
```

## Файловая структура

* **Библиотека**
  * Скрипты `src/scripts`
  * Стили `src/styles`

* **Песочница**
  * Html страничка `playground/index.html`
  * Статические файлы для подключения в песочницу `static/`

## Вертикальные отступы виджета в пикселях

Для внутренних отступов `.layout__content` можно задать независимые значения на обёртке виджета:

```html
<section class="layout" style="--layout-pt-desktop-px: 112px; --layout-pb-desktop-px: 112px; --layout-pt-mobile-px: 64px; --layout-pb-mobile-px: 64px;">
  <div class="layout__content">...</div>
</section>
```

Все четыре переменные необязательны. На десктопе используются `--layout-pt-desktop-px` и `--layout-pb-desktop-px`, а при их отсутствии — прежние `--layout-pt` и `--layout-pb`. На мобильном сначала используются `--layout-pt-mobile-px` и `--layout-pb-mobile-px`, затем соответствующие десктопные значения в пикселях, затем прежние отступы с коэффициентом `--layout-adaptive-vertical-indents-factor-decrease`. Пиксельные значения не умножаются на коэффициент. Внешние отступы `--layout-mt` и `--layout-mb` работают по-прежнему.
