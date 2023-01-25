const express = require("express") //express paketini projeye dahil ediyor
const app = express();
require("dotenv").config(); //env projeye dahil ediliyor
require("./src/config/databaseConnection")
const port = process.env.PORT || 5001 //port nosunu bulamazsa 5001 i ata
const todoRouter = require("./src/routers/todoRouter") //todoRoterı çağırma
app.use(express.json())//postmandan json veri göndermek için 

app.use("/api",todoRouter)

app.get("/", (req, res) =>{
    res.send("Hoşgeldiniz")
})

app.listen(port, ()=>{
    console.log(`Server ${port} Portundan Başlatıldı ...`)
})