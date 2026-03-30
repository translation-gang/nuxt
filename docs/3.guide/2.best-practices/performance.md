---
navigation.title: 'Производительность Nuxt'
title: Производительность Nuxt
description: Рекомендации по ускорению приложений Nuxt.
---

В Nuxt есть встроенные механизмы для производительности и лучших [Core Web Vitals](https://web.dev/articles/vitals). Есть и официальные модули для отдельных областей. Ниже — практики оптимизации.

## Встроенные возможности

Важно понимать, как они работают — это основа для «быстрого» сайта.

### Ссылки

[`<NuxtLink>`](/docs/4.x/api/components/nuxt-link) заменяет и `<RouterLink>`, и `<a>`: сам определяет внутреннюю/внешнюю ссылку и применяет оптимизации (prefetch, атрибуты по умолчанию и т.д.)

```html
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>

<!-- С Vue Router и умным prefetch -->
<a href="/about">About page</a>
```

Nuxt по умолчанию делает умный prefetch: когда ссылка видна (в viewport или при скролле), подгружается JS страниц, чтобы по клику всё было готово.

Prefetch по взаимодействию:

```ts
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: 'interaction',
      },
    },
  },
})
```

:read-more{title="NuxtLink" to="/docs/4.x/api/components/nuxt-link"}

### Гибридный рендеринг

В сложных приложениях часть страниц собирают на билде, часть отдают только на клиенте.

Гибридный режим задаёт правила кеша и ответа сервера через Route Rules:

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true,
    },
    '/products/**': {
      swr: 3600,
    },
    '/blog': {
      isr: 3600,
    },
    '/admin/**': {
      ssr: false,
    },
  },
})
```

Сервер Nuxt регистрирует middleware и кеш Nitro.

:read-more{title="Гибридный рендеринг" to="/docs/4.x/guide/concepts/rendering#hybrid-rendering"}

### Ленивая загрузка компонентов

Префикс `Lazy` у имени компонента — динамический импорт. Удобно, если компонент нужен не всегда.

```html
<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

Так откладывается загрузка кода компонента и можно уменьшить JS-бандл.

:read-more{title="Ленивая загрузка компонентов" to="/docs/4.x/directory-structure/app/components#dynamic-imports"}

### Отложенная гидратация

Не всем компонентам нужна гидратация сразу. Lazy hydration (Nuxt 3.16+) позволяет отложить загрузку кода и гидратацию — лучше time-to-interactive.

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

Можно откладывать гидратацию до появления в viewport или до более приоритетных задач браузера.

:read-more{title="Lazy hydration" to="/docs/4.x/directory-structure/app/components#delayed-or-lazy-hydration"}

### Загрузка данных

Чтобы не запрашивать одни и те же данные дважды (сервер + клиент), есть [`useFetch`](/docs/4.x/api/composables/use-fetch) и [`useAsyncData`](/docs/4.x/api/composables/use-async-data): ответ с сервера попадает в payload и переиспользуется при гидратации.

:read-more{title="Загрузка данных" to="/docs/4.x/getting-started/data-fetching"}

## Официальные модули Nuxt

Помимо ядра — модули команды Nuxt для изображений, шрифтов, скриптов.

### Изображения

