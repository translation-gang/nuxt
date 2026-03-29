---
navigation.title: 'Nuxt и гидратация'
title: Nuxt и гидратация
description: Почему важно устранять проблемы гидратации
---

В разработке вы можете столкнуться с ошибками гидратации. Не игнорируйте эти предупреждения.

## Зачем их исправлять?

Расхождения при гидратации — не просто предупреждения: это признак серьёзных проблем, которые могут сломать приложение:

### Влияние на производительность

- **Дольше до интерактивности**: ошибки гидратации заставляют Vue перерисовывать всё дерево компонентов, из‑за чего приложение дольше становится интерактивным.
- **Плохой пользовательский опыт**: пользователь может видеть мигание контента или неожиданные сдвиги вёрстки.

### Проблемы с поведением

- **Ломается интерактивность**: обработчики могут не навеситься — кнопки и формы перестают работать.
- **Рассинхрон состояния**: то, что видит пользователь, и то, что «думает» приложение, расходятся.
- **Проблемы с поисковой оптимизацией**: поисковик может индексировать не то, что видит пользователь.

## Как обнаружить

### Предупреждения в консоли разработки

Vue выводит предупреждения о несовпадении гидратации в консоли браузера в режиме разработки:

![Предупреждение Vue о несовпадении гидратации в консоли браузера](/assets/docs/best-practices/vue-console-hydration.png)

## Типичные причины

### Браузерные API в контексте сервера

**Проблема**: использование API, доступных только в браузере, во время SSR.

```html
<template>
  <div>Предпочтение пользователя: {{ userTheme }}</div>
</template>

<script setup>
// вызовет несовпадение при гидратации!
// на сервере нет localStorage
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**Решение**: можно использовать [`useCookie`](/docs/3.x/api/composables/use-cookie):

```html
<template>
  <div>Предпочтение пользователя: {{ userTheme }}</div>
</template>

<script setup>
// работает и на сервере, и на клиенте
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

### Разные данные на сервере и клиенте

**Проблема**: данные на сервере и клиенте не совпадают.

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**Решение**: состояние, дружественное к SSR:

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

### Условный рендер по состоянию клиента

**Проблема**: условия, зависящие только от клиента, при SSR.

```html
<template>
  <div v-if="window?.innerWidth > 768">
    Контент для десктопа
  </div>
</template>
```

**Решение**: медиазапросы или обработка только на клиенте:

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">Контент для десктопа</div>
    <div class="md:hidden">Контент для мобильных</div>
  </div>
</template>
```

### Сторонние библиотеки с побочными эффектами

**Проблема**: библиотеки, меняющие DOM или завязанные на браузер (часто — менеджеры тегов).

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**Решение**: инициализировать после завершения гидратации:

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

### Динамический контент по времени

**Проблема**: контент зависит от текущего времени.

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Доброе утро' : 'Добрый день'
</script>
```

**Решение**: компонент [`NuxtTime`](/docs/3.x/api/components/nuxt-time) или логика на клиенте:

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
        Здравствуйте!
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('Здравствуйте!')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? 'Доброе утро' : 'Добрый день'
})
</script>
```

## Кратко

1. **Композаблы, дружественные к SSR**: [`useFetch`](/docs/3.x/api/composables/use-fetch), [`useAsyncData`](/docs/3.x/api/composables/use-async-data), [`useState`](/docs/3.x/api/composables/use-state).
2. **Код только для браузера**: компонент [`ClientOnly`](/docs/3.x/api/components/client-only).
3. **Одинаковые источники данных**: сервер и клиент должны получать согласованные данные.
4. **Без побочных эффектов в setup**: браузерный код — в `onMounted`.

::tip
Подробнее о несовпадении гидратации при SSR — в [документации Vue](https://ru.vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch).
::
