const Pool = require("../config/db");


const addToCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { product_id, quantity } = req.body;

    

    if (!product_id || !quantity) {
      return res.status(400).json({ message: "product_id and quantity are required" });
    }
    


    // ensure product exists
    const prodCheck = await Pool.query("SELECT id FROM products WHERE id = $1", [product_id]);
    if (prodCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // if same product already in cart for this user, increment quantity
    const existing = await Pool.query(
      "SELECT id, quantity FROM cart WHERE users_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    let cartId;
    if (existing.rows.length > 0) {
      const newQty = Number(existing.rows[0].quantity || 0) + Number(quantity || 0);
      await Pool.query("UPDATE cart SET quantity = $1 WHERE id = $2", [newQty, existing.rows[0].id]);
      cartId = existing.rows[0].id;
    } else {
      const insert = await Pool.query(
        "INSERT INTO cart (product_id, quantity, users_id) VALUES ($1, $2, $3) RETURNING *",
        [product_id, quantity, user_id]
      );
      if (insert.rows.length === 0) {
        return res.status(400).send("No cart item created");
      }
      cartId = insert.rows[0].id;
    }

    const joined = await Pool.query(
      `SELECT
          c.id,
          p.id as product_id,
          p.title,
          p.image,
          pv.price,
          pv.stock,
          c.quantity
       FROM cart c
       JOIN products p
         ON c.product_id = p.id
       LEFT JOIN product_variants pv
         ON p.id = pv.product_id
       WHERE c.id = $1
       LIMIT 1`,
      [cartId]
    );

    res.json(joined.rows[0]);
  } catch (err) {
    console.error("addToCart error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};
const getCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await Pool.query(
      `SELECT
          c.id,
          p.id as product_id,
          p.title,
          p.image,
          pv.price,
          pv.stock,
          c.quantity
       FROM cart c
       JOIN products p
         ON c.product_id = p.id
       LEFT JOIN product_variants pv
         ON p.id = pv.product_id
       WHERE c.users_id = $1`,
      [user_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("getCart error:", err);

    res.status(500).json({
      message: err.message
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const id= req.params.id;

    await Pool.query("DELETE FROM cart WHERE id = $1", [id]);

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFromCartQuantity = async (req, res) => {
  const id = req.params.id;
  try {
   const quantity = req.body.quantity;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    await Pool.query("UPDATE cart SET quantity = $1 WHERE id = $2", [quantity, id]);

    const joined = await Pool.query(
      `SELECT
          c.id,
          p.id as product_id,
          p.title,
          p.image,
          pv.price,
          pv.stock,
          c.quantity
       FROM cart c
       JOIN products p
         ON c.product_id = p.id
       LEFT JOIN product_variants pv
         ON p.id = pv.product_id
       WHERE c.id = $1
       LIMIT 1`,
      [id]
    );

    res.json(joined.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateFromCartQuantity };