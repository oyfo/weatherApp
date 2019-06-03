# weatherApp

Install and start mongoDB instance.

Make sure that `src/config/dbconf.json` points to your database.

update `src/config/apiid.json` with correct key.

```
npm install

node server.js
```

Simple front-end available at http://localhost:9000/

TO DO:
- more tests
- need to create other config for unit tests - tries to connect to database during unit tests
- need to mock mongoDB better