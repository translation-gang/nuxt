---
title: 'updateAppConfig'
description: 'Обновление app config во время выполнения.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
Обновляет [`app.config`](/docs/4.x/directory-structure/app/app-config) глубоким присваиванием. Существующие (вложенные) свойства сохраняются.
::

## Использование

```js
import { updateAppConfig, useAppConfig } from '#imports'

const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }
updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/4.x/directory-structure/app/app-config"}
