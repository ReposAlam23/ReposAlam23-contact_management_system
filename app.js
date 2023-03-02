const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const SCHEMA = require("./models/SCHEMA")
const conn = require("./connection/connection")
conn()

//=======================================
app.get("/", (req,res)=>{
    res.send("workding fine")
})

// crating post api;=====================
app.post("/v1/contacts", async(req, res)=>{
    try{
        const {firstName, lastName, email, phone} = req.body;    
        const detailsCreated = await SCHEMA.create(req.body)
        res.status(201).json({
            status: "successfuly created",
            detailsCreated
        })

    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

//==============get api====================

app.get("/v1/contacts", async(req, res)=>{
    try{
        const data = await SCHEMA.find()
        console.log(data);
        res.status(200).json({
            status: "success",
            data
        })
    }catch(e){
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

//====get a specific contacts =================

app.get("/v1/contacts/:id", async(req, res)=>{
    try{
        const userId = req.params
        const userFecthed = await SCHEMA.findOne({_id: userId.id})
        res.status(200).json({
            status: "success",
            userFecthed
        })

    }catch(e){
        res.status(404).json({
            status: "fiald",
            message: "id not found"
        })
    }
})

//======= delete specific id===========

app.delete("/v1/contacts/:id", async(req,res)=>{
    try{
        const userId = req.params
        console.log(userId);
        const deleteUser = await SCHEMA.deleteOne({_id: userId.id})
        console.log(deleteUser)
        res.status(204).json({
            status: "deleted"
        })

    }catch(e){
        res.json({
            message: e.message
        })
    }
})

//============== update a specific id ==========

app.put("/v1/contacts/:id", async(req, res)=>{
    try{
        const body = req.body
        const updateddata = await SCHEMA.updateOne({_id: req.params.id},  body)
        res.status(204).json()

    }catch(e){
        res.status(404).json({
            error: "There is no contact with that id"          
        })
    }
})

//============  Update a specific contact with partial data
app.patch("/v1/contacts/:id", async(req,res)=>{
    try{       
        const updatedData = await SCHEMA.updateOne({_id: req.params.id},req.body)
        console.log(updatedData);
        res.json({
            message: "success"
        })

    }catch(e){
        res.status(404).json({           
            error: "There is no contact with that id",
            message: e.message        
        })
    }
})

app.listen("4000", ()=>console.log("server is runnign at port 4000"))


 