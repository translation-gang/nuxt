---
title: "nuxi upgrade"
description: Команда upgrade обновляет Nuxt до последней версии.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/upgrade.ts
    size: xs
---

```bash [Terminal]
npx nuxi upgrade [--force|-f]
```

Команда `upgrade` обновляет Nuxt до последней версии.

Параметр      | По умолчанию | Описание
--------------|--------------|------------------------------------------------------
`--force, -f` | `false`      | Удаляет `node_modules` и `.lock-файл` перед обновлением.
