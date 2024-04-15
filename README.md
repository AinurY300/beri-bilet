```
npm install
npm run dev
```

## **Beribilet** — [**beri-bilet.vercel.app**](beri-bilet.vercel.app)

**Beribilet** — это тестовое задание от [**Академии Абдрашитова**](https://www.abdrashitov.pro/). Наверное это самая интересная тестовая работа, которую я делал. Задание можно посмотреть по этой [**ссылке**](https://docs.google.com/document/d/1Ib1r_6m4Y_Wj4Z0zTpqxoL0fCee5Ppky/edit#heading=h.6xyyp35fj2cq).

### Технологический стек

Изначально я планировал сделать работу на [**Nuxt**](https://nuxt.com/), так как с ним я уже знаком, тем более там есть несколько интересных модулей для работы API.

Через пару дней я понял, что [**Vue**](https://vuejs.org/) меня уже не так привлекает как [**React**](https://react.dev) и JSX. Я принял решение начать всё заново. В качестве фреймворка выбрал [**Next.js**](https://nextjs.org/) в связке с UI библиотекой [**shadcn**](https://ui.shadcn.com/)

### Проблемы

К сожалению я не успел вовремя разобраться как делать запросы по данному маршруту ([**Документация**](https://support.travelpayouts.com/hc/ru/articles/203956173-API-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0-%D0%B0%D0%B2%D0%B8%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2-Aviasales-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B2-%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8))

```
http://api.travelpayouts.com/v1/flight_search
```

Который способен вернуть абсолютно все данные, необходимые для выполнения задания, такие как IATA-коды пересадок, данные о багаже, класс и поиск с учётом количества пассажиров.

Возможно это из-за правила №4:

- "Запрещено использовать запросы с localhost IP адресами (127.0.0.1 - 127.255.255.255)".
  Хотя я даже пытался сделать запросы через [**Postman**](https://www.postman.com/), но всё равно получал ошибку 403 (Forbidden).

Вместо этого я решил использовать запрос по адресу ([**Документация**](https://support.travelpayouts.com/hc/ru/articles/203956163-Aviasales-API-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0-%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B4%D0%BB%D1%8F-%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B))

```
https://api.travelpayouts.com/aviasales/v3/grouped_prices
```

Но этот запрос не возвращает все данные о рейсе. Например вместо подробной информации о пересадках он возвращает только их количество, информацию о классе и багаже он не возвращает вовсе. По этой причине я не реализовал (пока что) всё то, что требовалось в задании.

### Контакты

- **Электронная почта:** yarulinainur@gmail.com
- **Телефон:** +7 (906) 957-34-83
- **Telegram:** [@yarulinainur](https://t.me/yarulinainur)
- **WhatsApp:** [+7 (906) 957-34-83](https://wa.me/79069573483)
- **Вконтакте:** [yarulinainur](https://vk.com/yarulinainur)
- **HeadHunter** [Резюме](https://seversk.hh.ru/resume/cc083949ff0b8eed430039ed1f714f61723771)
