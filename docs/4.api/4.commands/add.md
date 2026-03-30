---
title: "nuxt add"
description: "Создаёт сущность в вашем приложении Nuxt."
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
| Аргумент   | Описание                                                                                                                                                                                                      |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TEMPLATE` | Укажите, какой шаблон генерировать (варианты: <api\|app\|app-config\|component\|composable\|error\|layer\|layout\|middleware\|module\|page\|plugin\|server-middleware\|server-plugin\|server-route\|server-util>) |
| `NAME`     | Имя создаваемого файла                                                                                                                                                                               |
<!--/add-args-->

## Опции

<!--add-opts-->
| Опция                                | По умолчанию | Описание                              |
|--------------------------------------|---------|------------------------------------------|
| `--cwd=<directory>`                  | `.`     | Рабочая директория            |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке             |
| `--force`                            | `false` | Принудительно перезаписать файл, если он уже существует |
<!--/add-opts-->

**Модификаторы:**

Некоторые шаблоны поддерживают дополнительные флаги-модификаторы, добавляющие суффикс (например `.client` или `.get`) к имени.

```bash [Terminal]
# Создаёт `/plugins/sockets.client.ts`
npx nuxt add plugin sockets --client
```

## `nuxt add component`

* Флаги-модификаторы: `--mode client|server` или `--client` или `--server`

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

* Флаги-модификаторы: `--mode client|server` или `--client` или `--server`

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

* Флаги-модификаторы: `--global`

```bash [Terminal]
# Создаёт `app/middleware/auth.ts`
npx nuxt add middleware auth
```

## `nuxt add api`

* Флаги-модификаторы: `--method` (допустимы `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` или `trace`) либо напрямую `--get`, `--post` и т.д.

```bash [Terminal]
# Создаёт `server/api/hello.ts`
npx nuxt add api hello
```

## `nuxt add layer`

```bash [Terminal]
# Создаёт `layers/subscribe/nuxt.config.ts`
npx nuxt add layer subscribe
```
