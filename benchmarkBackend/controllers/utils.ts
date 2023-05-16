import { validate } from "uuid";

export function checkValidUUID(req,res,next){
    if(req.params.id){
        if (!validate(req.params.id)) {
            res.status(400).json({ error: "Identifier is not a valid uuid string." });
            return;
        }
    
        next()
    }    
    return
}