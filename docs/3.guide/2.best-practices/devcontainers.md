---
navigation.title: 'Dev Containers'
title: Dev Containers
description: Настройте или откройте проект Nuxt в dev container для единообразной среды разработки.
---

## Настройка dev container

Если вы начинаете новый проект Nuxt и хотите разрабатывать в dev container, добавьте конфигурацию сами.

::read-more{to="https://code.visualstudio.com/docs/devcontainers/containers" target="_blank"}
Подробнее о dev containers
::

### Требования

- [Visual Studio Code](https://code.visualstudio.com/) с [расширением Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) или [Docker Engine](https://docs.docker.com/engine/)

### Создание конфигурации

Создайте в корне проекта каталог `.devcontainer/` с двумя файлами:

```json [devcontainer.json]
{
  "name": "nuxt-devcontainer",
  "build": {
    "dockerfile": "Dockerfile",
    "context": "../"
  },
  "forwardPorts": [3000],
  "portsAttributes": {
    "3000": {
      "label": "Application",
      "onAutoForward": "openPreview"
    }
  },
  "mounts": [
    "type=volume,target=${containerWorkspaceFolder}/node_modules"
  ],
  "postStartCommand": "pnpm install && pnpm dev:prepare"
}
```

```dockerfile [Dockerfile]
FROM node:lts

WORKDIR /app

RUN npm i -g corepack && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml  ./
RUN pnpm install --frozen-lockfile

COPY . .
```

Конфигурация использует Node.js LTS и включает pnpm через corepack. Пробрасывает порт 3000 для dev-сервера Nuxt и сохраняет `node_modules` в Docker volume, чтобы не переустанавливать зависимости при перезапуске контейнера.

::tip
Чтобы использовать другой менеджер пакетов, замените `corepack enable` на нужный (например, `npm install -g yarn`) и обновите `postStartCommand`.
::

## Открытие существующего dev container

Если в проекте уже есть конфигурация dev container, откройте его одним из способов:

### 1. Подсказка VS Code

Когда вы открываете проект в VS Code, в правом нижнем углу появится уведомление:

> "Reopen in Dev Containers"

Нажмите эту кнопку, чтобы собрать и открыть проект в dev container.

### 2. Палитра команд

Если вы закрыли подсказку или хотите запустить вручную:

1. Откройте палитру команд (`Cmd+Shift+P` на Mac, `Ctrl+Shift+P` на Windows/Linux)
2. Найдите **"Dev Containers: Reopen in Container"**
3. Выберите команду

VS Code соберёт контейнер и снова откроет проект.

### 3. Dev Containers CLI

Для продвинутых сценариев или CI используйте Dev Containers CLI напрямую:

```bash
# Установите CLI (если ещё не установлен)
npm install -g @devcontainers/cli

# Соберите и откройте проект в контейнере
devcontainer up --workspace-folder .

# После изменений в .devcontainer пересоберите
devcontainer build
```

## Следующие шаги

Когда контейнер запущен:

```bash
pnpm dev
```

Приложение Nuxt будет доступно по адресу <http://localhost:3000>.
