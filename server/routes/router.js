import { Router } from 'express';
import { userSignIn, userSignOut, userLogIn, userLogOut } from '../controllers/userController.js';
import { getProducts, getSingleProduct } from '../controllers/productController.js';
import { addToCart, deleteCartProduct, getCart, updateCart } from '../controllers/cartController.js';
import { placeOrder, getOrders } from '../controllers/orderController.js';

const router = Router();

//Home Page
router.route('/').get(getProducts);

//Product Routes
router.route('/product-details/:id').get(getSingleProduct);

//Cart Routes
router.route('/add-to-cart').post(addToCart);
router.route('/cart-items/:userId').get(getCart);
router.route('/update-cart-qty').put(updateCart);
router.route('/delete-cart/:userId/:delId').delete(deleteCartProduct);

//User Routes
router.route('/user/sign-in').post(userSignIn);
router.route('/user/sign-out').post(userSignOut);
router.route('/user/log-in').post(userLogIn);
router.route('/user/log-out').post(userLogOut);

//Order Routes
router.route('/order').post(placeOrder);
router.route('/get-orders/:userId').get(getOrders);

export default router;