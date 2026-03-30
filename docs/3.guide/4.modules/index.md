---
title: 'Руководство автора модуля'
titleTemplate: '%s'
description: 'Как создать модуль Nuxt для интеграции, расширения или доработки любого приложения на Nuxt.'
navigation: false
surround: false
---

[Конфигурация](/docs/4.x/api/nuxt-config) и система [хуков](/docs/4.x/guide/going-further/hooks) Nuxt позволяют настроить любой аспект фреймворка и подключить нужные интеграции (плагины Vue, CMS, серверные маршруты, компоненты, логирование и т.д.).

**Модули Nuxt** — это функции, которые последовательно выполняются при запуске `nuxt dev` или сборке `nuxt build`.
С их помощью можно инкапсулировать решения, покрывать их тестами и публиковать в npm без лишнего шаблонного кода в проекте и без правок самого Nuxt.

::card-group{class="sm:grid-cols-1"}
  ::card{icon="i-lucide-rocket" title="Первый модуль" to="/docs/4.x/guide/modules/getting-started"}
  Создайте первый модуль Nuxt на официальном стартовом шаблоне.
  ::
  ::card{icon="i-lucide-box" title="Структура модуля" to="/docs/4.x/guide/modules/module-anatomy"}
  Как устроены модули Nuxt и как их описывать.
  ::
  ::card{icon="i-lucide-code" title="Плагины, компоненты и другое" to="/docs/4.x/guide/modules/recipes-basics"}
  Как из модуля подключать плагины, компоненты, композаблы и серверные маршруты.
  ::
  ::card{icon="i-lucide-layers" title="Хуки и типы" to="/docs/4.x/guide/modules/recipes-advanced"}
  Хуки жизненного цикла, виртуальные файлы и объявления TypeScript в модулях.
  ::
  ::card{icon="i-lucide-test-tube" title="Тестирование модуля" to="/docs/4.x/guide/modules/testing"}
  Юнит-, интеграционные и E2E-тесты для модуля Nuxt.
  ::
  ::card{icon="i-lucide-medal" title="Лучшие практики" to="/docs/4.x/guide/modules/best-practices"}
  Рекомендации по производительности и поддерживаемости модулей.
  ::
  ::card{icon="i-lucide-globe" title="Публикация и экосистема" to="/docs/4.x/guide/modules/ecosystem"}
  Экосистема модулей Nuxt и публикация пакета в npm.
  ::
::
