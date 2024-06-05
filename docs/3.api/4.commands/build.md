---
title: "nuxi build"
description: "Собирает ваше приложение Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build.ts
    size: xs
---

```bash [Terminal]
npx nuxi build [--prerender] [--preset] [--dotenv] [--log-level] [rootDir]
```

Команда `build` создает директорию `.output` со всем вашим приложением, сервером и зависимостями, готовыми для продакшена.

Параметр      | По умолчанию | Описание
--------------|--------------|---------------------------------------------------------------------------------------------------------------------
`rootDir`     | `.`          | Корневая директория приложения для пакетирования.
`--prerender` | `false`      | Предварительная рендеринг всех маршрутов вашего приложения. (**Примечание:** это экспериментальный флаг. Поведение может быть изменено.)
`--preset`    | -            | Установить [пресет Nitro](https://nitro.unjs.io/deploy#changing-the-deployment-preset)
`--dotenv`    | `.`          | Укажите другой файл `.env` для загрузки, **относительно** корневой директории.
`--log-level` | `info`       | Укажите уровень журналирования во время сборки, разрешая `silent` \| `info` \| `verbose`.

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::

::note
`--prerender` всегда будет устанавливать `preset` в `static`
::
