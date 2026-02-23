<a href="https://nuxt.com"><img width="830" height="213" src="./.github/assets/banner.svg" alt="Nuxt banner"></a>

# Nuxt

<p>
  <a href="https://npmx.dev/package/nuxt"><img src="https://img.shields.io/npm/v/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>
  <a href="https://npmx.dev/package/nuxt"><img src="https://img.shields.io/npm/dm/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Downloads"></a>
  <a href="https://github.com/nuxt/nuxt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nuxt/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Лицензия"></a>
  <a href="https://nuxt.com/modules"><img src="https://img.shields.io/badge/dynamic/json?url=https://nuxt.com/api/v1/modules&query=$.stats.modules&label=Modules&style=flat&colorA=18181B&colorB=28CF8D" alt="Modules"></a>
  <a href="https://nuxt.com"><img src="https://img.shields.io/badge/Nuxt%20Docs-18181B?logo=nuxt" alt="Website"></a>
  <a href="https://chat.nuxt.dev"><img src="https://img.shields.io/badge/Nuxt%20Discord-18181B?logo=discord" alt="Discord"></a>
  <a href="https://securityscorecards.dev/"><img src="https://api.securityscorecards.dev/projects/github.com/nuxt/nuxt/badge" alt="Nuxt openssf scorecard score"></a>
  <a href="https://deepwiki.com/nuxt/nuxt"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

Nuxt — свободный фреймворк с интуитивным и расширяемым подходом к созданию типобезопасных, быстрых и готовых к production full-stack приложений и сайтов на Vue.js.

Он даёт возможности для быстрой разработки быстрых, SEO-дружественных и масштабируемых приложений:

- Рендеринг на сервере, статическая генерация сайтов, гибридный и edge-рендеринг
- Автоматическая маршрутизация с code-splitting и предзагрузкой
- Получение данных и управление состоянием
- SEO и настройка мета-тегов
- Автоимпорт компонентов, композаблов и утилит
- TypeScript без дополнительной настройки
- Full-stack с каталогом server/
- Расширяемость через [300+ модулей](https://nuxt.com/modules)
- Развёртывание на разных [платформах](https://nuxt.com/deploy)
- …и [многое другое](https://nuxt.com) 🚀

### Содержание

- 🚀 [Начало работы](#getting-started)
- 💻 [Разработка на Vue](#vue-development)
- 📖 [Документация](#documentation)
- 🧩 [Модули](#modules)
- ❤️ [Участие в разработке](#contribute)
- 🏠 [Локальная разработка](#local-development)
- 🛟 [Профессиональная поддержка](#professional-support)
- 🔗 [Мы в сети](#follow-us)
- ⚖️ [Лицензия](#license)

---

## <a name="getting-started">🚀 Начало работы</a>

Создание нового проекта:

```bash
npm create nuxt@latest <my-project>
```

> [!TIP]
> Также можно использовать [nuxt.new](https://nuxt.new): запуск стартера Nuxt в CodeSandbox, StackBlitz или локально за несколько секунд.

## <a name="vue-development">💻 Разработка на Vue</a>

Nuxt позволяет писать компоненты Vue просто и предсказуемо. Рутинные задачи автоматизированы — можно сосредоточиться на full-stack приложении.

Пример `app.vue`:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Meet Nuxt',
  description: 'The Intuitive Vue Framework.',
})
</script>

<template>
  <div id="app">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  background-color: #020420;
  color: #00DC82;
}
</style>
```

## <a name="documentation">📖 Документация</a>

Рекомендуем изучить [документацию Nuxt](https://nuxt.com/docs) — от быстрого старта до продвинутых тем. В этом репозитории есть [перевод документации на русский](https://github.com/translation-gang/nuxt/tree/main/docs) (папка `docs/`).

## <a name="modules">🧩 Модули</a>

[Каталог модулей](https://nuxt.com/modules) — модули от команды Nuxt и сообщества для расширения проекта.

## <a name="contribute">❤️ Участие в разработке</a>

Приглашаем участвовать в развитии Nuxt 💚

Как можно помочь:

- **Сообщения об ошибках:** [как сообщить об ошибке](https://nuxt.com/docs/4.x/community/reporting-bugs).
- **Предложения:** идеи по улучшению — [руководство по контрибуции](https://nuxt.com/docs/4.x/community/contribution).
- **Вопросы:** [где получить помощь](https://nuxt.com/docs/4.x/community/getting-help).

## <a name="local-development">🏠 Локальная разработка</a>

[Настройка окружения для разработки](https://nuxt.com/docs/4.x/community/framework-contribution#setup) фреймворка и документации.

## <a name="professional-support">🛟 Профессиональная поддержка</a>

- Аудит и консультации: [Nuxt Experts](https://nuxt.com/enterprise/support)
- Разработка под заказ: [Партнёры Nuxt Agencies](https://nuxt.com/enterprise/agencies)

## <a name="follow-us">🔗 Мы в сети</a>

<p valign="center">
  <a href="https://go.nuxt.com/discord"><img width="20" src="./.github/assets/discord.svg" alt="Discord"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/x"><img width="20" src="./.github/assets/twitter.svg" alt="Twitter"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/github"><img width="20" src="./.github/assets/github.svg" alt="GitHub"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/bluesky"><img width="20" src="./.github/assets/bluesky.svg" alt="Bluesky"></a>
</p>

## <a name="license">⚖️ Лицензия</a>

[MIT](https://github.com/nuxt/nuxt/blob/main/LICENSE)
