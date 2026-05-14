# Creeps

> Получить случайное имя из небольшого списка персонажей и образов.

<img src="https://media3.giphy.com/media/2eHFEYBoJO3mw/200_s.gif" width="182">

## Требования

- Node.js 20.19+

## Установка

Если пакет установлен из npm, команда `creeps` становится доступна глобально:

```
$ npm install --global creeps
$ creeps password
```

Для локальной разработки можно сделать текущий checkout глобальной командой.
Запустите это из корня репозитория:

```
$ npm run link:global
$ creeps
```

После этого `creeps`, `creeps --all`, `creeps --next Crow` и `creeps password`
будут работать из любой директории. Чтобы убрать локальную глобальную команду:

```
$ npm run unlink:global
```

## CLI

```
$ creeps --help

Usage
  $ creeps [--all]
  $ creeps --next <name>
  $ creeps password

Examples
  $ creeps
  Tooth fairy

  $ creeps --all
  Jeff the killer
  Jeffrey Dahmer
  ...

  $ creeps --next Crow
  Damien

  $ creeps password
  crow.damien.Dracula.hades7

Options
  --all           Get all names instead of a random name
  --next <name>   Get next name after the provided name
  --version       Show package version
  --help          Show help
```

## API

```js
const creeps = require('creeps');

creeps.all;
creeps.random();
creeps.next('Crow');
creeps.password();
```

Пакет остается CommonJS-модулем и не имеет runtime-зависимостей. Команда `password`
собирает пароль из четырех слов списка, разделяет их точками, делает первую букву
одного случайного слова заглавной и добавляет случайную цифру в конце.

## Разработка

```
$ npm start
$ npm run password
$ npm test
$ npm run lint
$ npm run check
$ npm run pack:dry
```

## Лицензия

MIT © [Dmitri Kunin](http://dkun.in)
