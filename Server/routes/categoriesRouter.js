const express = require('express');
const categoriesRouter = express.Router();

const {createCategory,getAllCategories,getParentByCategory,updateCategories,
deleteCategories
} = require('../controller/categoriesController');
const { upload } = require('../multer/uploads');

categoriesRouter.post('/register',upload.single("image"), createCategory);
categoriesRouter.get('/', getAllCategories);
categoriesRouter.get('/:id', getParentByCategory);
categoriesRouter.put('/update/:id', upload.single("image"), updateCategories);
categoriesRouter.delete('/del/:id', deleteCategories);
module.exports = categoriesRouter;