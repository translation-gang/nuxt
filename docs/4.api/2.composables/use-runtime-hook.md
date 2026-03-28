---
title: 'useRuntimeHook'
description: 'Регистрация runtime-хука в приложении с автоматической отпиской при размонтировании компонента.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.14+.
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## Использование

### Параметры

- `name`: имя runtime-хука. Полный список — в разделе [runtime-хуки приложения](/docs/3.x/api/advanced/hooks#app-hooks-runtime).
- `fn`: обработчик; сигнатура зависит от имени хука.

### Возвращаемое значение

Композабл ничего не возвращает; подписка снимается автоматически при размонтировании компонента.

## Пример

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// Хук при каждой предзагрузке ссылки; после размонтирования компонента обработчик больше не вызывается
useRuntimeHook('link:prefetch', (link) => {
  console.log('Предзагрузка', link)
})
</script>
```
