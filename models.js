const mongoose = require('mongoose')
const schema = mongoose.Schema


const reportSchema= new schema({
    userID:{
        type : Array,
        required:true,
        
    },
    marketID:{
        type : String,
        required:true,
        
    },
    marketName:{
        type : String,
        required:true,
        
    },
    cmdtyID:{
        type : String,
        required:true,
        
    },

    cmdtyName:{
        type : String,
        required:true,
        
    },
    priceUnit:{
        type : String,
        required:true,
    },
    price:{
        type : Number,
        required:true,
    }, 
    timestamp : { 
        type : String
    }
})

Report = mongoose.model('Report',reportSchema)

module.exports.Report =Report