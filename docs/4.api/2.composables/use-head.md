---
title: useHead
description: 'Композабл useHead задаёт содержимое `<head>` отдельных страниц приложения Nuxt.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Композабл [`useHead`](/docs/3.x/api/composables/use-head) позволяет управлять тегами в `<head>` программным и реактивным способом, опираясь на [Unhead](https://unhead.unjs.io). Если данные поступают от пользователя или из другого ненадёжного источника, мы рекомендуем ознакомиться с композаблом [`useHeadSafe`](/docs/3.x/api/composables/use-head-safe).

:read-more{to="/docs/3.x/getting-started/seo-meta"}

## Тип

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

Ниже приведены нереактивные типы для [`useHead`](/docs/3.x/api/composables/use-head).

```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}
```

Более подробную информацию о типах см. в [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts).

::note
Свойства `useHead` могут быть динамическими, принимая свойства `ref`, `computed` и `reactive`. Параметр `meta` может также принимать функцию, возвращающую объект, чтобы сделать весь объект реактивным.
::

## Параметры

### `meta`

**Тип**: `MetaObject`

Объект с метаданными для `<head>`:

- `meta`: Каждый элемент массива сопоставляется с вновь созданным тегом `<meta>`, где свойства объекта сопоставляются с соответствующими атрибутами.
  - **тип**: `Array<Record<string, any>>`.
- `link`: Каждый элемент массива сопоставляется с вновь созданным тегом `<link>`, где свойства объекта сопоставляются с соответствующими атрибутами.
  - **тип**: `Array<Record<string, any>>`.
- `style`: Каждый элемент массива сопоставляется с вновь созданным тегом `<style>`, где свойства объекта сопоставляются с соответствующими атрибутами.
  - **тип**: `Array<Record<string, any>>`.
- `script`: Каждый элемент массива сопоставляется с вновь созданным тегом `<script>`, где свойства объекта сопоставляются с соответствующими атрибутами.
  - **тип**: `Array<Record<string, any>>`.
- `noscript`: Каждый элемент массива сопоставляется с вновь созданным тегом `<noscript>`, где свойства объекта сопоставляются с соответствующими атрибутами.
  - **тип**: `Array<Record<string, any>>`.
- `titleTemplate`: Конфигурирует динамический шаблон для настройки заголовка страницы на отдельной странице.
  - **тип**: `string` | `((title: string) => string)`.
- `title`: Устанавливает статический заголовок страницы на отдельной странице.
  - **тип**: `string`
- `bodyAttrs`: Задаёт атрибуты тега `<body>`. Каждое свойство объекта сопоставляется с соответствующим атрибутом.
  - **тип**: `Record<string, any>`.
- `htmlAttrs`: Задаёт атрибуты тега `<html>`. Каждое свойство объекта сопоставляется с соответствующим атрибутом.
  - **тип**: `Record<string, any>`.
