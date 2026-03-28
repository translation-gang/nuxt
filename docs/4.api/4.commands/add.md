---
title: "nuxt add"
description: "Создаёт сущность в приложении Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxt add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

::tip
Шаблоны создают файлы в стандартных каталогах (`components/`, `pages/` и т. д.) — см. [структуру директорий](/docs/3.x/directory-structure).
::

### Аргументы

<!--add-args-->
Аргумент | Описание
--- | ---
`TEMPLATE` | Какой шаблон сгенерировать (варианты: <api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>)
`NAME` | Имя создаваемого файла
<!--/add-args-->

### Опции

<!--add-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` | `.` | Рабочая директория
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--force` | `false` | Перезаписать файл, если он уже существует
<!--/add-opts-->

**Модификаторы:**

Некоторые шаблоны поддерживают дополнительные флаги-модификаторы, добавляющие суффикс к имени (например `.client` или `.get`).

```bash [Terminal]
# Создаёт `/plugins/sockets.client.ts`
npx nuxt add plugin sockets --client
```

## `nuxt add component`

* Флаги-модификаторы: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создаёт `components/TheHeader.vue`
npx nuxt add component TheHeader
```

## `nuxt add composable`

```bash [Terminal]
# Создаёт `composables/foo.ts`
npx nuxt add composable foo
```

## `nuxt add layout`

```bash [Terminal]
# Создаёт `layouts/custom.vue`
npx nuxt add layout custom
```

## `nuxt add plugin`

* Флаги-модификаторы: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создаёт `plugins/analytics.ts`
npx nuxt add plugin analytics
```

## `nuxt add page`

```bash [Terminal]
# Создаёт `pages/about.vue`
npx nuxt add page about
```

```bash [Terminal]
# Создаёт `pages/category/[id].vue`
npx nuxt add page "category/[id]"
```

## `nuxt add middleware`

* Флаги-модификаторы: `--global`

```bash [Terminal]
# Создаёт `middleware/auth.ts`
npx nuxt add middleware auth
```

## `nuxt add api`

* Флаги-модификаторы: `--method` (принимает `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` или `trace`) или напрямую `--get`, `--post` и т. д.

```bash [Terminal]
# Создаёт `server/api/hello.ts`
npx nuxt add api hello
```

## `nuxt add layer`

```bash [Terminal]
# Создаёт `layers/subscribe/nuxt.config.ts`
npx nuxt add layer subscribe
```
