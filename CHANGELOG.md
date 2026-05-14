# Changelog

## 1.5.0 - 2026-05-15

- Версия пакета обновлена до `1.5.0`.
- Добавлены npm-команды `start`, `password`, `check`, `pack:dry`, `link:global`, `unlink:global` и `prepublishOnly`.
- В README уточнено, как сделать `creeps` глобальной командой через `npm install --global` и `npm link`.
- Добавлена команда `creeps password` и API `creeps.password()` для генерации пароля из четырех слов списка.
- Удалены устаревшие runtime-зависимости `meow` и `unique-random-array`; CLI-парсер и выбор случайного имени реализованы локально без изменения публичного API.
- Тесты переведены с AVA на встроенный `node:test`.
- Обновлена конфигурация ESLint до flat config и добавлена команда `npm run lint`.
- README обновлен под текущие требования и сценарии разработки.
