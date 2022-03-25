const appRoot = require('app-root-path');
const express = require('express');
const { Report } = require(appRoot+'/models.js');

const router = express.Router();



router.post('/report',async(req,res)=>{
    try {
        if (req.body.marketID && req.body.cmdtyID && typeof(req.body.convFctr)==='number') {
            const report = await Report.findOne({marketID:req.body.marketID,cmdtyID:req.body.cmdtyID});
            const input_data = req.body;
            if (!report) {
                input_data['price'] = input_data['price']/input_data['convFctr'];
                input_data['priceUnit'] = 'Kg';
                input_data['timestamp'] = Date.now();
                delete input_data['convFctr'];
                new_report = new Report(req.body);
                new_report.save()
                            .then((data)=>{
                                res.json({status:"success",reportID:data._id});
                            })            
                            .catch((error)=>{
                                res.json({status:"failure",message:error.message});
                            })
            } else {
                const convFctr_input = req.body.convFctr;
                const price_input = req.body.price;
                const price = price_input/convFctr_input;
                report['userID'].push(req.body.userID);
                report['price'] = (report['price']+price)/2;
                report['timestamp'] = Date.now();
                report.save()
                        .then((data)=>{
                            res.json({status:"success",reportID:data._id});
                        })            
                        .catch((error)=>{
                            res.json({status:"failure",message:error.message});
                        })
            }
        } else {
            res.json({status:"failure",message:"provide a vaild data"});
        };
        
    } catch (error) {
        res.json({status:"failure",message:"provide a vaild data"});
    };

});




router.get('/report',async(req,res)=>{
    try {
        if (req.query.reportID) {
            Report.findById(req.query.reportID)
                                .then((data)=>{
                                    if (!!data) {
                                        res.json(data);
                                    } else {
                                        res.json({status:"failure",message:"something went wrong please try again"});
                                    }
                                })
        } else {
            res.json({status:"failure",message:"something went wrong please try again"});
        };
        
    } catch (error) {
        res.json({status:"failure",message:"something went wrong please try again"});
    };


})



module.exports.router=router;