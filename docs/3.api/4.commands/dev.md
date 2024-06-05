---
title: 'nuxi dev'
description: Команда dev запускает сервер разработки с HMR по адресу at http://localhost:3000
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/dev.ts
    size: xs
---

```bash [Terminal]
npx nuxi dev [rootDir] [--dotenv] [--log-level] [--clipboard] [--open, -o] [--no-clear] [--port, -p] [--host, -h] [--https] [--ssl-cert] [--ssl-key] [--tunnel]
```

Команда dev запускает сервер разработки с HMR на [http://localhost:3000](https://localhost:3000)

Параметр      | По умолчанию | Описание
--------------|--------------|------------------------------------------------------------------------------------------
`rootDir`     | `.`          | Корневая директория приложения для запуска.
`--dotenv`    | `.`          | Укажите другой файл `.env` для загрузки, относительно корневой директории.
`--open, -o`  | `false`      | Открыть URL-адрес в браузере.
`--clipboard` | `false`      | Копировать URL-адрес в буфер обмена.
`--no-clear`  | `false`      | Не очищает консоль после запуска.
`--port, -p`  | `3000`       | Порт для прослушивания.
`--host, -h`  | `localhost`  | Имя хоста сервера.
`--https`     | `false`      | Прослушивание с протоколом `https` с самозаверенным сертификатом по умолчанию.
`--ssl-cert`  | `null`       | Укажите сертификат для https.
`--ssl-key`   | `null`       | Укажите ключ для сертификата https.
`--tunnel`    | `false`      | Туннелирование вашего локального сервера в Интернет с помощью [unjs/untun](https://github.com/unjs/untun)

Порт и хост также могут быть установлены с помощью переменных среды `NUXT_PORT`, `PORT`, `NUXT_HOST` или `HOST`.

Дополнительно к вышеуказанным опциям, `nuxi` может передавать опции в `listhen`, например `--no-qr`, чтобы отключить QR-код сервера разработки. Вы можете найти список опций `listhen` в документации

Эта команда устанавливает `process.env.NODE_ENV` в `development`.

::note
Если вы используете самозаверенный сертификат в разработке, вам необходимо установить `NODE_TLS_REJECT_UNAUTHORIZED=0` в вашей среде.
::
