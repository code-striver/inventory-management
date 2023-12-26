const validateMiddleware = (req, res, next)=>{
  console.log(req.body)
    let errors =[]
      const {name, desc, price, imageUrl} = req.body
      if(!name|| name.trim()==''){
        errors.push('Name is required!')
      }
      if(price<1){
        errors.push('Price must be a positive value')
      }
      // try{
      //   const validUrl = new URL(imageUrl)
      // }catch(err){
      //   errors.push('URL is invalid')
      // }
      if(errors.length>0){
        return res.render('new-product', {errorMessage:errors[0]})
      }else{
        next()
      }
}
export default validateMiddleware;