---
title: 'createError'
description: Создаёт объект ошибки с дополнительными метаданными.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Функция создаёт объект ошибки с дополнительными метаданными. Её можно использовать в части Vue и в части Nitro приложения; предполагается, что результат **выбрасывается** (`throw`).

## Параметры

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }`

Можно передать строку или объект. Строка станет `message` ошибки, `status` по умолчанию будет `500`. В объекте задаются `status`, `message` и другие поля ошибки.

## Во Vue-приложении

Если выбросить ошибку, созданную через `createError`:

- на сервере откроется полноэкранная страница ошибки, которую можно снять через `clearError`;
- на клиенте по умолчанию будет некритичная ошибка для вашей обработки. Чтобы показать полноэкранную страницу ошибки, задайте `fatal: true`.

### Пример

```vue [app/pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}
</script>
```

## В API-маршрутах

Используйте `createError` для обработки ошибок в серверных API-маршрутах.

### Пример

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
})
```

В API-маршрутах рекомендуется передавать объект с коротким `statusText`: так его проще прочитать на клиенте. Иначе `message` из `createError` в API-маршруте может не дойти до клиента. Альтернатива — свойство `data` для передачи данных клиенту. В любом случае избегайте динамического пользовательского ввода в сообщениях из соображений безопасности.

:read-more{to="/docs/4.x/getting-started/error-handling"}
