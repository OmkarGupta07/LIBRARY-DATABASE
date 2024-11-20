const jwt=require('jsonwebtoken');
const {UserModel}=require('../Model/LibraryModel');



const ConfigRoute=(req,res,next)=>{
    try {
        const jwttoken=req.cookies.jwt;
        console.log(jwttoken);
        
        if (req.path === '/api/users/login' || req.path === '/api/users/register') {
            return next();
          }


        if (jwttoken) {
            jwt.verify(jwttoken,'ConfigureTheUser',(err,decodetkn)=>{
            if (err) {
                console.log(err);
                return res.redirect('/api/users/login');
            }
            else{
                console.log('JWT IS VERIFIED');
                next();
            }
        })
    }
    else{
        console.log('its not working');

        res.redirect('/api/users/login');
        
    }
    
    } catch (error) {
        console.log(error);   
        res.redirect('/api/users/login');

    }
}


const AuthUsers=(req,res,next)=>{
    try {
        const jwttoken=req.cookies.jwt;

        if (req.path === '/api/users/login' || req.path === '/api/users/register') {
            return next();
          }


        if (jwttoken) {
            jwt.verify(jwttoken,'ConfigureTheUser',async (err,decodetkn)=>{
            if (err) {
                console.log(err);
                //res.redirect('/login');
                res.locals.user=null;
                next();
            }
            else{
                console.log('JWT IS VERIFIED');
                console.log(decodetkn);
                const userdata=await UserModel.findById(decodetkn.id);
                res.locals.user=userdata;
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next()
    }
    
    } catch (error) {
        console.log(error);   
        res.redirect('/api/users/login');

    }
}


module.exports={
    ConfigRoute,AuthUsers
}