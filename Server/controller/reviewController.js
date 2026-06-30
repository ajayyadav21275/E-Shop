const Pool = require("../config/db").Pool;

const addReview = async (req,res)=>{
    const userId = req.body.userId;
     const {product_Id,rating,comment} = req.body;
     try{
        await Pool.query(
            `INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4)`
        )
        res.status(201).json({message:"Review added successfully"})
     }
     catch(err){
        console.error(err);
        res.status(500).json({message:"Error adding review"})
     }
}


const getReview = async (req,res)=>{
    const productId = req.params.productId;
    try{
        const result = await Pool.query(
            `SELECT * FROM reviews WHERE product_id = $1`,
            [productId]
        );
        res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Error fetching reviews"});
    }
}

const updateReview = async (req,res)=>{
    id = req.params.id;
    const {rating,comment}= req.body;
    try{
        await Pool.query(
            `UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4`,
            [rating, comment, id, userId]
        );
        res.status(200).json({message:"Review updated successfully"});
    }

    catch(err){
        console.log(err);
        res.status(500).json({message:"Error updating review"});
        
    }
}

const removeReview = async (req,res)=>{
    const id = req.params.id;
    try{
        await Pool.query(`DELETE FROM reviews WHERE id = $1 AND user_id =$2`,[id,userId]);
        res.status(200).json({message:"review removed successfully"});

    }
    catch(err){
        console.log("Error removing review;",err);
        res.status(500).json({message:"Error removing review"});
        
    }
}
module.exports ={addReview,getReview,updateReview,removeReview};