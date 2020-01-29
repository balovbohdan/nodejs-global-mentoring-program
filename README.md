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
