# Awesome Express.js + MongoDB Project 🚀

Welcome to our fantastic project built with Express.js and MongoDB! 🌟

## API Endpoints 🛣️

### GET Endpoints 📬
- Retrieve a user by Telegram ID: `GET ${link}/user/getuser/?telegramId=${userId}`
- Get all users: `GET ${link}/user/get`

### POST Endpoints 📮
- Add a channel to a specific user's array: `POST ${link}/user/add`
  - Parameters: `itemArrayName`, `telegramId`, `channel`
  - `itemArrayName` options: `itemModeration`, `itemRejected`, `itemSucceffuly`, `itemFavorites`

- Change an item's status between arrays: `POST ${link}/user/change`
  - Parameters: `userId` (Telegram ID), `sourceArrayName`, `destinationArrayName`, `itemId` (item name)

- Update a user's status: `POST ${link}/user/update`
  - Parameters: `telegramId`, `newStatus`

- Create a new user: `POST ${link}/user/create`
  - Parameters: `telegramId`

- Create a new item: `POST ${link}/item/create`
  - Parameters: `name`, `age`, `price`, `category`, `profit`, `comments`, `first_url`, `second_url`, `userID`, `connect`, `status`

- Get items based on status: `POST ${link}/item/get`
  - Parameters: `status` (e.g., "On moderation")

- Update item status: `POST ${link}/item/update`
  - Parameters: `id` (MongoDB _id), `newStatus`

## Important Note 📌
- Item updates are scheduled daily at 00:00 UTC+3.

Enjoy exploring our APIs! Feel free to contribute and make this project even more awesome. 🎉
