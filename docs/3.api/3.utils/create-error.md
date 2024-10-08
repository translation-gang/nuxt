---
title: 'createError'
description: Создает объект ошибки с дополнительными мета-данными.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Эту функцию можно использовать для создания объекта ошибки с дополнительными мета-данными. Она может использоваться как во Vue, так и в Nitro частях вашего приложения и предназначена для генерации исключений.

## Параметры

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

В функцию `createError` можно передать либо строку, либо объект. Если вы передадите строку, она будет использована в качестве сообщения об ошибке  `message`, а код состояния `statusCode` по умолчанию будет равен `500`. Если вы передадите объект, вы сможете задать несколько свойств ошибки, таких как `statusCode`, `message` и другие свойства ошибки.

## В приложении Vue

Если вы генерируете исключение, созданное с помощью `createError`:

- на сервере это приведет к отображению полноэкранной страницы ошибки, которую можно очистить с помощью `clearError`.
- на клиенте это приведет к генерации нефатальной ошибки для вашей обработки. Если вам нужно вызвать полноэкранную страницу ошибки, то вы можете сделать это, установив `fatal: true`.

### Пример

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
}
</script>
```

## В API-маршрутах

Используйте `createError` для активации обработки ошибок в API-маршрутах на сервере.

### Пример

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Страница не найдена'
  })
})
```

В API-маршрутах рекомендуется использовать `createError`, передавая объект с коротким `statusMessage`, потому что он может быть получен на клиенте. В противном случае сообщение `message`, переданное в `createError` в API-маршруте, не будет распространяться на клиенте. Альтернативно, вы можете использовать свойство `data`, чтобы передать данные на клиент. В любом случае, всегда старайтесь избегать размещения динамического ввода пользователя в сообщении, чтобы избежать потенциальных проблем безопасности.

:read-more{to="/docs/getting-started/error-handling"}
