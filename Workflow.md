# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Запустить проект в режиме разработки

```bash
npm start:dev
```

Отличия от обычного режима:

- NodeJs будет автоматически перезапускаться (средствами nodemon) каждый раз при изменении любых файлов в директории src с расширениями .ts / .json
- Перед выводом в консоль логи дополнительно обрабатывается пакетом pino-pretty для более читабельного вида

#### Запустить тестовый json-сервер

```bash
npm run mock:server
```

или

```bash
npm run json-server ./mocks/mock-server-data.json --port 3123
```

В процессе запуска проекта будет создан тесовый json-server, который будет отдавать моковые данные при обращении по адресу http://localhost:3000/api

Офферы: http://localhost:3000/api/offers
Пользователи: http://localhost:3000/api/users
Комментарии: http://localhost:3000/api/comments
Данные для сервера находятся в директории ./src/mocks/, файл mock-server-data.json

### Docker

#### Запустить сборку контейнеров

```bash
docker compose up -d
```

```bash
docker compose --file ./docker-compose.yml --env-file ./.env --project-name \"six-cities\" up -d
```

#### Остановить и удалить контейнеры

```bash
docker compose --file ./docker-compose.yml --env-file ./.env --project-name \"six-cities\" down
```

Данная команда сконфигурирует Docker-контейнер для приложения, а также развернет в нем образ mongodb и mongo-express для работы с базой данных.
Конфигурационный файл docker-compose.dev-yml расположен в корне проекта.

### Переменные окружения

PORT=5000 - Порт, на котором запускается сервер приложения
SALT=secret-word - Соль, используемая для формирования хэша паролей пользователей
DB_HOST=127.0.0.1 - Хост, на котором развернута база данных
DB_USER=login - Логин пользователя к используемой базе данных (MongoDB)
DB_PASSWORD=password - Пароль пользователя к используемой базе данных (MongoDB)
DB_PORT=27017 - Порт, на котором развернута база данных
DB_NAME=six-cities - Название БД в MondoDB
UPLOAD_DIRECTORY_PATH=С:\some\path\six-cities.loc\upload - Директория загрузки пользовательских файлов
STATIC_DIRECTORY_PATH=С:\some\path\six-cities.loc\static - директория со статичными файлами
JWT_SECRET=jwt-secret - Секрет для формирования JWT-токенов
JWT_EXPIRED=5d - Время жизни сформированных токенов
HOST=localhost - Хост, на котором запускается сервер

Примеры переменных окружения также представлены в файле .env.example

## Работа с CLI-приложением

### Сценарии запуска

#### Запуск скрипта для получения информации о доступных командах. Команда по умолчанию

```bash
npm run ts ./src/main.cli.ts -- --help
```

#### Запуск скрипта для получения версии приложения:

```bash
npm run ts -- ./src/main.cli.ts --version
```

#### Импорт данных из TSV файла:

Парсит файл с моковыми данными, сгенерированными командой generate.

```bash
npm run ts -- ./src/main.cli.ts --import mocks/mock-data.tsv
```

#### Импорт данных из нескольких TSV файлов:

```bash
npm run ts -- ./src/main.cli.ts --import data1.tsv data2.tsv data3.tsv
```

#### Импорт данных из TSV файла с указанием соединения с базой данных:

```bash
npm run ts -- ./src/main.cli.ts --import ./mocks/mock-data.tsv -u [user] -p [password] -h [host] -P [port] -n [dbname]
```

Параметры команд:
-u - логин_базы_данных
-p - пароль_базы_данных
-host - сервер_базы_данных
-port - порт_базы_данных
-dbname - имя_базы_данных

#### Генерация мок-данных и запись их в TSV файл (должен быть предварительно запущен моковый json-сервер):

```bash
npm run ts -- ./src/main.cli.ts --generate 100 ./mocks/mock-offers.tsv http://localhost:3123/api
```

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
