import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser"

const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"


export default async (req, res) => {

    let newString = "";

    for(let i = 0; i < req.headers.cookie.length; i++)
    {   
        if(req.headers.cookie[i] == '=' && req.headers.cookie[i-1] == 'n')
        {
            for(let j = i + 1; j < req.headers.cookie.length; j++)
            {
                if(req.headers.cookie[j] == ';')
                {
                    break;
                }
                newString += req.headers.cookie[j];
            }
            break;
        }
    }

    if(newString == "")
    {
        console.log(2);
        res.status(401).json({msg: "Kakan är dålig"});
        return;
    }

    //console.log(newString);

    const decodedToken = jwt.verify(newString, secretkey);
    //console.log(decodedToken);

    //console.log("exp: ", decodedToken.exp, "tid nu: ", Date.now() / 1000)

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

