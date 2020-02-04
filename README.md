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

## Group(s)
**Create group**
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -X PUT --data '{"name":"test_group","permissions":["READ"]}' http://localhost:3000/group
```

**Get group**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/group/<id>
```

**Get groups**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"limit":10}' http://localhost:3000/groups
```

**Update group**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{<...>}' http://localhost:3000/group
```

**Delete group**
```bash
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/group/<id>
```

## User Group
**Add users to group**
<br>
_Default groups:_ USER, ADMIN
```bash
curl -v -H "Accept: application/json" -H "Content-Type: application/json" -X PUT --data '{"userIds":["ba9e8fd2-7cc9-4eb9-9aad-e33069efbecf","ba9e8fd2-7cc9-4eb9-9aad-e33069efbeca"],"group":"ADMIN"}' http://localhost:3000/user-group/add-users
```
