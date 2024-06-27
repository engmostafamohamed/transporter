import { validationResult  } from 'express-validator';
import express,{Request,Response,NextFunction} from 'express';


const validate=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult (req);
    if (!errors.isEmpty()) {
        const error:{[param:string]:string}={};
        errors.array().map((err: any)=>(error[err.param]=err.msg));
        return res.status(422).json({error});
    }
    next();
}
export default validate