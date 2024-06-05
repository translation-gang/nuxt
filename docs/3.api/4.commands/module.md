---
title: "nuxi module"
description: "Поиск и добавление модулей в приложение Nuxt с помощью командной строки."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/module/
    size: xs
---

Nuxi предоставляет несколько утилит для беспрепятственной работы с [модулями Nuxt](/modules).

## nuxi module add

```bash [Terminal]
npx nuxi module add <NAME>
```

Параметр | По умолчанию | Описание
---------|--------------|-----------------------------------
`NAME`   | -            | Имя модуля, который необходимо установить.

Эта команда позволяет установить [модули Nuxt](/modules) в ваше приложение без ручной работы.

При выполнении команды:
- установит модуль в качестве зависимости с помощью вашего менеджера пакетов
- добавит его в файл [package.json](/docs/guide/directory-structure/package)
- обновит файл [`nuxt.config`](/docs/guide/directory-structure/nuxt-config)

**Пример:**

Установка модуля [`Pinia`](/modules/pinia).

```bash [Terminal]
npx nuxi module add pinia
```

## nuxi module search

```bash [Terminal]
npx nuxi module search <QUERY>
```

Параметр | По умолчанию | Описание
---------|--------------|--------------------------------------
`QUERY`  | -            | Имя модуля для поиска.

Команда ищет модули Nuxt, соответствующие вашему запросу, которые совместимы с вашей версией Nuxt.

**Пример:**

```bash [Terminal]
npx nuxi module search pinia
```
