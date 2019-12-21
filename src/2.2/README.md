# Task 2.1

### Launch
**If you are Windows user**
```bash
npm i && npm run start2.2
```
**If you are Mac user**
```bash
npm i && npm run start-mac2.2
```

### Commands
**Create user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"age":10,"login":"login@login.com","password":"password42342"}' http://localhost:3000/create-user
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
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{<...>}' http://localhost:3000/update-user
```

**Delete user**
```bash
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/delete-user/<id>
```
