const mongoose=require('mongoose')

const TodoSchema=mongoose.Schema({
    titel:String,
    status:Boolean,
    userId:String    
})

const TodoModel=mongoose.model("Todo", TodoSchema)

module.exports={
    TodoModel
}