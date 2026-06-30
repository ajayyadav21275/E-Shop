const Pool = require("../config/db");

const AddAddress = async (req, res) => {
    
  const userId = req.user.id;
 
  const {
    name,
    phone,
    address,
    city,
    state,
    pincode,
    country
  } = req.body;

  try {
    const result = await Pool.query(
      `INSERT INTO address 
      (user_id, name, phone, address, city, state, pincode, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [userId, name, phone, address, city, state, pincode, country]
    );

    res.status(201).json({
      message: "Address added successfully",
      address_id: result.rows[0]?.id ?? null,
      id: result.rows[0]?.id ?? null,
    });
  } catch (err) {
    console.log("Error adding address:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAddress = async (req,res)=>{
    const userId = req.user.id;
    try {
        const result = await Pool.query(
            `SELECT * FROM address WHERE user_id = $1`,
            [userId]
        )
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log("Error fetching address:",err);
        res.status(500).json({message:"Internal server error"});
    }
};


const UpdateAddress = async (req,res)=>{
    const AddressId = req.params.id;
    const {street, city, state, pincode}= req.body;
    try{
        await Pool.query(
            `UPDATE address SET address = $1, city = $2, state = $3, pincode = $4 WHERE id = $5 AND user_id = $6`,
            [street, city, state, pincode, AddressId, req.user.id]
        );
        res.status(200).json({message:"Address updated successfully"});
    }
    catch(err){
        console.log("Error updating address:",err);
        res.status(500).json({message:"Internal server error"});
    }
}

const RemoveAddress = async (req,res)=>{
    const addressId = req.params.id;
    try{
        await Pool.query(`DELETE FROM address WHERE id = $1 AND user_id = $2`, [addressId, req.user.id]);
        res.status(200).json({message:"Address removed successfully"});
    }
    catch(err){
        console.log("Error removing address:",err);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports = { AddAddress, GetAddress, UpdateAddress, RemoveAddress };