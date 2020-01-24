## базовые объекты (основны объекты используемые в ответах из api методов)

### Юзер
```js
{
        id: 1,
        name: "имя",
        about: "о себе",
        birthday: "2012-07-22",
        gender: "1", // 1 - муж, 2 - жен
        food_preferences: ["1", "2", "3"],  // Европейская кухня - 1, Азиатская кухня - 2, Мексиканская кухня - 3
        drink_preferences: ["1", "2", "3"], // алк - 1, безалк - 2, слабоалк - 3
        is_subscribed: true, // подписан на уведомления - true/false
        avatar: "test.png", // имя файла аватара, а не полный путь
        geolocation: true, // разрешил геолокацию - true/false
        city: "Москва", // адрес текстом
        lat: 0, // адрес координаты
        lng: 0, // адрес координаты
        // возвращаем только для юзера приложения
        auth_status: "2", // 0 - гость, 1 - авторизован, но профиль не заполнен, 2 - авторизован и профиль заполнен
        // возвращаем для всех кроме юзера приложения
        friend_status: "1", // 0 - мы не друзья, 1 - отправил мне запрос на дружбу, 2 - я отправил ему запрос, 3 - мы друзья
        
        // возвращаем для всех кроме юзера приложения
        event_requests: [ // запросы на участие в моих событиях от данного юзера
                {
                    "id": 1, // id моего события
                    "title": "название моего события"
                },
                ...
        ],
        info: {
            friends: 0, // кол-во друзей юзера
            my_events: 0, // кол-во событий, созданных юзером
            participate: 0, // кол-во событий, в которых юзер участвует (не созданных юзером)
            my_requests: 0, // кол-во событий, в которые юзер отправил запрос на участие
            // возвращаем только для юзера приложения
            unread_messages: 0, // кол-во не прочитанных сообщений (личных и в общем чате событий)
            // возвращаем только для юзера приложения
            unread_notifications: 0 // кол-во непросмотренных оповещений
        }
}
```

### Событие
```js
{
        id: 1,
        title: "название события",
        about: "текст - описание события",
        datetime: "2018-06-02 20:00", // дата начала
        address: "полный адрес текстом",
        lat: 0, // адрес координаты
        lng: 0, // адрес координаты
        category: [1, 2, 3], // массив id категорий
        food_preferences: [...], // то же самое, что в User
        drink_preferences: [...], // то же самое, что в User
        males_number: 0, // кол-во уже участвующих мужчин
        females_number: 0, // кол-во уже участвующих женщин
        max_males_number: 0, // максимальное кол-во мужчин
        max_females_number: 0, // максимальное кол-во женщин
        picture: "", // имя файла изображения, а не полный путь
        is_favorite: true, // добавлено в избранное true/false
        status: "1", // 0 - я не имею отношения к событию, 1 - я отправил заявку на участие, 2 - мою заявку отклонили, 3 - мою заявку подтвердили, 4 - я создал это событие
        owner_id: 1 // id создателя события
}
```

### Сообщение в чате
```js
{
        id: 1,
        text: "текст сообщения",
        user_id: 1, // id отправителя
        datetime: "2018-06-02 20:00", // время отправки
        is_local: false // при отправке с сервера всегда false
}
```

### Категория события
```js
{
        id: 1,
        title: "название категории"
}
```

### Оповещение
```js
{
        id: 1,
        type: 1, // 1 - поступила заявка от юзера на участие в моем событии, 2 - мою заявку на участие в событии одобрили, 4 - пришел запрос в друзья от юзера, 5 - юзер принял мой запрос в друзья
        is_read: true, // прочитано мною true/false
        
        // заполняется при type: 1, 4, 5
        user_id: 1, // id юзера
        // заполняется при type: 1, 4, 5
        user_name: "имя юзера",
        
        // заполняется при type: 1, 2
        event_id: 1, // id события
        // заполняется при type: 1, 2
        event_name: "название события"
}
```

### Сообщение на странице "Сообщения". (на странице показываются как личные сообщения, так и в общих чатах в событиях)
```js
{
        entity_type: 1, // 1 - событие (сообщение из общего чата события), 2 - юзер (личное сообщение)
        entity_id: 1, // id юзера/события. Зависит от entity_type
        entity_name: "имя юзера/название события", // Зависит от entity_type
        entity_image: "аватар/картинка события", // название файла, а не полный путь. Зависит от entity_type
        last_message_text: "текст последнего сообщения в чате",
        last_message_datetime: "2018-06-02 20:00", // время отправки последнего сообщения в чате
        unread_message_number: "12" // кол-во непрочитанных мною сообщений в чате
}
```
