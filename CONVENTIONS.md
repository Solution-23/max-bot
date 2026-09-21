# Правила проекта

- TypeScript strict, CommonJS: импорты без расширений файлов. Без `any`.
- Код на английском, комментарии короткие, на русском.
- Не создавай файлы и функциональность вне описанной структуры. package.json не меняй без просьбы.

## Слои и направление зависимостей
- entity/ — только типы и константы. Не импортирует другие слои.
  Единственное исключение: bot.entity.ts, который реэкспортирует Bot и Context из @maxhub/max-bot-api.
- use-case/ — классы с методом execute(). Принимают простые данные (id, username), не знают про MAX, Context и SQL.
  Импортируют только entity и repositories.
- repositories/ — весь SQL (better-sqlite3, prepared statements). Возвращают типы из entity.
- infrastructure/ — config (Zod) и db. Ничего не знают о бизнес-логике.
- adapters/bot/ — единственное место, где используется @maxhub/max-bot-api.
  Переводит Context в простые данные и вызывает use-case.
- Зависимости собираются в app/index.ts, а позже переедут в di/.
- Данные из внешних источников (env, JSON из БД) проверяются через Zod.