---
title: 'createError'
description: Создаёт объект ошибки с дополнительными метаданными.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Эта функция создаёт объект ошибки с дополнительными метаданными. Её можно использовать и во Vue-части приложения, и в Nitro; её предполагается выбрасывать (`throw`).

## Параметры

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }`

В `createError` можно передать строку или объект. Строка станет полем `message` ошибки, а `status` по умолчанию будет `500`. В объекте можно задать `status`, `message` и другие свойства ошибки.

## Во Vue-приложении

Если выбросить ошибку, созданную через `createError`:

- на сервере откроется полноэкранная страница ошибки, которую можно сбросить через `clearError`;
- на клиенте это будет некритичная ошибка для вашей обработки. Чтобы снова показать полноэкранную страницу ошибки, укажите `fatal: true`.

### Пример

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}
</script>
```

## В API-маршрутах

Используйте `createError`, чтобы включить обработку ошибок в серверных API-маршрутах.

### Пример

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
})
```

В API-маршрутах рекомендуется передавать в `createError` объект с коротким `statusText`: так его проще использовать на клиенте. Иначе `message` из API-маршрута может не дойти до клиента. Альтернатива — свойство `data` для передачи данных клиенту. В любом случае не подставляйте в сообщение произвольный пользовательский ввод, чтобы снизить риски для безопасности.

:read-more{to="/docs/3.x/getting-started/error-handling"}
