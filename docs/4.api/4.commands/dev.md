---
title: 'nuxt dev'
description: Запуск dev-сервера с HMR на http://localhost:3000
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

Команда `dev` запускает сервер разработки с HMR по адресу [http://localhost:3000](http://localhost:3000).

## Аргументы

<!--dev-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/dev-args-->

## Опции

<!--dev-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`--envName` |  | Окружение для разрешения переопределений конфигурации (для сборки по умолчанию `production`, для dev-сервера — `development`)
`--no-clear` |  | Не очищать консоль при перезапуске
`--no-fork` |  | Отключить форк процесса
`-p, --port` |  | Порт прослушивания (по умолчанию: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)
`-h, --host` |  | Хост прослушивания (по умолчанию: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions._layers?.[0]?.devServer?.host`)
`--clipboard` | `false` | Скопировать URL в буфер обмена
`-o, --open` | `false` | Открыть URL в браузере
`--https` |  | Включить HTTPS
`--publicURL` |  | Публичный URL для отображения (для QR-кода)
`--qr` |  | Показать QR-код для публичного URL, если доступно
`--public` |  | Слушать на всех сетевых интерфейсах
`--tunnel` |  | Открыть туннель через https://github.com/unjs/untun
`--sslCert` |  | (Устарело) Используйте `--https.cert`.
`--sslKey` |  | (Устарело) Используйте `--https.key`.
<!--/dev-opts-->

Порт и хост можно также задать переменными окружения `NUXT_PORT`, `PORT`, `NUXT_HOST` или `HOST`.

Помимо перечисленных опций `@nuxt/cli` может пробрасывать опции в `listhen` — например `--no-qr`, чтобы отключить QR-код dev-сервера. Полный список опций см. в [репозитории listhen](https://github.com/unjs/listhen).

::note
Команда выставляет `process.env.NODE_ENV` в `development`.
::

::note
Если в разработке используется самоподписанный сертификат, задайте в окружении `NODE_TLS_REJECT_UNAUTHORIZED=0`.
::
