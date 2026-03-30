<a href="https://nuxt.com"><img width="830" height="213" src="./.github/assets/banner.svg" alt="Баннер Nuxt"></a>

# Nuxt

<p>
  <a href="https://npmx.dev/package/nuxt"><img src="https://npmx.dev/api/registry/badge/version/nuxt" alt="Версия"></a>
  <a href="https://npmx.dev/package/nuxt"><img src="https://npmx.dev/api/registry/badge/downloads/nuxt" alt="Загрузки"></a>
  <a href="https://github.com/nuxt/nuxt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nuxt/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Лицензия"></a>
  <a href="https://nuxt.com/modules"><img src="https://img.shields.io/badge/dynamic/json?url=https://nuxt.com/api/v1/modules&query=$.stats.modules&label=Modules&style=flat&colorA=18181B&colorB=28CF8D" alt="Модули"></a>
  <a href="https://nuxt.com"><img src="https://img.shields.io/badge/Nuxt%20Docs-18181B?logo=nuxt" alt="Сайт"></a>
  <a href="https://chat.nuxt.dev"><img src="https://img.shields.io/badge/Nuxt%20Discord-18181B?logo=discord" alt="Discord"></a>
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/nuxt/nuxt"><img src="https://api.securityscorecards.dev/projects/github.com/nuxt/nuxt/badge" alt="Оценка OpenSSF Scorecard для Nuxt"></a>
  <a href="https://deepwiki.com/nuxt/nuxt"><img src="https://deepwiki.com/badge.svg" alt="Спросить DeepWiki"></a>
</p>

Nuxt — бесплатный фреймворк с открытым исходным кодом для интуитивной и расширяемой разработки типобезопасных, производительных и готовых к продакшену full-stack веб-приложений и сайтов на Vue.js.

Среди возможностей, упрощающих создание быстрых, удобных для SEO и масштабируемых приложений:
- Рендеринг на сервере (SSR), статическая генерация, гибридный и edge-рендеринг
- Автоматическая маршрутизация с разбиением кода и предзагрузкой
- Загрузка данных и управление состоянием
- SEO и метатеги
- Автоимпорт компонентов, композаблов и утилит
- TypeScript без дополнительной настройки
- Full-stack с каталогом `server/`
- Расширение через [300+ модулей](https://nuxt.com/modules)
- Деплой на множество [платформ хостинга](https://nuxt.com/deploy)
- …[и многое другое](https://nuxt.com) 🚀

### Содержание

- 🚀 [Быстрый старт](#getting-started)
- 💻 [Разработка на Vue](#vue-development)
- 📖 [Документация](#documentation)
- 🧩 [Модули](#modules)
- ❤️ [Участие в проекте](#contribute)
- 🏠 [Локальная разработка](#local-development)
- 🛟 [Профессиональная поддержка](#professional-support)
- 🔗 [Мы в соцсетях](#follow-us)
- ⚖️ [Лицензия](#license)

---

## <a name="getting-started">🚀 Быстрый старт</a>

Создайте новый стартовый проект одной командой — будут созданы нужные файлы и зависимости:

```bash
npm create nuxt@latest <my-project>
```

> [!TIP]
> Загляните на [nuxt.new](https://nuxt.new): откройте стартер Nuxt в CodeSandbox, StackBlitz или локально и начните работу за считанные секунды.

## <a name="vue-development">💻 Разработка на Vue</a>

Nuxt простой, предсказуемый и мощный: вы пишете компоненты Vue естественным образом. Рутина автоматизирована — можно сосредоточиться на full-stack приложении.

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

Настоятельно рекомендуем [документацию Nuxt](https://nuxt.com/docs): от быстрого старта до продвинутых тем — это лучший способ глубже разобраться во фреймворке.

## <a name="modules">🧩 Модули</a>

[Каталог модулей](https://nuxt.com/modules) от команды Nuxt и сообщества расширяет возможности проекта.

## <a name="contribute">❤️ Участие в проекте</a>

Приглашаем помогать развивать Nuxt 💚

Вот несколько способов поучаствовать:

- **Сообщения об ошибках:** если нашли баг, сначала загляните в [руководство по сообщению об ошибках](https://nuxt.com/docs/community/reporting-bugs).
- **Предложения:** есть идеи по улучшению — [руководство для контрибьюторов](https://nuxt.com/docs/community/contribution).
- **Вопросы:** нужна помощь — в [разделе «Получить помощь»](https://nuxt.com/docs/community/getting-help) собраны ресурсы.

## <a name="local-development">🏠 Локальная разработка</a>

Следуйте инструкции: [настройка локальной среды разработки](https://nuxt.com/docs/community/framework-contribution#setup), чтобы вносить вклад во фреймворк и документацию.

## <a name="professional-support">🛟 Профессиональная поддержка</a>

- Технический аудит и консалтинг: [Nuxt Experts](https://nuxt.com/enterprise/support)
- Кастомная разработка и другое: [Nuxt Agencies Partners](https://nuxt.com/enterprise/agencies)

## <a name="follow-us">🔗 Мы в соцсетях</a>

<p valign="center">
  <a href="https://go.nuxt.com/discord"><img width="20" src="./.github/assets/discord.svg" alt="Discord"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/x"><img width="20" src="./.github/assets/twitter.svg" alt="Twitter"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/github"><img width="20" src="./.github/assets/github.svg" alt="GitHub"></a>&nbsp;&nbsp;<a href="https://go.nuxt.com/bluesky"><img width="20" src="./.github/assets/bluesky.svg" alt="Bluesky"></a>
</p>

## <a name="license">⚖️ Лицензия</a>

[MIT](https://github.com/nuxt/nuxt/blob/main/LICENSE)
