import { Router } from 'express';
import { userSignIn, userSignOut, userLogIn, userLogOut, getUser, getUserPassword, updateUserDetails } from '../controllers/userController.js';
import { addProduct, getProducts, getSingleProduct, removeProduct, upDateProduct } from '../controllers/productController.js';
import { addToCart, deleteCart, deleteCartProduct, getCart, updateCart } from '../controllers/cartController.js';
import { placeOrder, getOrders, deleteOrder, getSellerOrders } from '../controllers/orderController.js';
import { getSeller, getSellerPassword, sellerLogin, sellerLogout, sellerSignIn, sellerSignOut, sellerView, updateSellerDetails } from '../controllers/sellerController.js';
import { adminLogin, adminLogout, createAdmin, deleteSeller, deleteUser, getSellerDetails, getUserDetails } from '../controllers/adminController.js';

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
router.route('/seller/add-product').post(addProduct);
router.route('/seller/remove-product/:productId').delete(removeProduct);
router.route('/seller/update-product').put(upDateProduct);
router.route('/seller/get-orders/:sellerId').get(getSellerOrders);

//Admin Routes
router.route('/admin/creation').post(createAdmin);
router.route('/admin/login').post(adminLogin);
router.route('/admin/logout').post(adminLogout);
router.route('/admin/user-view').get(getUserDetails);
router.route('/admin/user-delete/:userId').delete(deleteUser);
router.route('/admin/seller-view').get(getSellerDetails);
router.route('/admin/seller-delete/:sellerId').delete(deleteSeller);

export default router;