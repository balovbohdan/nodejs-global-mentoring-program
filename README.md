# Launch
**If you are Windows user**
```bash
npm i && npm run start
```
**If you are Mac user**
```bash
npm i && npm run start-mac
```

# Commands

## User(s)
**Create user**
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -X PUT --data '{"age":10,"login":"login@gmail.com","password":"password123"}' http://localhost:3000/user
```

**Get user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" http://localhost:3000/user/<id>
```

**Get auto-suggested users**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" --data '{"limit":10,"loginSubstring":"login"}' http://localhost:3000/auto-suggested-users
```

**Update user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" --data '{<...>}' http://localhost:3000/user
```

**Delete user**
```bash
curl -X DELETE -H "Content-Type: application/json" -H "Authorization: <jwt_token>" http://localhost:3000/user/<id>
```

## Group(s)
**Create group**
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" -X PUT --data '{"name":"test_group","permissions":["READ"]}' http://localhost:3000/group
```

**Get group**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" http://localhost:3000/group/<id>
```

**Get groups**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" --data '{"limit":10}' http://localhost:3000/groups
```

**Update group**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" --data '{<...>}' http://localhost:3000/group
```

**Delete group**
```bash
curl -X DELETE -H "Content-Type: application/json" -H "Authorization: <jwt_token>" http://localhost:3000/group/<id>
```

## User Group
**Add users to group**
<br>
_Default groups:_ USER, ADMIN
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: <jwt_token>" -X PUT --data '{"userIds":["ba9e8fd2-7cc9-4eb9-9aad-e33069efbecf","ba9e8fd2-7cc9-4eb9-9aad-e33069efbeca"],"group":"ADMIN"}' http://localhost:3000/user-group/add-users
```

## Authorization
**Get token**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"login":"login@gmail.com","password":"password123"}' http://localhost:3000/token
```

# SQL

## Create "user_groups" table
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_groups (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId UUID NOT NULL,
  groupId UUID NOT NULL
);
```

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

## Create "groups" table and fill it up
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE groups (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  permissions varchar(30)[] NOT NULL
);

INSERT INTO
  groups (id, name, permissions)
VALUES
  (uuid_generate_v4(), 'ADMIN', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']),
  (uuid_generate_v4(), 'READ', ARRAY['READ']);
```
