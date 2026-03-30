---
navigation.title: 'Nuxt и гидратация'
title: Nuxt и гидратация
description: Зачем важно устранять проблемы гидратации
---

В разработке часто встречаются предупреждения гидратации. Их не стоит игнорировать.

## Зачем это исправлять?

Расхождения при гидратации — не просто предупреждения; это признак серьёзных проблем:

### Влияние на производительность

- **Дольше до интерактивности**: ошибки гидратации заставляют Vue перерисовывать дерево компонентов
- **Хуже UX**: мигание контента или неожиданные сдвиги вёрстки

### Проблемы с поведением

- **Ломается интерактивность**: обработчики могут не привязаться — кнопки и формы не работают
- **Расхождение состояния**: то, что видит пользователь, и то, что «думает» приложение, расходятся
- **SEO**: в индекс может попасть другой контент, чем у пользователя

## Как обнаружить

### Предупреждения в консоли разработки

Vue логирует несовпадения гидратации в консоли браузера в dev:

![Предупреждение Vue о несовпадении гидратации в консоли](/assets/docs/best-practices/vue-console-hydration.png)

## Типичные причины

### Браузерные API на сервере

**Проблема**: браузерные API во время SSR.

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
// Это вызовет рассогласование гидратации!
// localStorage нет на сервере!
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**Решение**: [`useCookie`](/docs/4.x/api/composables/use-cookie):

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
// Работает и на сервере, и на клиенте
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

### Разные данные

**Проблема**: разный результат на сервере и клиенте.

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**Решение**: SSR-friendly состояние:

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

### Условный рендер по состоянию клиента

**Проблема**: условия только для клиента во время SSR.

```html
<template>
  <div v-if="window?.innerWidth > 768">
    Desktop content
  </div>
</template>
```

**Решение**: медиазапросы или логика на клиенте:

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">Desktop content</div>
    <div class="md:hidden">Mobile content</div>
  </div>
</template>
```

### Сторонние библиотеки с побочными эффектами

**Проблема**: библиотеки, меняющие DOM или зависящие от браузера (часто тег-менеджеры).

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**Решение**: инициализация после гидратации:

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

### Динамика от времени

**Проблема**: контент зависит от текущего времени.

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : 'Good afternoon'
</script>
```

**Решение**: компонент [`NuxtTime`](/docs/4.x/api/components/nuxt-time) или только клиент:

```html
<template>
  <div>
    <NuxtTime :date="new Date()" format="HH:mm" />
  </div>
</template>
```

```html
<template>
  <div>
    <ClientOnly>
      {{ greeting }}
      <template #fallback>
        Hello!
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('Hello!')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? 'Good morning' : 'Good afternoon'
})
</script>
```

## Кратко

1. **SSR-friendly композаблы**: [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useState`](/docs/4.x/api/composables/use-state)
2. **Только клиент**: [`ClientOnly`](/docs/4.x/api/components/client-only) для браузер-специфичного контента
3. **Одинаковые данные**: сервер и клиент должны опираться на одни и те же источники
4. **Без побочных эффектов в setup**: браузерный код — в `onMounted`

::tip
Подробнее о несовпадении гидратации при SSR — в [документации Vue](https://vuejs.org/guide/scaling-up/ssr#hydration-mismatch).
::
