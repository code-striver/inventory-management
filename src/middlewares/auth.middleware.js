
export const auth = (req, res, next)=>{
    if(req.session.userEmail){
        next()
    }else{
        res.render('login', {errorMessage:'You are not logged in!'})
    }
}