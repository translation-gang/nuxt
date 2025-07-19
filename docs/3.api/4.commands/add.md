---
title: "nuxt add"
description: "Создание сущности в вашем приложении Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxt add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### Arguments

<!--add-args-->
Argument | Description
--- | ---
`TEMPLATE` | Specify which template to generate (options: <api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>)
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
npx nuxt add plugin sockets --client
```

## `nuxt add component`

* Флаги модификаторов: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создает `components/TheHeader.vue`
npx nuxt add component TheHeader
```

## `nuxt add composable`

```bash [Terminal]
# Создает `composables/foo.ts`
npx nuxt add composable foo
```

## `nuxt add layout`

```bash [Terminal]
# Создает `layouts/custom.vue`
npx nuxt add layout custom
```

## `nuxt add plugin`

* Флаги модификаторов: `--mode client|server` или `--client` или `--server`

```bash [Terminal]
# Создает `plugins/analytics.ts`
npx nuxt add plugin analytics
```

## `nuxt add page`

```bash [Terminal]
# Создает `pages/about.vue`
npx nuxt add page about
```

```bash [Terminal]
# Создает `pages/category/[id].vue`
npx nuxt add page "category/[id]"
```

## `nuxt add middleware`

* Флаги модификаторов: `--global`

```bash [Terminal]
# Создает `middleware/auth.ts`
npx nuxt add middleware auth
```

## `nuxt add api`

* Флаги модификаторов: `--method` (может принять `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` или `trace`) или, наоборот, вы можете напрямую использовать `--get`, `--post`, и другое.

```bash [Terminal]
# Создает `server/api/hello.ts`
npx nuxt add api hello
```

## `nuxt add layer`

```bash [Terminal]
# Создает `layers/subscribe/nuxt.config.ts`
npx nuxt add layer subscribe
```
