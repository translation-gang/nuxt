---
title: 'Руководство для авторов модулей'
titleTemplate: '%s'
description: 'Как создавать модули Nuxt для интеграции, расширения и доработки приложений.'
navigation: false
surround: false
---

Системы [конфигурации](/docs/4.x/api/nuxt-config) и [хуков](/docs/4.x/guide/going-further/hooks) Nuxt позволяют настраивать любую часть фреймворка и подключать интеграции (Vue-плагины, CMS, серверные маршруты, компоненты, логирование и т.д.).

**Модули Nuxt** — функции, которые по очереди выполняются при запуске `nuxt dev` или сборке `nuxt build`. С помощью модулей можно упаковать своё решение в npm-пакет, тестировать и распространять его без лишнего кода в проекте и без изменений в самом Nuxt.

::card-group{class="sm:grid-cols-1"}
  ::card{icon="i-lucide-rocket" title="Первый модуль" to="/docs/4.x/guide/modules/getting-started"}
  Создайте первый модуль по официальному стартовому шаблону.
  ::
  ::card{icon="i-lucide-box" title="Структура модуля" to="/docs/4.x/guide/modules/module-anatomy"}
  Как устроены модули Nuxt и как их описывать.
  ::
  ::card{icon="i-lucide-code" title="Плагины, компоненты и другое" to="/docs/4.x/guide/modules/recipes-basics"}
  Подключение плагинов, компонентов, композаблов и серверных маршрутов из модуля.
  ::
  ::card{icon="i-lucide-layers" title="Хуки и расширение типов" to="/docs/4.x/guide/modules/recipes-advanced"}
  Хуки жизненного цикла, виртуальные файлы и TypeScript в модулях.
  ::
  ::card{icon="i-lucide-test-tube" title="Тестирование модуля" to="/docs/4.x/guide/modules/testing"}
  Unit-, интеграционные и E2E-тесты для модуля Nuxt.
  ::
  ::card{icon="i-lucide-medal" title="Лучшие практики" to="/docs/4.x/guide/modules/best-practices"}
  Рекомендации по производительным и поддерживаемым модулям.
  ::
  ::card{icon="i-lucide-globe" title="Публикация и экосистема" to="/docs/4.x/guide/modules/ecosystem"}
  Публикация модуля в npm и экосистема Nuxt.
  ::
::
