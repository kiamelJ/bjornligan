import jwt from "jsonwebtoken";

import cookie from "cookie"

const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"


export default async (req, res) => {
    //console.log(req.body);

    if(req.body == "")
    {
        console.log("ingen data");
        res.status(401).send({msg: "bad cookie"});
        return;
    }

    const decodedToken = jwt.verify(req.body, secretkey);
    console.log(decodedToken);

    console.log("exp: ", decodedToken.exp, "tid nu: ", Date.now() / 1000)

    if(decodedToken.exp - 45 < Date.now() / 1000)
    {
        console.log("Kakan dör inom en minut")
    
        res.statusCode = 200;
        res.json({msg: "Kakan håller på att dö"});
        return;
    }

    res.statusCode = 200;
    res.json({msg: "Kakan är bra", timeleft: decodedToken.exp});
}

