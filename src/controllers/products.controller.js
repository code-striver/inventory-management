import path from "path";
import { ProductModel } from "../models/product.model.js";


 export default class ProductController{
    getProducts(req, res){
    const products =   ProductModel.getProducts();
    return res.render('index', {products:products, userEmail:req.session.userEmail})
      //  return res.sendFile(path.join(path.resolve(), 'src','views', 'products.html'))
    }
    getAddForm(req, res){
      return res.render('new-product',{errorMessage:null, userEmail:req.session.userEmail})
    }
    addNewProduct(req, res){
      const products =   ProductModel.getProducts();
      console.log(`req.file.filename is ${req.file.filename}`)

      const {name, desc, price} = req.body
      const imageUrl = 'images/' + req.file.filename
      ProductModel.add(name, desc, price, imageUrl)
      return res.render('index', {products:products, userEmail:req.session.userEmail})
    }
    getUpdateProduct(req, res, next){
      const {id} = req.params;
      const productFound = ProductModel.getById(id);
      if(productFound){
        res.render('update-product', {product:productFound, errorMessage:null, userEmail:req.session.userEmail})
      }else{
        res.status(401).send('Product Not Found')
      }
    }
    postUpdateProduct(req, res, next){
      const {id, name, desc, price, imageUrl} = req.body
      const updatedProduct = req.body
      ProductModel.updateProduct(updatedProduct)
      const products =   ProductModel.getProducts();
      return res.render('index', {products:products, userEmail:req.session.userEmail})
    }
    deleteProduct(req, res, next){
      const {id} = req.params;
      const updatedUsers = ProductModel.deleteById(id)
      return res.redirect('/')
    }
}