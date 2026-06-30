const Pool = require('../config/db');
const fs = require("fs");
const path = require("path");

const createCategory = async (req,res)=>{
  const {name,slug,description}= req.body || {};
 const image = req.file ? req.file.filename : null;
   

    try{
     const result = await Pool.query(
         `INSERT INTO categories (name,slug,image,description) VALUES ($1,$2,$3,$4) RETURNING *`,
         [name, slug, image, description]
     );
     res.status(201).json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
    
    }
}
const getAllCategories = async (req,res)=>{
    try{
        const result = await Pool.query(`SELECT *FROM categories ORDER BY ID DESC`);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
        
    }
}

const getCategoryById = async (req, res) => {
    const id = req.params.id || null;
    const name= req.body || null
 console.log("name:",name)
    try {
      if(id){
            const result = await Pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Category not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
      }
      else{
        await Pool.query(`SELECT * FROM categories WHERE name = $1`,[name])
      }
       
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateCategories = async (req, res) => {
  const id = req.params.id;
  const { name, slug, description } = req.body || {};
  const newImage = req.file ? req.file.filename : null;

  try {
    console.log("id:",id)
    console.log(req.body)
    console.log(newImage)
    const oldCategory = await Pool.query(
      `SELECT * FROM categories WHERE id = $1`,
      [id]
    );

    if (oldCategory.rows.length === 0) {
      // Agar new image upload ho chuki hai to delete kar do
      if (newImage) {
        const newImagePath = path.join(
          __dirname,
          "../Allimages",
          newImage
        );

        if (fs.existsSync(newImagePath)) {
          fs.unlinkSync(newImagePath);
        }
      }

      return res.status(404).json({
        message: "Category not found",
      });
    }

    const oldImage = oldCategory.rows[0].image;

    // New image hai to use karo, warna old image rakho
    const image = newImage || oldImage;

    const result = await Pool.query(
      `UPDATE categories
       SET name = $1,
           slug = $2,
           image = $3,
           description = $4
       WHERE id = $5
       RETURNING *`,
      [name, slug, image, description, id]
    );

    // Update success hone ke baad purani image delete karo
    if (newImage && oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "../Allimages",
        oldImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.status(200).json({
      message: "Category updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    // Error aaya to new uploaded image delete kar do
    if (newImage) {
      const newImagePath = path.join(
        __dirname,
        "../Allimages",
        newImage
      );

      if (fs.existsSync(newImagePath)) {
        fs.unlinkSync(newImagePath);
      }
    }

    return res.status(500).json({
      message: err.message,
    });
  }
};
 // delete category //


const deleteCategories = async (req,res)=>{
    const id = req.params.id;
    
    try{
    
        const result = await Pool.query(`DELETE FROM categories WHERE id = $1 RETURNING *`,[id]);
    
        if(result.rows.length === 0){
            res.status(404).json({error:"Categories not found"});
        } else {
            res.status(200).json({ message: "Category deleted", data: result.rows[0] });
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
};

const getProductsByCategory = async (req,res) =>{
    const id = req.params.id;
    try{
        const result = await Pool.query(`SELECT *FROM products WHERE category_id = $1`,[id]);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategories,
  deleteCategories,
};