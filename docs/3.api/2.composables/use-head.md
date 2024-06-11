---
title: useHead
description: useHead настраивает свойства заголовка отдельных страниц вашего приложения Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useHead.ts
    size: xs
---

Композабл [`useHead`](/docs/api/composables/use-head) позволяет управлять тегами head программным и реактивным способом, опираясь на [Unhead](https://unhead.unjs.io). Если данные поступают от пользователя или из другого ненадежного источника, мы рекомендуем ознакомиться с композаблом [`useHeadSafe`](/docs/api/composables/use-head-safe).

:read-more{to="/docs/getting-started/seo-meta"}

## Тип

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

Ниже приведены нереактивные типы для [`useHead`](/docs/api/composables/use-head).

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

Более подробную информацию о типах см. в [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/schema.ts).

::note
Свойства `useHead` могут быть динамическими, принимая свойства `ref`, `computed` и `reactive`. Параметр `meta` может также принимать функцию, возвращающую объект, чтобы сделать весь объект реактивным.
::

## Параметры

### `meta`

**Тип**: `MetaObject`

Объект, принимающий следующие мета-данные head:

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
