---
title: useHead
description: useHead customizes the head properties of individual pages of your Nuxt app.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useHead.ts
    size: xs
---

The [`useHead`](/docs/api/composables/use-head) composable function allows you to manage your head tags in a programmatic and reactive way, powered by [Unhead](https://unhead.unjs.io). If the data comes from a user or other untrusted source, we recommend you check out [`useHeadSafe`](/docs/api/composables/use-head-safe).

:read-more{to="/docs/getting-started/seo-meta"}

## Тип

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

Below are the non-reactive types for [`useHead`](/docs/api/composables/use-head) .

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

See [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/schema.ts) for more detailed types.

::note
The properties of `useHead` can be dynamic, accepting `ref`, `computed` and `reactive` properties. `meta` parameter can also accept a function returning an object to make the entire object reactive.
::

## Параметры

### `meta`

**Тип**: `MetaObject`

An object accepting the following head metadata:

- `meta`: Each element in the array is mapped to a newly-created `<meta>` tag, where object properties are mapped to the corresponding attributes.
  - **Тип**: `Array<Record<string, any>>`
- `link`: Each element in the array is mapped to a newly-created `<link>` tag, where object properties are mapped to the corresponding attributes.
  - **Тип**: `Array<Record<string, any>>`
- `style`: Each element in the array is mapped to a newly-created `<style>` tag, where object properties are mapped to the corresponding attributes.
  - **Тип**: `Array<Record<string, any>>`
- `script`: Each element in the array is mapped to a newly-created `<script>` tag, where object properties are mapped to the corresponding attributes.
  - **Тип**: `Array<Record<string, any>>`
- `noscript`: Each element in the array is mapped to a newly-created `<noscript>` tag, where object properties are mapped to the corresponding attributes.
  - **Тип**: `Array<Record<string, any>>`
- `titleTemplate`: Configures dynamic template to customize the page title on an individual page.
  - **Тип**: `string` | `((title: string) => string)`
- `title`: Sets static page title on an individual page.
  - **Тип**: `string`
- `bodyAttrs`: Sets attributes of the `<body>` tag. Each object property is mapped to the corresponding attribute.
  - **Тип**: `Record<string, any>`
- `htmlAttrs`: Sets attributes of the `<html>` tag. Each object property is mapped to the corresponding attribute.
  - **Тип**: `Record<string, any>`
