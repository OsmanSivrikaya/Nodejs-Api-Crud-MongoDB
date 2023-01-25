const todo = require("../models/todoModel")

const todoAdd = async (req, res) =>{
    try {
        const _todo = await todo.findOne({name : req.body.name})
        if(_todo){
            return res.status(400).json({
                success: false,
                message: "Bu İsimde Kayıt Mevcut"
            })
        }

        const todoAdd = new todo(req.body)
        await todoAdd.save()
        .then(()=>{
            return res.status(201).json(todoAdd)
        })
        .catch((err) =>{
            return res.status(400).json({
                success:false,
                message:"Kayıt Oluşturulurken Hata Çıktı : " + err
            })
        })
    } catch (error) {
        //sunucu ile ilgili hata olduğu için 500 hata kodunu dönüyoruz
        return res.status(500).json({
            success:false,
            message:"Kayıt Oluşturulamadı !"
        })
    }
}

const todoGetAll = async(req, res) =>{
    const {page} = req.query
    const limit = 2 //sayfaya gelicek veri sayısı
    const skip = Number(page - 1) * limit //sonraki sayfaya geçilicek skip
    try {
        const todoData = await todo.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success:true,
            data:todoData
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayıtlar Getirilemedi! " + error
        })
    }
}

const todoUpdate = async(req, res) =>{
    const { id } = req.params
    try {
       const todoUpdate = await todo.findByIdAndUpdate(id, req.body)
       if(todoUpdate){
        return res.status(200).json({
            success:true,
            message:"Güncelleme Başarılı"
        })
       }
       else{
        return res.status(400).json({
            success:false,
            message:"Kayıt Güncellenemedi"
        })
       }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayıt Güncellenemedi !"
        })
    }
}

const todoDelete = async(req, res) =>{
    const { id } = req.params
    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if(todoDelete){
            return res.status(200).json({
                success:true,
                message:"Silme İşlemi Başarılı"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Silme İşlemi Başarısız"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Silme İşlemi Başarısız !"
        })
    }
}

const todoGet = async(req, res) =>{
    const { id } = req.params
    //const todoGet = todo.findOne({_id : id}) farklı kullanım şekli
    const todoGet = await todo.findById(id)
    try {
        if(todoGet)
        {
            return res.status(200).json(todoGet)
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Veri Getirilemedi"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Veri Getirilemedi : " + error
        })
    }
}
module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}