Неоптимизированные картинки бьют по [LCP](https://web.dev/articles/lcp).

Модуль [Nuxt Image](https://image.nuxt.com/) — оптимизация из коробки: ресайз, CDN, современные форматы.

:video-accordion{title="Видео LearnVue о Nuxt Image" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/4.x/api/components/nuxt-img) заменяет `<img>`:

* встроенный провайдер оптимизации локальных и удалённых изображений
* `src` в URL провайдера (WebP, Avif и т.д.)
* ресайз по `width`/`height`
* адаптивные `sizes` при опции sizes
* нативный `lazy loading` и остальные атрибуты `<img>`

Разделите изображения по важности: что нужно сразу (LCP) и что можно позже.

```html
<template>
  <!-- 🚨 Срочно -->
  <NuxtImg
    src="/hero-banner.jpg"
    format="webp"
    :preload="{ fetchPriority: 'high' }"
    loading="eager"
    width="200"
    height="100"
  />

  <!-- 🐌 Позже -->
  <NuxtImg
    src="/facebook-logo.jpg"
    format="webp"
    loading="lazy"
    fetchpriority="low"
    width="200"
    height="100"
  />
</template>
```

:read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}

### Шрифты

[Nuxt Fonts](https://fonts.nuxt.com/) оптимизирует шрифты (включая кастомные), убирает лишние внешние запросы, улучшает приватность и скорость.

Авто self-hosting и [fontaine](https://github.com/unjs/fontaine) снижают CLS.

:video-accordion{title="Доклад Daniel Roe о Nuxt Fonts" videoId="D3F683UViBY"}

Nuxt Fonts обходит CSS и при объявлении `font-family`:

1. **Ищет файлы** — сначала `public/`, затем провайдеры (Google, Bunny, Fontshare).
2. **Генерирует @font-face** — подключение из нужных источников.
3. **Прокси и кеш** — URL на `/_fonts`, локальное кеширование.
4. **Метрики fallback** — подгонка системных шрифтов под веб-шрифт ([CLS](https://web.dev/articles/cls)).
5. **В сборке** — хеши имён, долгий кеш.

Провайдеры расширяемы.

### Скрипты

Аналитика, видео, карты, соцсети удобны, но бьют по [INP](https://web.dev/articles/inp) и LCP.

[Nuxt Scripts](https://scripts.nuxt.com/) — обёртка над сторонними скриптами с упором на производительность, приватность, безопасность и DX.

:video-accordion{title="Видео Alex Lichter о Nuxt Scripts" videoId="sjMqUUvH9AE"}

SSR, типобезопасность и низкоуровневый контроль загрузки.

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  {
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// события в очередь до загрузки ga
proxy.gtag('config', 'UA-123456789-1')
// или после загрузки
onLoaded((gtag) => {
  // скрипт загружен
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## Инструменты профилирования

Сначала измеряйте: локально в dev, затем на production.

### Nuxi Analyze

Команда [`analyze`](/docs/4.x/api/commands/analyze) строит визуализацию production-бандла через `vite-bundle-visualizer` (аналог `webpack-bundle-analyzer`) — видно, что занимает место.

Крупный блок — повод для code splitting, lazy load или замены библиотеки.

Крупные блоки из многих кусочков часто уменьшают точечными импортами; один большой блок — кандидат на lazy import.

### Nuxt DevTools

[Nuxt DevTools](https://devtools.nuxt.com/) показывает устройство приложения и узкие места.

![Пример Nuxt DevTools](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

Для производительности полезны:
1. **Timeline** — рендер, обновления, инициализация компонентов
2. **Assets** — размеры файлов без трансформаций
3. **Render Tree** — связи компонентов, скриптов, стилей
4. **Inspect** — файлы приложения, размер, время оценки

### Chrome DevTools

Вкладки **Performance** и **Lighthouse**.

[Performance](https://developer.chrome.com/docs/devtools/performance/overview) показывает локальные **LCP** и **CLS**; при взаимодействии — **INP** и полную картину CWV для вашего устройства и сети.

![Панель Performance Chrome DevTools](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse) — аудит производительности, доступности, SEO, PWA и практик.

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

У каждого аудита есть пояснение и советы по исправлению.

### PageSpeed Insights

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about) — опыт пользователей на мобильных и десктопе и рекомендации.

Лабораторные данные удобны для отладки; полевые — для реального UX.

### WebPageTest

[WebPageTest](https://www.webpagetest.org/) — глубокая диагностика загрузки в разных условиях.

Тесты с разных точек мира, реальные браузеры, настраиваемая сеть.

## Типичные проблемы

### Слишком много плагинов

**Проблема**: тяжёлая инициализация в плагинах блокирует гидратацию.

**Решение**: часть логики вынести в композаблы/утилиты.

### Мёртвый код и зависимости

**Проблема**: неиспользуемый код и пакеты раздувают бандл.

**Решение**: ревизия `package.json` и кода.

### Игнорирование советов Vue

**Проблема**: в [документации Vue по производительности](https://vuejs.org/guide/best-practices/performance) есть приёмы, применимые и в Nuxt.

**Решение**: `shallowRef`, `v-memo`, `v-once` и т.д.

### Нет единых паттернов

**Проблема**: в команде каждый тянет свой стиль — конфликты и регрессии по скорости.

**Решение**: договорённости, например [практики для Vue composables](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)

### Всё грузится сразу

**Проблема**: без порядка загрузки всё тянется параллельно — медленно и неудобно.

**Решение**: progressive enhancement: сначала ядро контента, затем слои по мере возможностей браузера и сети.

## Полезные ссылки

1. [PRPL и мгновенная загрузка](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [Воспринимаемая производительность](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
