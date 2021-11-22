const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "sql10.freemysqlhosting.net",
  user: "sql10453073",
  password: "1WvsEXuZl2",
  database: "sql10453073",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;

  let mysql = "INSERT INTO users ( name, email, tel) VALUES (?, ?, ?)";
  db.query(mysql, [name, email, tel], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;

  let mysql =
    "SELECT * from users WHERE email = ?";
  db.query(mysql, email, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM users";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;
  let mysql = "UPDATE users SET name = ?, email = ?, tel = ? WHERE id = ?";
  db.query(mysql, [name, email, tel, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM users WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});