const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("Respon Node JS Berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
  console.log("Berhasil Terkoneksi Dengan Database")
);

const Users = require("./models/users");

app.post("/crud", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new Users({
      username,
      email,
      password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/crud", async (req, res) => {
  try {
    const getAllUser = await Users.findAll({});
    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await Users.findOne({
      where: { id: id },
    });
    res.json(getUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Users.destroy({
      where: { id: id },
    });

    await deleteUser;
    res.json("Berhasil di Hapus");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/crud/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;
    const updateUser = await Users.update(
      {
        username,
        email,
        password,
      },
      { where: { id: id } }
    );

    await updateUser;

    res.json("Berhasil di Update");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(4500, () => console.log("Port Berjalan di 5000"));
