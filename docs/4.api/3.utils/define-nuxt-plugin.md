---
title: "defineNuxtPlugin"
description: defineNuxtPlugin() — хелпер для создания плагинов Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` — хелпер для плагинов Nuxt с расширенными возможностями и типобезопасностью. Утилита приводит разные форматы плагинов к единой структуре в системе плагинов Nuxt.

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

**plugin**: плагин задаётся двумя способами:
1. **Функция-плагин**: принимает экземпляр [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) и может вернуть промис с объектом, в том числе с полем [`provide`](/docs/4.x/directory-structure/app/plugins#providing-helpers), чтобы пробросить хелпер в [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface).
2. **Объект-плагин**: объект с настройками поведения: `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, `env`.

| Свойство    | Тип                                    | Обязательное | Описание                                                                                                                                                            |
|-------------|----------------------------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`      | `string`                               | `false`      | Необязательное имя плагина: отладка и зависимости.                                                                                                                     |
| `enforce`   | `'pre'` \| `'default'` \| `'post'`     | `false`      | Когда выполнять плагин относительно других.                                                                                                                          |
| `dependsOn` | `string[]`                             | `false`      | Имена плагинов, от которых зависит этот; порядок выполнения.                                                                                                         |
| `order`     | `number`                               | `false`      | Более тонкий контроль порядка; только для продвинутых сценариев. **Переопределяет `enforce` и участвует в сортировке плагинов.**                                       |
| `parallel`  | `boolean`                              | `false`      | Выполнять ли плагин параллельно с другими параллельными плагинами.                                                                                                    |
| `setup`     | `Plugin<T>`{lang="ts"}                 | `false`      | Основная функция плагина, эквивалент функции-плагина.                                                                                                                |
| `hooks`     | `Partial<RuntimeNuxtHooks>`{lang="ts"} | `false`      | Хуки рантайма приложения Nuxt для регистрации напрямую.                                                                                                              |
| `env`       | `{ islands?: boolean }`{lang="ts"}     | `false`      | Установите `false`, если плагин не должен запускаться при рендере только серверных или island-компонентов.                                                            |

:video-accordion{title="Видео Александра Лихтера об объектном синтаксисе плагинов Nuxt" videoId="2aXZyXB1QGQ"}

## Примеры

### Базовое использование

Простой плагин с глобальной функциональностью:

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // Add a global method
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`,
    },
  }
})
```

### Плагин в виде объекта

Объектный синтаксис с расширенной конфигурацией:

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // Plugin setup logic
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
