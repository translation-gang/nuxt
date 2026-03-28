---
title: 'Руководство для авторов модулей'
titleTemplate: '%s'
description: 'Как создать модуль Nuxt для интеграции, расширения или доработки приложений.'
navigation: false
surround: false
---

[Конфигурация](/docs/3.x/api/nuxt-config) и [хуки](/docs/3.x/guide/going-further/hooks) Nuxt позволяют настраивать почти всё и добавлять интеграции: плагины Vue, CMS, серверные маршруты, компоненты, логирование и т.д.

**Модули Nuxt** — это функции, которые последовательно выполняются при `nuxt dev` и `nuxt build`. Они упаковывают решения в npm-пакеты без лишнего шаблонного кода в проекте и без правок ядра Nuxt.

::card-group{class="sm:grid-cols-1"}
  ::card{icon="i-lucide-rocket" title="Первый модуль" to="/docs/3.x/guide/modules/getting-started"}
  Создайте модуль на официальном стартовом шаблоне.
  ::
  ::card{icon="i-lucide-box" title="Структура модуля" to="/docs/3.x/guide/modules/module-anatomy"}
  Как устроен модуль и как его описывать.
  ::
  ::card{icon="i-lucide-code" title="Плагины, компоненты и не только" to="/docs/3.x/guide/modules/recipes-basics"}
  Подключение плагинов, компонентов, композаблов и серверных маршрутов из модуля.
  ::
  ::card{icon="i-lucide-layers" title="Хуки и типы" to="/docs/3.x/guide/modules/recipes-advanced"}
  Жизненный цикл, виртуальные файлы и объявления TypeScript.
  ::
  ::card{icon="i-lucide-test-tube" title="Тестирование" to="/docs/3.x/guide/modules/testing"}
  Юнит-, интеграционные и E2E-тесты модуля.
  ::
  ::card{icon="i-lucide-medal" title="Лучшие практики" to="/docs/3.x/guide/modules/best-practices"}
  Производительность и поддерживаемость модулей.
  ::
  ::card{icon="i-lucide-globe" title="Публикация и экосистема" to="/docs/3.x/guide/modules/ecosystem"}
  npm и каталог модулей Nuxt.
  ::
::
