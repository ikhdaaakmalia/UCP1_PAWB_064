import express from 'express';
import bodyParser from 'body-parser';
import pupukRoute from "./router/pupuk.js";
import bibitRoute from "./router/bibit.js";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/bibit", bibitRoute);
app.use("/pupuk", pupukRoute);
app.get("/", (req, res) => {
    console.log(["GET ROUTE"]);
    res.send("Selamat Pagi");
});

app.use(bodyParser.json())
app.listen(PORT, () =>
console.log (
    `Server berjalan di port : http://localhost:${PORT}`))
