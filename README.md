### Launch
**If you are Windows user**
```bash
npm i && npm run start
```
**If you are Mac user**
```bash
npm i && npm run start-mac
```

### Commands
**Create user**
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -X PUT --data '{"age":10,"login":"login@gmail.com","password":"password123"}' http://localhost:3000/user
```

**Get user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/user/<id>
```

**Get auto-suggested users**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"limit":10,"loginSubstring":"login"}' http://localhost:3000/auto-suggested-users
```

**Update user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{<...>}' http://localhost:3000/user
```

**Delete user**
```bash
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/user/<id>
```
# SQL

## Create "users" table and fill it up
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  isDeleted BOOLEAN NOT NULL DEFAULT false,
  login VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age SMALLINT DEFAULT NULL
);

INSERT INTO
  users (id, isDeleted, login, password, age)
VALUES
  (uuid_generate_v4(), false, 'new_login', 'password111', 10),
  (uuid_generate_v4(), false, 'password222', 'password222', 15);
```
