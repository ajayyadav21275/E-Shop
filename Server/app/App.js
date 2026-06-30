const AuthRouter = require('../routes/authRouter');
const CartRouter = require('../routes/cartRouter');
const OrderRouter = require('../routes/orderRouter');
const ProductRouter = require('../routes/productRouter');
const WishlistRouter = require('../routes/wishlistRouter');
const ReviewRouter = require('../routes/reviewController');
const categoriesRouter = require('../routes/categoriesRouter');
const AddressRouter = require('../routes/addressRouter');
const  variantsRouter  = require('../routes/variants.Router');

module.exports = (app) => {
  app.use('/web', AuthRouter);
  app.use('/web/cart', CartRouter);
  app.use('/web/order', OrderRouter);
  app.use('/web/products', ProductRouter);
  app.use('/web/wishlist', WishlistRouter);
  app.use('/web/address', AddressRouter);
  app.use('/web/review', ReviewRouter);
  app.use('/web/categories', categoriesRouter);
  app.use('/web/variants', variantsRouter )
};