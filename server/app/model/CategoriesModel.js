import mongoose from "mongoose";


const CategoriesScema = new mongoose.Schema({
    CategoryName:{type:String ,unique:true},
    CategoryImg:{type:String ,unique:true}
},
{timestamps:true,versionKey:false}
)

const CategoriModel = mongoose.model('categories',CategoriesScema)
export default CategoriModel