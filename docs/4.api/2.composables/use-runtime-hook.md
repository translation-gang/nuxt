---
title: useRuntimeHook
description: Регистрирует хук времени выполнения в приложении Nuxt и снимает регистрацию при уничтожении области видимости.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
Этот композабл доступен в Nuxt v3.14+.
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks> (
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never,
): void
```

## Использование

### Параметры

- `name`: Имя хука времени выполнения. Полный список — в [хуках Nuxt во время выполнения](/docs/4.x/api/advanced/hooks#app-hooks-runtime).
- `fn`: Колбэк при срабатывании хука. Сигнатура зависит от имени хука.

### Возвращаемое значение

Композабл ничего не возвращает; хук автоматически снимается с регистрации при уничтожении области видимости компонента.

## Пример

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// Хук при каждом префетче ссылки; при размонтировании компонента
// регистрация снимается и колбэк больше не вызывается
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
