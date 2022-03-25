const appRoot=require('app-root-path');
const express=require('express');
const mongoose=require('mongoose');
const router=require(appRoot+'/router');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('dotenv').config();

const uri = process.env.DB_URL||'mongodb://localhost/Project';
const port = process.env.PORT ||9000;

// db
// ----------------------------------------------------------------------
mongoose.connect(uri,{useNewUrlParser :true,useUnifiedTopology: true});
mongoose.connection
            .once('open',()=>{
                console.log('connected');
            })
            .on('error',(error)=>{
                console.log(error);
            })
// ---------------------------------------------------

app.use('',router.router)

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})