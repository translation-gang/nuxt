---
title: "nuxi add"
description: "Создание сущности в вашем приложении Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/add.ts
    size: xs
---

```bash [Terminal]
npx nuxi add [--cwd] [--force] <TEMPLATE> <NAME>
```

Параметр   | По умолчанию | Описание
-----------|--------------|-------------------------------------------------
`TEMPLATE` | -            | Укажите шаблон файла, который будет сгенерирован.
`NAME`     | -            | Укажите имя файла, который будет создан.
`--cwd`    | `.`          | Каталог целевого приложения.
`--force`  | `false`      | Принудительное переопределение файла, если он уже существует.

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
