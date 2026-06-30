const express = require("express");
const Pool = require("../config/db");

const getVariants = async(req,res)=>{
    const id = req.params.id;
  try{
    const result = await Pool.query(`SELECT * FROM product_variants WHERE id = $1`,[id]);
       
       res.status(200).json({
        message:"Data fetch successfully",
        data: result.rows[0]
       })
  }
  catch(err){
     console.log("error:",err.message)
    res.status(500).json(err.message)
  }
}

 // CREATE VARIANTS //

const createVariants = async(req,res)=>{
        const {product_id,
                size,
                color,
                stock,
                price,
                discount_percent } = req.body;
                
      try{
                const result = await Pool.query(`INSERT INTO product_variants
(product_id, size, color, stock, price, discount_percent)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *`, [product_id, size, color, stock,price, discount_percent]);
     res.status(200).json({
        message:"Data insert successfully",
        data:result.rows[0]
     })
      }
      catch(error){
         console.log("error:",error.message)
        res.status(500).json({
            message:"internal sever error",
            error:error.message
        })
      }
    
}

//  UPDATE variants //

const updateVariants = async(req,res)=>{
    const id = req.params.id;
    const {
        product_id,
        size,
        color,
        stock,
        price,
        discount_percent} = req.body || [];

        try{
            const result = await Pool.query(`UPDATE product_variants SET product_id = $1,
                size = $2,
                color =$3,
                stock =$4,
                price =$5,
                discount_percent = $6 WHERE id= $7 RETURNING *`,[product_id,size,color,stock,price,discount_percent,id]);
                res.status(200).json({
                    message:"update data successfully",
                    data: result.rows[0]
                })
        }
        catch(err){
            console.log("error:",err.message)
            res.status(500).json(err.message)
        }
}

// DELETE VARIANTS //

const deletevariants = async(req,res)=>{
    const id = req.params.id;
    try{
        const result = await Pool.query(`DELETE FROM product_variants WHERE id = $1 RETURNING * `,[id])
        res.status(200).json("data delete successfully")
    }
    catch(err){
         console.log("error:",err.message)
         res.status(500).json({
            message:"internal sever error",
            err,
         })
    }
}

module.exports ={
    getVariants,
    createVariants,
    updateVariants,
    deletevariants}