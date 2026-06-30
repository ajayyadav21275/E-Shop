const Pool = require('../config/db');


const getOrderItems = async (req,res)=>{
    const order_id = req.params.order_id;
    try{
        const result = await Pool.query(`SELECT * FROM orderitem WHERE order_id = $1,[order_id]`);
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const DeleteOrderItem = async (req,res)=>{
    const id = req.params.id;
    try{
        const result = await Pool.query(`DELETE FROM orderitem WHERE id = $1 RETURNING *`,[id]);
        if(result.rows.length ===0){
            return res.status(404).json({
                message: "Order item not found"
            });
        }
        res.status(200).json({
            message: "Order item deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
    const updateOrderItem = async (req,res)=>{
        const id = req.params.id;
        const {quantity} =req.body;
        try{
            const result = await Pool.query(`UPDATE orderitem SET quantity = $1 WHERE id = $2 RETURNING *`,[quantity,id]);
            if(result.rows.length === 0){
                return res.status(404).json({
                    message:"Order item not found"
                })
            }
        }
        catch(err){
            res.status(500).json({
            message:"Internal server error",err
            })
        }
    }
module.exports = { DeleteOrderItem, getOrderItems,updateOrderItem };