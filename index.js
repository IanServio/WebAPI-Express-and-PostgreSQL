import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { selectUsers, selectUser, insertUser, updateUser, deleteUser } from './database.js';

const port = process.env.PORT;

const app = express();

app.use(express.json())

app.get("/", (req, res)=>{
    res.json({
        msg: "Funcionando"
    })
})

app.get("/users/:id", async (req, res) => {
    const client = await selectUser(req.params.id);
    res.json(client);
});

app.get("/users", async (req, res) => {
    const clients = await selectUsers();
    res.json(clients);
});

app.post("/users", async (req, res) => {
    await insertUser(req.body);
    res.sendStatus(201);
});

app.patch("/users/:id", async (req, res)=>{
    await updateUser(req.params.id, req.body)
    res.sendStatus(200);
});

app.delete("/users/:id", async (req, res)=>{
    await deleteUser(req.params.id)
    res.sendStatus(204);
});

app.listen(port)

console.log("BACK-END RODANDO")
