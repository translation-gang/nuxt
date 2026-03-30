---
title: 'nuxt dev'
description: Команда dev запускает сервер разработки с горячей заменой модулей на http://localhost:3000
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--clear] [--no-f, --no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--profile[=verbose]] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

Команда `dev` запускает сервер разработки с горячей заменой модулей на [http://localhost:3000](https://localhost:3000)

## Аргументы

<!--dev-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/dev-args-->

## Опции

<!--dev-opts-->
| Опция                                | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                                                                                          |
| `--envName`                          |         | Окружение для применения переопределений конфигурации (по умолчанию `production` при сборке и `development` при запуске dev-сервера) |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                                                                                             |
| `--clear`                            | `false` | Очищать консоль при перезапуске                                                                                                                             |
| `--no-f, --no-fork`                  |         | Отключить форк-процесс                                                                                                                                  |
| `-p, --port`                         |         | Порт прослушивания (по умолчанию: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)                                                   |
| `-h, --host`                         |         | Хост прослушивания (по умолчанию: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions.devServer?.host`)                                                  |
| `--clipboard`                        | `false` | Копировать URL в буфер обмена                                                                                                                        |
| `-o, --open`                         | `false` | Открыть URL в браузере                                                                                                                          |
| `--https`                            |         | Включить HTTPS                                                                                                                                         |
| `--publicURL`                        |         | Отображаемый публичный URL (для QR-кода)                                                                                                              |
| `--qr`                               |         | Показывать QR-код публичного URL, если доступен                                                                                                     |
| `--public`                           |         | Слушать на всех сетевых интерфейсах                                                                                                                     |
| `--tunnel`                           |         | Открыть туннель через https://github.com/unjs/untun                                                                                                    |
| `--profile`                          |         | Профилирование производительности (v4.4+). При выходе записывает CPU-профиль V8 и JSON-отчёт. Используйте `--profile=verbose` для полного вывода в консоль.                     |
| `--sslCert`                          |         | (УСТАРЕЛО) Используйте вместо этого `--https.cert`.                                                                                                             |
| `--sslKey`                           |         | (УСТАРЕЛО) Используйте вместо этого `--https.key`.                                                                                                              |
<!--/dev-opts-->

Порт и хост можно задать через переменные окружения NUXT_PORT, PORT, NUXT_HOST или HOST.

Помимо перечисленных опций, `@nuxt/cli` может пробрасывать параметры в `listhen`, например `--no-qr`, чтобы отключить QR-код dev-сервера. Список опций `listhen` см. в документации [unjs/listhen](https://github.com/unjs/listhen).

Эта команда устанавливает `process.env.NODE_ENV` в `development`.

::note
Если в разработке используется самоподписанный сертификат, в окружении нужно задать `NODE_TLS_REJECT_UNAUTHORIZED=0`.
::
