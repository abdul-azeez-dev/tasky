# Tasky
#### A task management app with user authentication and authorization

### Installation

Install npm packages for tasky-frontend and tasky-backend, refer below command:

> npm install

### Configuration

- FInd the database file in` tasky-backend/db/tasky_db.sql`

- Go to `tasky-backend/utils/db.js` and replace with your database credentials

- Go to .env and insert your secret key for JWT Authentication (You insert any  random generated hash key string)

### Run

To run both front end and backend use the below command:
> npm start

#### Default users

There will be four users (Super admin, Admin and 2 Users) created initially, you can remove them later(except Super admin)

##### Credentials
> Superadmin - username: sadmin / pwd: 1234
> Admin - admin1 / 1111
> User1 - user1 / 1111
> User2 - user2 / 1111
