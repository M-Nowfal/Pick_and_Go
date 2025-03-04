import { Router } from 'express';
import { userSignIn, userSignOut, userLogIn, userLogOut, getUser, getUserPassword, updateUserDetails } from '../controllers/userController.js';
import { getProducts, getSingleProduct } from '../controllers/productController.js';
import { addToCart, deleteCart, deleteCartProduct, getCart, updateCart } from '../controllers/cartController.js';
import { placeOrder, getOrders, deleteOrder } from '../controllers/orderController.js';
import { getSeller, getSellerPassword, sellerLogin, sellerLogout, sellerSignIn, sellerSignOut, sellerView, updateSellerDetails } from '../controllers/sellerController.js';

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
router.route('/delete-ordered-cart/:userId').delete(deleteCart);

//User Routes
router.route('/user/sign-in').post(userSignIn);
router.route('/user/sign-out').post(userSignOut);
router.route('/user/log-in').post(userLogIn);
router.route('/user/log-out').post(userLogOut);
router.route('/getUser/:userId').get(getUser);
router.route('/user-password/:userId/:pass').get(getUserPassword);
router.route('/update-user-details/:userId').put(updateUserDetails);

//Order Routes
router.route('/order').post(placeOrder);
router.route('/get-orders/:userId').get(getOrders);
router.route('/delete-order/:orderId').delete(deleteOrder);

//Seller Routes
router.route('/getSeller/:sellerId').get(getSeller);
router.route('/seller/sign-in').post(sellerSignIn);
router.route('/seller/sign-out/:sellerId/:pass').get(sellerSignOut);
router.route('/seller/log-in').post(sellerLogin);
router.route('/seller/log-out/:sellerId/:pass').get(sellerLogout);
router.route('/seller-password/:sellerId/:pass').get(getSellerPassword);
router.route('/update-seller-details/:sellerId').put(updateSellerDetails);
router.route('/seller/view/:sellerId').get(sellerView);
router.route('/seller/add-product').post();
router.route('/seller/remove-product').delete();

export default router;