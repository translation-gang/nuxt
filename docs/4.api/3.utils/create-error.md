---
title: 'createError'
description: "Создание объекта ошибки с дополнительными метаданными."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Функция создаёт объект ошибки с дополнительными метаданными. Используется и во Vue-части приложения, и в Nitro (API); объект предназначен для выброса через `throw`.

## Параметры

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }` — строка или объект. Строка задаёт `message`, `status` по умолчанию `500`. В объекте можно задать `status`, `message` и другие поля ошибки.

## Во Vue-приложении

При выбросе ошибки, созданной через `createError`:

- на сервере отображается полноэкранная страница ошибки (сброс — `clearError`);
- на клиенте выбрасывается некритичная ошибка для обработки. Чтобы показать полноэкранную страницу ошибки на клиенте, передайте `fatal: true`.

### Пример

```vue [app/pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: 'Страница не найдена' })
}
</script>
```

## В API-маршрутах

`createError` используется для вызова обработки ошибок в серверных API-маршрутах.

### Пример

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: 'Страница не найдена',
  })
})
```

В API-маршрутах лучше передавать объект с кратким `statusText`: он доступен на клиенте. `message`, переданный в `createError` в API, на клиент не попадает. Дополнительные данные можно передать через свойство `data`. Не подставляйте в сообщение динамический пользовательский ввод — это может быть небезопасно.

:read-more{to="/docs/4.x/getting-started/error-handling"}
