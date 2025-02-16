import { Router } from 'express';
import { userLogIn, userLogOut } from '../controllers/userController.js';
import { getProducts, getSingleProduct } from '../controllers/productController.js';
import { addToCart, deleteCartProduct, getCart, updateCart } from '../controllers/cartController.js';

const router = Router();
//Home Page
router.route('/').get(getProducts);

//Product-Details
router.route('/product-details/:id').get(getSingleProduct);

//Cart
router.route('/add-to-cart').post(addToCart);
router.route('/cart-items/:userId').get(getCart);

router.route('/update-cart-qty').put(updateCart);

router.route('/delete-cart/:userId/:delId').delete(deleteCartProduct);

//User Routes
router.route('/user-login').get(userLogIn);
router.route('/user-logout').get(userLogOut);

export default router;