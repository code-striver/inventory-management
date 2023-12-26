import { name } from "ejs"
import UserModel from "../models/user.model.js"
import { ProductModel } from "../models/product.model.js"

export default class UserController{
    getRegister(req, res){
        res.render('register', {})
    }
    getLogin(req, res){
        res.render('login', {errorMessage:null})
    }
    postRegister(req, res){
        const {name, email, password} = req.body
        //add a validation middleware
        UserModel.add(name, email, password)
        res.render('login',{errorMessage:null})
    }
    postLogin(req, res){
        const {email, password} = req.body;
        const registeredUser = UserModel.isValidUser(email, password)
        if(registeredUser){
            req.session.userEmail = registeredUser.email
            const products =   ProductModel.getProducts();
           return res.render('index',{products:products, userEmail:req.session.userEmail})
        }else{
           return res.render('login', {errorMessage:'Invalid email id or password'})
        }
    }
    logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                console.log(`error while logging out ${err}`)
            }else{
                res.render('login', {errorMessage:null})
            }
        })
    }
}