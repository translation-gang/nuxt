---
title: 'nuxt dev'
description: Команда dev запускает сервер разработки с горячей заменой модулей (HMR) на http://localhost:3000
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--clear] [--no-f, --no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

Команда `dev` запускает сервер разработки с горячей заменой модулей по адресу [http://localhost:3000](https://localhost:3000)

## Аргументы

<!--dev-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/dev-args-->

## Опции

<!--dev-opts-->
| Опция                               | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--dotenv`                           |         | Путь к `.env` относительно корня проекта                                                                                          |
| `--envName`                          |         | Окружение для переопределений конфигурации (по умолчанию при сборке — `production`, при dev-сервере — `development`) |
| `-e, --extends=<layer-name>`         |         | Подключить слой Nuxt                                                                                                                             |
| `--clear`                            | `false` | Очищать консоль при перезапуске                                                                                                                             |
| `--no-f, --no-fork`                  |         | Отключить форк процесса                                                                                                                                  |
| `-p, --port`                         |         | Порт (по умолчанию: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)                                                   |
| `-h, --host`                         |         | Хост (по умолчанию: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions.devServer?.host`)                                                  |
| `--clipboard`                        | `false` | Копировать URL в буфер обмена                                                                                                                        |
| `-o, --open`                         | `false` | Открыть URL в браузере                                                                                                                          |
| `--https`                            |         | Включить HTTPS                                                                                                                                         |
| `--publicURL`                        |         | Отображаемый публичный URL (для QR-кода)                                                                                                              |
| `--qr`                               |         | Показать QR-код публичного URL, если доступен                                                                                                     |
| `--public`                           |         | Слушать на всех сетевых интерфейсах                                                                                                                     |
| `--tunnel`                           |         | Открыть туннель через https://github.com/unjs/untun                                                                                                    |
| `--sslCert`                          |         | (УСТАРЕЛО) Используйте `--https.cert`.                                                                                                             |
| `--sslKey`                           |         | (УСТАРЕЛО) Используйте `--https.key`.                                                                                                              |
<!--/dev-opts-->

Порт и хост можно задать переменными окружения `NUXT_PORT`, `PORT`, `NUXT_HOST` или `HOST`.

Кроме перечисленных опций `@nuxt/cli` может пробрасывать параметры в `listhen`, например `--no-qr` чтобы отключить QR-код dev-сервера. Список опций `listhen` см. в [документации unjs/listhen](https://github.com/unjs/listhen).

Команда выставляет `process.env.NODE_ENV` в `development`.

::note
При самоподписанном сертификате в разработке задайте в окружении `NODE_TLS_REJECT_UNAUTHORIZED=0`.
::
