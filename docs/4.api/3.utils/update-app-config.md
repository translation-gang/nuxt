---
title: 'updateAppConfig'
description: "Обновление App Config в runtime."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
Обновляет [`app.config`](/docs/4.x/directory-structure/app/app-config) через глубокое слияние; существующие (вложенные) свойства сохраняются.
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
