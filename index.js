const express = require("express");
const app = express();
const UserController = require('./src/controller/userController');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require(`dotenv`).config();

app.get("/", UserController.findAll);
app.get("/find-by-id/:Id", UserController.findByID);
app.post("/add-user", UserController.create);
app.put("/update-user/:Id", UserController.update);
app.delete("/delete-user/:Id", UserController.deleteByID);
app.listen(process.env.PORT, () => {
  	console.log(`Example app listening on port ${process.env.PORT}`);
});