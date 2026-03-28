---
title: "defineNuxtPlugin"
description: defineNuxtPlugin() — вспомогательная функция для создания плагинов Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` — вспомогательная функция для плагинов Nuxt с расширенными возможностями и типобезопасностью. Приводит разные форматы плагинов к единой структуре, совместимой с системой плагинов Nuxt.

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // работа с nuxtApp
})
```

:read-more{to="/docs/3.x/directory-structure/plugins#creating-plugins"}

## Тип

```ts
defineNuxtPlugin<T extends Record<string, unknown>>(plugin: Plugin<T> | ObjectPlugin<T>): Plugin<T> & ObjectPlugin<T>

type Plugin<T> = (nuxt: NuxtApp) => Promise<void> | Promise<{ provide?: T }> | void | { provide?: T }

interface ObjectPlugin<T> {
  name?: string
  enforce?: 'pre' | 'default' | 'post'
  dependsOn?: string[]
  order?: number
  parallel?: boolean
  setup?: Plugin<T>
  hooks?: Partial<RuntimeNuxtHooks>
  env?: {
    islands?: boolean
  }
}
```

## Параметры

**plugin**: плагин задаётся двумя способами:
1. **Плагин-функция**: функция, получающая экземпляр [`NuxtApp`](/docs/3.x/guide/going-further/internals#the-nuxtapp-interface); может вернуть промис с объектом и полем [`provide`](/docs/3.x/directory-structure/plugins#providing-helpers), чтобы передать во [`NuxtApp`](/docs/3.x/guide/going-further/internals#the-nuxtapp-interface) вспомогательные функции или другие значения.
2. **Объектный плагин**: объект с полями для настройки плагина: `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, `env` и др.

| Свойство           | Тип                                                                 | Обязательно | Описание                                                                                                     |
| ------------------ | -------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `name` | `string` | `false` | Необязательное имя плагина — удобно для отладки и управления зависимостями. |
| `enforce` | `'pre'` \| `'default'` \| `'post'` | `false` | Задаёт порядок запуска относительно других плагинов. |
| `dependsOn` | `string[]` | `false` | Имена плагинов, от которых зависит этот; задаёт порядок выполнения. |
| `order` | `number` | `false` | Точная сортировка плагинов; только для продвинутых сценариев. **Переопределяет `enforce` при сортировке.** |
| `parallel` | `boolean` | `false` | Запускать ли плагин параллельно с другими помеченными как параллельные. |
| `setup` | `Plugin<T>`{lang="ts"}  | `false` | Основная функция плагина — эквивалент «функционального» плагина. |
| `hooks` | `Partial<RuntimeNuxtHooks>`{lang="ts"}  | `false` | Хуки runtime-приложения Nuxt для прямой регистрации. |
| `env` | `{ islands?: boolean }`{lang="ts"}  | `false` | Укажите `false`, чтобы плагин не выполнялся при рендере только серверных или island-компонентов. |

:video-accordion{title="Видео Alexander Lichter об объектном синтаксисе плагинов Nuxt" videoId="2aXZyXB1QGQ"}

## Примеры

### Базовое использование

Ниже — простой плагин, добавляющий глобальную функциональность:

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // глобальный метод
  return {
    provide: {
      hello: (name: string) => `Привет, ${name}!`
    }
  }
})
```

### Плагин в объектном синтаксисе

Ниже — объектный синтаксис с дополнительной настройкой:

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // логика инициализации плагина
    const data = await $fetch('/api/config')
    
    return {
      provide: {
        config: data
      }
    }
  },
  hooks: {
    'app:created'() {
      console.log('Приложение создано')
    }
  },
})
```
