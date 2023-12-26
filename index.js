import express from 'express'
import path from 'path'
const server = express();

import ejsLayouts from 'express-ejs-layouts'
import UserController from './src/controllers/user.controller.js';
import ProductController from './src/controllers/products.controller.js';
import validateMiddleware from './src/middlewares/validateFormRequest.js';
import { fileUploadMiddleware } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
server.use(cookieParser())
server.use(setLastVisit)
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'))
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
server.use(cookieParser())
server.use(setLastVisit)
server.use(ejsLayouts)
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
//1. create an instance of the class ProductController to call its method
const productController = new ProductController();
const userController = new UserController()
server.get('/', auth, productController.getProducts)
server.get('/add-product', auth, productController.getAddForm)
server.get('/update-product/:id', auth, productController.getUpdateProduct)
server.post('/', auth, fileUploadMiddleware.single('imageUrl'), validateMiddleware, productController.addNewProduct)
server.post('/update-product', auth, productController.postUpdateProduct)
server.get('/delete-product/:id', auth, productController.deleteProduct)
server.get('/register', userController.getRegister)
server.get('/login', userController.getLogin)
server.post('/register', userController.postRegister)
server.post('/login', userController.postLogin)
server.get('/logout', userController.logout)
server.listen(3400, ()=>{
    console.log('server is listening at port number 3400')
})