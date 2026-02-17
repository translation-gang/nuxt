---
title: "defineNuxtPlugin"
description: "Хелпер для создания Nuxt-плагинов."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` — хелпер для создания Nuxt-плагинов с улучшенной типизацией. Приводит разные форматы плагинов к единой структуре, совместимой с системой плагинов Nuxt.

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
})
```

:read-more{to="/docs/4.x/directory-structure/app/plugins#creating-plugins"}

## Тип

```ts [Signature]
export function defineNuxtPlugin<T extends Record<string, unknown>> (plugin: Plugin<T> | ObjectPlugin<T>): Plugin<T> & ObjectPlugin<T>

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

**plugin**: плагин задаётся одним из двух способов:
1. **Функция**: получает экземпляр [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface), может вернуть объект с [`provide`](/docs/4.x/directory-structure/app/plugins#providing-helpers) для добавления хелперов в NuxtApp.
2. **Объект**: свойства `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, `env` для настройки поведения.

| Свойство   | Тип                                    | Обязательный | Описание |
|------------|----------------------------------------|--------------|----------|
| `name`     | `string`                               | нет          | Имя плагина (отладка, зависимости). |
| `enforce`  | `'pre'` \| `'default'` \| `'post'`     | нет          | Когда выполнять плагин относительно других. |
| `dependsOn`| `string[]`                             | нет          | Имена плагинов, от которых зависит этот. Задаёт порядок выполнения. |
| `order`     | `number`                               | нет          | Тонкая настройка порядка. **Переопределяет `enforce` при сортировке.** Для продвинутых. |
| `parallel` | `boolean`                              | нет          | Выполнять параллельно с другими помеченными плагинами. |
| `setup`    | `Plugin<T>`                            | нет          | Основная функция плагина (как при передаче функции). |
| `hooks`    | `Partial<RuntimeNuxtHooks>`            | нет          | Хуки runtime Nuxt для регистрации. |
| `env`      | `{ islands?: boolean }`                | нет          | `false` — не запускать плагин при рендере server-only и island-компонентов. |

:video-accordion{title="Видео Alexander Lichter про объектный синтаксис плагинов Nuxt" videoId="2aXZyXB1QGQ"}

## Примеры

### Базовое использование

Плагин с глобальным хелпером:

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`,
    },
  }
})
```

### Плагин в виде объекта

Объектный синтаксис с расширенной настройкой:

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    const data = await $fetch('/api/config')

    return {
      provide: {
        config: data,
      },
    }
  },
  hooks: {
    'app:created' () {
      console.log('App created!')
    },
  },
})
```
