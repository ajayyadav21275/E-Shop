const express = require('express');
const categoriesRouter = express.Router();

const {createCategory,getAllCategories,getProductsByCategory,updateCategories,
deleteCategories
} = require('../controller/categoriesController');
const { upload } = require('../multer/uploads');

categoriesRouter.post('/register',upload.single("image"), createCategory);
categoriesRouter.get('/', getAllCategories);
categoriesRouter.get('/:id', getProductsByCategory);
categoriesRouter.put('/update/:id', upload.single("image"), updateCategories);
categoriesRouter.delete('/del/:id', deleteCategories);
module.exports = categoriesRouter;