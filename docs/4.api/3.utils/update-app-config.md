---
title: 'updateAppConfig'
description: 'Обновляет конфигурацию приложения в процессе работы (без перезапуска).'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
Обновляет [`app.config`](/docs/3.x/directory-structure/app-config) с помощью глубокого присваивания. Существующие (вложенные) свойства будут сохранены.
::

## Использование

```js
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/3.x/directory-structure/app-config"}
