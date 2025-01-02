---
title: "nuxi add"
description: "Создание сущности в вашем приложении Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxi add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### Arguments

<!--add-args-->
Argument | Description
--- | ---
`TEMPLATE` | Specify which template to generate (options: <api\|plugin\|component\|composable\|middleware\|layout\|page>)
`NAME` | Specify name of the generated file
<!--/add-args-->

### Options

<!--add-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | Specify the working directory
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--force` | `false` | Force override file if it already exists
<!--/add-opts-->

**Модификаторы:**

Некоторые шаблоны поддерживают дополнительные модификаторы флагов для добавления суффикса (например, `.client` или `.get`) к их имени.

```bash [Terminal]
# Создает `/plugins/sockets.client.ts`
npx nuxi add plugin sockets --client
```

## `nuxi add component`

* Флаги модификаторов: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создает `components/TheHeader.vue`
npx nuxi add component TheHeader
```

## `nuxi add composable`

```bash [Terminal]
# Создает `composables/foo.ts`
npx nuxi add composable foo
```

## `nuxi add layout`

```bash [Terminal]
# Создает `layouts/custom.vue`
npx nuxi add layout custom
```

## `nuxi add plugin`

* Флаги модификаторов: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создает `plugins/analytics.ts`
npx nuxi add plugin analytics
```

## `nuxi add page`

```bash [Terminal]
# Создает `pages/about.vue`
npx nuxi add page about
```

```bash [Terminal]
# Создает `pages/category/[id].vue`
npx nuxi add page "category/[id]"
```

## `nuxi add middleware`

* Флаги модификаторов: `--global`

```bash [Terminal]
# Создает `middleware/auth.ts`
npx nuxi add middleware auth
```

## `nuxi add api`

* Флаги модификаторов: `--method` (может принять `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` или `trace`) или, наоборот, вы можете напрямую использовать `--get`, `--post`, и другое.

```bash [Terminal]
# Создает `server/api/hello.ts`
npx nuxi add api hello
```
