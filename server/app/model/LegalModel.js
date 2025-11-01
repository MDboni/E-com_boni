import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({

},
{timestamps:true,versionKey:false}
)

const LegalModel = mongoose.model('legals',DataSchema)
export default LegalModel