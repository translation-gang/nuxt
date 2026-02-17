---
title: "nuxt add"
description: "Добавление сущности (модуля и т.п.) в приложение Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add-template.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxt add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

## Аргументы

<!--add-args-->
| Аргумент   | Описание                                                                                                                                                                                                         |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TEMPLATE` | Какой шаблон генерировать (api, app, app-config, component, composable, error, layer, layout, middleware, module, page, plugin, server-middleware, server-plugin, server-route, server-util) |
| `NAME`     | Имя генерируемого файла                                                                                                                                                                                          |
<!--/add-args-->

## Опции

<!--add-opts-->
| Опция                                  | По умолчанию | Описание                              |
|----------------------------------------|--------------|----------------------------------------|
| `--cwd=<directory>`                    | `.`          | Рабочая директория                     |
| `--logLevel=<silent\|info\|verbose>`   |              | Уровень логирования при сборке         |
| `--force`                              | `false`      | Перезаписать файл, если уже существует |
<!--/add-opts-->

**Модификаторы:**

Некоторые шаблоны поддерживают флаги-модификаторы, добавляющие суффикс к имени (например `.client` или `.get`).

```bash [Terminal]
# Создаёт `/plugins/sockets.client.ts`
npx nuxt add plugin sockets --client
```

## `nuxt add component`

* Модификаторы: `--mode client|server` или `--client`, или `--server`

```bash [Terminal]
# Создаёт `app/components/TheHeader.vue`
npx nuxt add component TheHeader
```

## `nuxt add composable`

```bash [Terminal]
# Создаёт `app/composables/foo.ts`
npx nuxt add composable foo
```

## `nuxt add layout`

```bash [Terminal]
# Создаёт `app/layouts/custom.vue`
npx nuxt add layout custom
```

## `nuxt add plugin`

* Модификаторы: `--mode client|server` или `--client`, или `--server`

```bash [Terminal]
# Создаёт `app/plugins/analytics.ts`
npx nuxt add plugin analytics
```

## `nuxt add page`

```bash [Terminal]
# Создаёт `app/pages/about.vue`
npx nuxt add page about
```

```bash [Terminal]
# Создаёт `app/pages/category/[id].vue`
npx nuxt add page "category/[id]"
```

## `nuxt add middleware`

* Модификатор: `--global`

```bash [Terminal]
# Создаёт `app/middleware/auth.ts`
npx nuxt add middleware auth
```

## `nuxt add api`

* Модификатор `--method` (значения: `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put`, `trace`) или короткие флаги `--get`, `--post` и т.д.

```bash [Terminal]
# Создаёт `server/api/hello.ts`
npx nuxt add api hello
```

## `nuxt add layer`

```bash [Terminal]
# Создаёт `layers/subscribe/nuxt.config.ts`
npx nuxt add layer subscribe
```
