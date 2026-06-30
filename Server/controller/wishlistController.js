const Pool = require("../config/db");

const AddToWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    try {
        const check = await Pool.query(
            "SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2",
            [userId, productId]
        );

        if (check.rows.length > 0) {
            return res.status(400).json({
                message: "Product already in wishlist"
            });
        }

        await Pool.query(
            "INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2)",
            [userId, productId]
        );

        res.status(201).json({
            message: "Product added to wishlist"
        });

    } catch (error) {
        console.error("Error adding to wishlist:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


const GetWishlist = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await Pool.query(
            `
            SELECT
                w.id AS wishlist_id,
                p.id,
                p.name,
                p.description,
                p.price,
                p.image
            FROM wishlist w
            JOIN products p
            ON w.product_id = p.id
            WHERE w.user_id = $1
            ORDER BY w.created_at DESC
            `,
            [userId]
        );

        res.status(200).json({
            success: true,
            count: result.rows.length,
            wishlist: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const RemoveFromWishlist = async (req,res) =>{
    const userId = req.user.id;
    const productId = req.params.id;
    try{
        const check = await Pool.query(`SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
        if(check.rows.length ===0){
            return res.status(404).json({message:"Product not found in wishlist"})

        }
        await Pool.query(`DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
        res.status(200).json({message:"Product removed from wishlist"})
    }
     catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"})
     }
}

module.exports = { AddToWishlist, GetWishlist, RemoveFromWishlist };