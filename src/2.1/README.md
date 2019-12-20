# Task 2.1

### Launch
```bash
npm i && 
```

### Commands
**Create user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{"age":10,"login":"login","password":"password"}' http://localhost:3000/create-user
```

**Get user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/user/<id>
```

**Update user**
```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" --data '{<...>}' http://localhost:3000/update-user
```
