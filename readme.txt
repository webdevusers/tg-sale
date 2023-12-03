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

