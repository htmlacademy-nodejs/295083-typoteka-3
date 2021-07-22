'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const mockData = [
  {
    "id": `hRg4br`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "announce": `Если найдёте дешевле — сброшу цену. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Как начать действовать? Для начала просто соберитесь.`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Товар в отличном состоянии. Мой дед не мог её сломать. Кому нужен этот новый телефон, если тут такое...`,
    "createdDate": `6/29/2021, 2:42:21 PM`,
    "category": [
      `Железо`,
      `Игры`,
      `IT`,
      `Деревья`,
      `Книги`,
      `Кино`,
      `Программирование`,
      `За жизнь`,
      `Музыка`,
      `Посуда`,
      `Разное`,
      `Журналы`
    ],
    "comments": [
      {
        "id": `yFwvqS`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `Jy8EoR`,
        "text": `Согласен с автором!`
      }
    ]
  },
  {
    "id": `O7BqmF`,
    "title": `Лучший подарок на новый год`,
    "announce": `Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Программировать не настолько сложно, как об этом говорят.`,
    "fullText": `Кому нужен этот новый телефон, если тут такое... Он написал больше 30 хитов. Две страницы заляпаны свежим кофе. Первая большая ёлка была установлена только в 1938 году. Кажется, что это хрупкая вещь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. При покупке с меня бесплатная доставка в черте города. Из под его пера вышло 8 платиновых альбомов.`,
    "createdDate": `7/16/2021, 11:07:06 AM`,
    "category": [
      `Программирование`,
      `IT`,
      `Деревья`,
      `Животные`,
      `Посуда`,
      `Разное`,
      `Без рамки`,
      `Журналы`,
      `Книги`,
      `Игры`,
      `Музыка`
    ],
    "comments": [
      {
        "id": `FEO-hf`,
        "text": `Совсем немного... Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `nBHZvv`,
    "title": `Борьба с прокрастинацией`,
    "announce": `Кажется, что это хрупкая вещь. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "fullText": `При покупке с меня бесплатная доставка в черте города. Он написал больше 30 хитов. Если найдёте дешевле — сброшу цену. Кому нужен этот новый телефон, если тут такое... Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Первая большая ёлка была установлена только в 1938 году. Таких предложений больше нет! Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Если товар не понравится — верну всё до последней копейки. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Мой дед не мог её сломать. Это один из лучших рок-музыкантов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Товар в отличном состоянии. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Кажется, что это хрупкая вещь. Две страницы заляпаны свежим кофе. Собрать камни бесконечности легко, если вы прирожденный герой. Из под его пера вышло 8 платиновых альбомов. Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Даю недельную гарантию. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Пользовались бережно и только по большим праздникам.`,
    "createdDate": `7/8/2021, 4:50:50 PM`,
    "category": [
      `Музыка`,
      `Книги`,
      `Кино`,
      `Программирование`,
      `Игры`,
      `Журналы`,
      `За жизнь`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `u0UYDO`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `PT8S2V`,
        "text": `Плюсую но слишком много буквы!`
      },
      {
        "id": `kpUTyC`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это где-то? Совсем немного...`
      },
      {
        "id": `M-Hzm3`,
        "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `WHFE8Z`,
    "title": `Рок — это протест`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Таких предложений больше нет!`,
    "fullText": `Товар в отличном состоянии. Это настоящая находка для коллекционера! Не пытайтесь торговаться. Цену вещам я знаю. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Мой дед не мог её сломать. Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Кажется, что это хрупкая вещь. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Пользовались бережно и только по большим праздникам. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Две страницы заляпаны свежим кофе. Кому нужен этот новый телефон, если тут такое... Даю недельную гарантию.`,
    "createdDate": `5/29/2021, 10:44:05 PM`,
    "category": [
      `Железо`,
      `Без рамки`,
      `IT`,
      `Разное`,
      `Кино`,
      `За жизнь`
    ],
    "comments": [
      {
        "id": `7uQQ99`,
        "text": `Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `czW-w0`,
        "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Это где ж такие красоты?`
      },
      {
        "id": `yC15Wc`,
        "text": `Планируете записать видосик на эту тему? Согласен с автором! Это где ж такие красоты?`
      },
      {
        "id": `MfNZAM`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `UW3qCT`,
    "title": `Как собрать камни бесконечности`,
    "announce": `Мой дед не мог её сломать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Если товар не понравится — верну всё до последней копейки. Бонусом отдам все аксессуары. Программировать не настолько сложно, как об этом говорят. Первая большая ёлка была установлена только в 1938 году. Пользовались бережно и только по большим праздникам. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Даю недельную гарантию. Если найдёте дешевле — сброшу цену.`,
    "createdDate": `7/3/2021, 3:15:07 AM`,
    "category": [
      `Посуда`,
      `Кино`,
      `За жизнь`,
      `Деревья`,
      `IT`,
      `Игры`,
      `Железо`,
      `Без рамки`,
      `Журналы`,
      `Разное`,
      `Животные`,
      `Музыка`
    ],
    "comments": [
      {
        "id": `3T9CdM`,
        "text": `Это где ж такие красоты? Плюсую но слишком много буквы!`
      },
      {
        "id": `iYyf5L`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `достигнуть`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`hRg4br`));

});
test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);