const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Veri Tabananına Bağlantı Başarılı")
}).catch((err)=>{
    console.log("Veri Tabanına Bağlantı Başarıszı: " + err)
})