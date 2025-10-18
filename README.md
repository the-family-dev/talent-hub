# Проект

Хаб Талантов — цифровая платформа для взаимодействия между администрацией Технополис Москва, компаниям-резидентами и представителями ВУЗов. Решение объединяет в одном пространстве полный цикл управления вакансиями, кандидатами и стажировками, обеспечивая прозрачный и удобный процесс подбора кадров.

## Описание функционала

- Управление вакансиями и стажировками
- Подбор кандидатов и отслеживание их статусов
- Размещение и управление откликами
- Панель администратора с дашбордом и валидацией вакансий
- Поиск и фильтрация по вакансиям и компаниям
- Загрузка и хранение файлов и фотографий

## Технологии

- [Heroicons](https://heroicons.com/)
- [HeroUI](https://www.heroui.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [MobX](https://mobx.js.org/README.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Zod](https://zod.dev/)
- [Multer](https://www.npmjs.com/package/multer)
- [Prisma ORM](https://www.prisma.io/)
- [PM2](https://pm2.keymetrics.io/)

## Установка и запуск

1. Установить зависимости

```bash
npm install
```

2. Создать .env файлы в паках frontend и backend

```bash
npm run create-env
```

3. Сгенерировать бд и типы для работы с ним

```bash
npm run generate
```

4. Запуск в dev режиме

```bash
npm run dev
```

## Конфигурация

После ввода команды `npm run create-env` создастся 2 .env файла в папках backend и frontend

В frontend/.env необходимо заполнить URL бэкенда,

```bash
VITE_BASE_URL=api.myapiserver.url

```

В backend/.env необходимо заполнить путь до файл БД SQLite,

```bash
DATABASE_URL="file:./dev.db"

```

## Сборка и развёртывание

Для развертывания приложения используется команда

```bash
npm run deploy
```
