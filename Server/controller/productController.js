const Pool = require("../config/db");
const fs = require("fs");
const path = require("path");


const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
   
    const offset = (page - 1) * limit;

    const whereClauses = ["p.title ILIKE $1"];
    const whereParams = [`%${search}%`];

    if (categoryId) {
      whereClauses.push("p.category_id = $" + (whereParams.length + 1));
      whereParams.push(categoryId);
    }

    const countQuery = `SELECT COUNT(*) AS count FROM products p WHERE ${whereClauses.join(" AND ")}`;
    const totalResult = await Pool.query(countQuery, whereParams);

    const query = `SELECT
      p.id AS id,
      p.id AS product_id,
      p.title,
      p.image,
      c.id AS category_id,
      c.name AS category_name,
      pv.id AS variant_id,
      pv.size,
      pv.color,
      pv.stock,
      pv.price,
      pv.discount_percent,
       (pv.price - (pv.price * pv.discount_percent / 100)) AS final_price
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    WHERE ${whereClauses.join(" AND ")}
    LIMIT $${whereParams.length + 1} OFFSET $${whereParams.length + 2}`;

    const result = await Pool.query(query, [...whereParams, limit, offset]);

    res.status(200).json({
      success: true,
      products: result.rows,
      totalProducts: Number(totalResult.rows[0].count),
      currentPage: page,
      totalPages: Math.ceil(Number(totalResult.rows[0].count) / limit),
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Pool.query(
      `SELECT
         p.id,
         p.title,
         p.image,
         p.category_id,
         c.name AS category_name,
         pv.id AS variant_id,
         pv.size,
         pv.color,
         pv.stock,
         pv.price,
         pv.discount_percent
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_variants pv ON p.id = pv.product_id
       WHERE p.id = $1
       LIMIT 1`,
      [id]
    );

    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const createProduct = async (req, res) => {
  try {
    const {
      title,
      category_id,
      size,
      color,
      stock,
      price,
      discount_percent
    } = req.body;
     console.log(req.body)
    const image = req.file ? req.file.filename : null;

    // Product Save
    const productResult = await Pool.query(
      `INSERT INTO products
      (title, image, category_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, image, category_id]
    );

    const productId = productResult.rows[0].id;

    // Variant Save
    const variantResult = await Pool.query(
      `INSERT INTO product_variants
      (product_id, size, color, stock, price , discount_percent)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [productId, size, color, stock, price, discount_percent]
    );

    res.status(201).json({
      message: "Product and Variant created successfully",
      product: productResult.rows[0],
      variant: variantResult.rows[0]
    });

  } catch (err) {
  
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const  id  = req.params.id;

    const result = await Pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category_id,
      size,
      color,
      stock,
      price,
      discount_percent
    } = req.body;

    // Old Product image //
    const oldProduct = await Pool.query(
      "SELECT image FROM products WHERE id = $1",
      [id]
    );

    if (oldProduct.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const oldImage = oldProduct.rows[0].image;
    let image = oldImage;

    // New image uploaded //
    if (req.file) {
      const imagePath = path.join(
        __dirname,
        "../Allimages",
        oldImage
      );

      if (oldImage && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      image = req.file.filename;
    }

    // Update Product //
    const productResult = await Pool.query(
      `UPDATE products
       SET title = $1,
           image = $2,
           category_id = $3
       WHERE id = $4
       RETURNING *`,
      [
        title,
        image,
        category_id,
        id
      ]
    );

    // Find the existing variant for this product
    const variantCheck = await Pool.query(
      `SELECT * FROM product_variants
       WHERE product_id = $1
       LIMIT 1`,
      [id]
    );

    if (variantCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found"
      });
    }

    const variantId = variantCheck.rows[0].id;

    // Update Variant //
    const variantResult = await Pool.query(
      `UPDATE product_variants
       SET size = $1,
           color = $2,
           stock = $3,
           price = $4,
           discount_percent = $5
       WHERE id = $6
       RETURNING *`,
      [
        size,
        color,
        stock,
        price,
        discount_percent,
        variantId
      ]
    );

    res.status(200).json({
      success: true,
      message: "Product and Variant updated successfully",
      product: productResult.rows[0],
      variant: variantResult.rows[0]
    });

  } catch (error) {
  

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  DeleteProduct,
  updateProducts,
};