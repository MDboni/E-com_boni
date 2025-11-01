import mongoose from "mongoose";


const BrandSchema = new mongoose.Schema({
    brandName:{type:String ,unique:true},
    brandImg:{type:String ,unique:true}
},
{timestamps:true,versionKey:false}
)

const BrandModel = mongoose.model('brands', BrandSchema)
export default BrandModel