---
title: useRuntimeHook
description: Регистрирует в приложении runtime-хук и гарантирует, что он будет должным образом удален при уничтожении области видимости.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
Этот композабл доступен в Nuxt версии 3.14+.
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## Использование

### Параметры

- `name`: Имя runtime-хука для регистрации. Вы можете ознакомиться с полным списком [runtime-хуков Nuxt здесь](/docs/api/advanced/hooks#app-hooks-runtime).
- `fn`: Функция обратного вызова, выполняемая при срабатывании хука. Сигнатура функции зависит от имени хука.

### Возвращаемые значения

Композабл не возвращает значение, но он автоматически отменяет регистрацию хука, когда область действия компонента уничтожается.

## Пример

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// Регистрирует хук, который запускается каждый раз при предварительной загрузке ссылки, но который будет
// автоматически очищен (и не будет вызываться снова) при размонтировании компонента
useRuntimeHook('link:prefetch', (link) => {
  console.log('Предзагрузка', link)
})
</script>
```
