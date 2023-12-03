GET: ${link}/user/getuser/?telegramId=${userId} - get user
GET: ${link}/user/get - get users

--------------------------------------------------------------------------------------------

POST: ${link}/user/add - Принимает itemArrayName, telegramId, channel
ItemArrayName - Бывают следующие itemModeration, itemRejected, itemSucceffuly, itemFavorites

itemModeration - Массив с каналами которые находятся на модерации
itemRejected - Массив с удаленными
itemSucceffuly - Массив с выставленными товарами
itemFavorites - Массив с избранными

channel - Объект с каналом полностью (Со всеми данными канала)

--------------------------------------------------------------------------------------------

POST: ${link}/user/update - Принимает telegramId, newStatus (Обновление статуса пользователя)
POST: ${link}/user/create - Принимает telegramId (Создает пользователя со статусом User)

Items: 

POST: ${link}/item/create -> Принимает name age price category profit comments first_url second_url userID connect status
POST: ${link}/item/get -> Принимает в body - status (Например: На модерации)
POST: ${link}/item/update -> Принимает id канала заданого монгодб (_id) и newStatus (Новый статус (Например: Отклоненные))
