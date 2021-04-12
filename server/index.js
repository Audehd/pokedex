const express = require("express");
const morgan = require("morgan");

const app = express();

const {
  getUserByEmail,
  addUser,
  loginUser,
} = require("./handlers/Userhandlers");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// User Endpoints _____________

app.get("/users/user/:id", getUserByEmail);

app.post("/users", addUser);

app.post("/users/login", loginUser);

//_____________________________

// handle 404s
app.use((req, res) => res.status(404).type("txt").send("🤷‍♂️"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
