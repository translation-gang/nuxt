---
title: useRuntimeHook
description: 'Регистрирует runtime-хук в приложении Nuxt и гарантирует его очистку при уничтожении области видимости.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.14+.
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks> (
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never,
): void
```

## Использование

### Параметры

- `name`: имя runtime-хука для регистрации. Полный список — [runtime-хуки Nuxt](/docs/4.x/api/advanced/hooks#app-hooks-runtime).
- `fn`: колбэк при срабатывании хука. Сигнатура зависит от имени хука.

### Возвращаемое значение

Композабл ничего не возвращает; хук автоматически снимается при уничтожении области видимости компонента.

## Пример

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// хук при каждом prefetch ссылки; при размонтировании компонента автоматически снимается
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
