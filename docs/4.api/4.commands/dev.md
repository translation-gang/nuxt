---
title: 'nuxt dev'
description: "Запуск dev-сервера с HMR на http://localhost:3000."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--clear] [--no-f, --no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

Команда `dev` запускает сервер разработки с hot module replacement по адресу [http://localhost:3000](https://localhost:3000)

## Аргументы

<!--dev-args-->
| Аргумент      | Описание                                        |
|---------------|-------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)         |
<!--/dev-args-->

## Опции

<!--dev-opts-->
| Опция                                | По умолчанию | Описание                                                                                    |
|--------------------------------------|--------------|---------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |              | Рабочая директория (приоритет над ROOTDIR)                                                 |
| `--logLevel=<silent\|info\|verbose>` |              | Уровень логирования при сборке                                                             |
| `--dotenv`                           |              | Путь к `.env` относительно корня                                                           |
| `--envName`                          |              | Окружение (production при сборке, development при dev)                                     |
| `-e, --extends=<layer-name>`         |              | Подключить слой Nuxt                                                                        |
| `--clear`                            | `false`      | Очищать консоль при перезапуске                                                            |
| `--no-f, --no-fork`                  |              | Отключить режим fork                                                                        |
| `-p, --port`                         |              | Порт для прослушивания                                                                      |
| `-h, --host`                         |              | Хост для прослушивания                                                                      |
| `--clipboard`                        | `false`      | Копировать URL в буфер обмена                                                              |
| `-o, --open`                         | `false`      | Открыть URL в браузере                                                                      |
| `--https`                            |              | Включить HTTPS                                                                              |
| `--publicURL`                        |              | Публичный URL (для QR-кода)                                                                 |
| `--qr`                               |              | Показывать QR-код публичного URL                                                            |
| `--public`                           |              | Слушать все сетевые интерфейсы                                                             |
| `--tunnel`                           |              | Туннель через unjs/untun                                                                    |
| `--sslCert`                          |              | (УСТАРЕЛО) Используйте `--https.cert`                                                      |
| `--sslKey`                           |              | (УСТАРЕЛО) Используйте `--https.key`                                                        |
<!--/dev-opts-->

Порт и хост можно задать переменными NUXT_PORT, PORT, NUXT_HOST или HOST.

Опции можно передавать в `listhen`, например `--no-qr` для отключения QR-кода. Список опций — в [unjs/listhen](https://github.com/unjs/listhen).

Команда устанавливает `process.env.NODE_ENV` в `development`.

::note
При самоподписанном сертификате в разработке задайте `NODE_TLS_REJECT_UNAUTHORIZED=0` в окружении.
::
