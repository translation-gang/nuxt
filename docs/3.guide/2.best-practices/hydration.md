---
navigation.title: 'Nuxt и гидрация'
title: Nuxt и гидрация
description: Почему важно исправлять проблемы гидрации
---

При разработке могут появляться предупреждения о гидрации. Не игнорируйте их.

# Почему их важно исправлять?

Рассинхрон при гидрации — не просто предупреждение, а признак серьёзных проблем, которые могут сломать приложение:

## Влияние на производительность

- **Увеличение времени до интерактивности**: ошибки гидрации заставляют Vue перерисовывать всё дерево компонентов, из‑за чего приложение дольше становится интерактивным
- **Плохой UX**: пользователь может видеть мигание контента или неожиданные сдвиги верстки

## Проблемы с работой приложения

- **Сломанная интерактивность**: обработчики событий могут не подключаться, кнопки и формы перестают работать
- **Несогласованное состояние**: то, что видит пользователь, может не совпадать с состоянием приложения
- **Проблемы с SEO**: поисковики могут проиндексировать другой контент, чем видят пользователи

# Как их обнаружить

## Предупреждения в консоли разработки

Vue выводит предупреждения о рассинхроне гидрации в консоль браузера в режиме разработки:

![Скриншот предупреждения Vue о рассинхроне гидрации в консоли](/assets/docs/best-practices/vue-console-hydration.png)

# Типичные причины

## API только для браузера в серверном контексте

**Проблема**: использование API браузера при серверном рендеринге.

```html
<template>
  <div>Тема: {{ userTheme }}</div>
</template>

<script setup>
// Вызовет рассинхрон гидрации!
// localStorage нет на сервере!
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**Решение**: используйте [`useCookie`](/docs/4.x/api/composables/use-cookie):

```html
<template>
  <div>Тема: {{ userTheme }}</div>
</template>

<script setup>
// Работает и на сервере, и на клиенте
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

## Разные данные на сервере и клиенте

**Проблема**: данные отличаются на сервере и клиенте.

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**Решение**: используйте состояние, совместимое с SSR:

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

## Условный рендеринг по состоянию клиента

**Проблема**: условия, зависящие только от клиента, при SSR.

```html
<template>
  <div v-if="window?.innerWidth > 768">
    Контент для десктопа
  </div>
</template>
```

**Решение**: медиа-запросы или обработка на клиенте:

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">Контент для десктопа</div>
    <div class="md:hidden">Контент для мобильных</div>
  </div>
</template>
```

## Сторонние библиотеки с побочными эффектами

**Проблема**: библиотеки, меняющие DOM или зависящие от браузера (часто бывает с тег-менеджерами).

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**Решение**: инициализируйте библиотеки после завершения гидрации:

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

## Динамический контент по времени

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

**Решение**: компонент [`NuxtTime`](/docs/4.x/api/components/nuxt-time) или обработка на клиенте:

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
        Привет!
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('Привет!')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? 'Доброе утро' : 'Добрый день'
})
</script>
```

## Кратко

1. **Используйте композаблы, совместимые с SSR**: [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useState`](/docs/4.x/api/composables/use-state)
2. **Оборачивайте код только для клиента**: компонент [`ClientOnly`](/docs/4.x/api/components/client-only) для контента, зависящего от браузера
3. **Одинаковые источники данных**: данные на сервере и клиенте должны совпадать
4. **Без побочных эффектов в setup**: переносите код, зависящий от браузера, в `onMounted`

::tip
Подробнее о рассинхроне гидрации — в [документации Vue по SSR](https://vuejs.org/guide/scaling-up/ssr#hydration-mismatch).
::
