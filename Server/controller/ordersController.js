const Pool = require("../config/db");


const createOrder = async (req, res) => {
   
  try {
    const { user_id, address_id, total, payment_Method,
      razorpay_order_id, rezorpay_payment_id,razorpay_signature,currency,status,
      items = [] } = req.body;
    const orderUserId = user_id;
     const  payment_method = payment_Method;
    if (!orderUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to place an order.",
      });
    }

    // create order.... //
    const order = await Pool.query(
      `INSERT INTO orders (user_id, total, status, address_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        orderUserId,
        Number(total) || 0,
        "pending",
        address_id,
      ]
    );

    const order_id = order.rows[0]?.id;

    if (!order_id) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order ID.",
      });
    }

    // 2. insert order items
    for (let item of items) {
      await Pool.query(
        `INSERT INTO orderitem
         (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [
          order_id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );
       // stock Update //
  const stockResult =   await Pool.query(`UPDATE product_variants SET stock= stock- $1
           WHERE product_id = $2 
           AND stock >= $1 RETURNING *`,[item.quantity,item.product_id]);

           if (stockResult.rowCount === 0) {
  return res.status(400).json({
    success: false,
    message: "Insufficient stock",
  });
}
    }
     // payment_Method Status Save //


    await Pool.query(
  `INSERT INTO payments 
   (order_id, payment_method, status, currency)
   VALUES ($1, $2, $3, $4)
   RETURNING *`,
  [
    order_id,
    "cod",
    "pending",
    "INR"
  ]
);
 
    // 3. clear cart
    await Pool.query(
      `DELETE FROM cart WHERE users_id = $1`,
      [orderUserId]
    );

    res.json({
      success: true,
      message: "Order placed successfully",
      order: order.rows[0],
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await Pool.query(
      `SELECT * FROM orders WHERE user_id = $1`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//   admin Api ////


const getAllOrders = async (req, res) => {
  try {
   

   const result = await Pool.query(
  `SELECT 
    o.id,
    o.total,
    o.status,

    oi.product_id,
    oi.quantity,
    oi.price,

    p.title,
    p.image,

    u.name AS user_name,
    a.name AS delivery_name

FROM orders o

LEFT JOIN orderitem oi 
ON o.id = oi.order_id

LEFT JOIN products p 
ON p.id = oi.product_id

LEFT JOIN users u
ON o.user_id = u.id

LEFT JOIN address a
ON o.address_id = a.id

ORDER BY o.id DESC`
);
 
    const orders = result.rows.reduce((acc, row) => {
      let order = acc.find((item) => item.id === row.id);

      if (!order) {
  order = {
    id: row.id,
    total: row.total,
    status: row.status,

    user_name: row.user_name,
    delivery_name: row.delivery_name,

    items: [],
  };

  acc.push(order);
}
      if (row.product_id || row.title || row.image || row.quantity || row.price) {
        order.items.push({
          product_id: row.product_id,
          title: row.title || "",
          image: row.image || "",
          quantity: Number(row.quantity) || 0,
          price: Number(row.price) || 0,
        });
      }

      return acc;
    }, []);

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const id  = req.params.id;

    const result = await Pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({

        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
  
      message: "Internal Server Error"
    });
  }
};

const getOrderById = async (req, res) => {

  try {

    const orderId = req.params.order_id || req.params.id;
     console.log(orderId)
    const result = await Pool.query(
      `
      SELECT
        o.id,
        o.total,
        o.status,

        a.name,
        a.phone,
        a.address,
        a.city,
        a.state,
        a.pincode,
        a.country,

        oi.product_id,
        oi.quantity,
        oi.price,

        p.title,
        p.image

      FROM orders o

      LEFT JOIN address a
      ON o.address_id = a.id

      LEFT JOIN orderitem oi
      ON o.id = oi.order_id

      LEFT JOIN products p
      ON oi.product_id = p.id

      WHERE o.id = $1
      `,
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    const firstRow = result.rows[0];

    const orderData = {
      id: firstRow.id,
      total: firstRow.total,
      status: firstRow.status,

      name: firstRow.name || "",
      phone: firstRow.phone || "",
      address: firstRow.address || "",
      city: firstRow.city || "",
      state: firstRow.state || "",
      pincode: firstRow.pincode || "",
      country: firstRow.country || "",

      items: result.rows
        .filter((row) => row.product_id || row.title || row.image || row.quantity || row.price)
        .map((row) => ({
          title: row.title || "",
          image: row.image || "",
          quantity: Number(row.quantity) || 0,
          price: Number(row.price) || 0
        }))
    };

    res.json(orderData);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
}
    // Update Admin Order Controller // 

const updateOrderStatus = async (req, res ) => {

  try {

    const  id  = req.params.id;
    
    const { status } = req.body;
     
    await Pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      `,
      [status, id]
    );

     return res.json({
      id,status,
      success: true,
      message: "Order status updated"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  };

};

module.exports = {createOrder,getOrders,DeleteOrder, getOrderById, getAllOrders, updateOrderStatus};