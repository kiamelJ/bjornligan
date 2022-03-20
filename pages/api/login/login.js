import jwt from 'jsonwebtoken'

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

import cookie from "cookie"

const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"



export default async (req, res) => {

    const user = await notion.databases.query({
        database_id: peopleID
    })

    console.log(req);

    for(let i = 0; i < user.results.length; i++)
    {
        if(req.body.username == user.results[i].properties.Username.rich_text[0].plain_text)
        {
            console.log("hittat användarnamn")
            if(req.body.password == user.results[i].properties.Password.rich_text[0].plain_text)
            {
                console.log("hittat lösen");

                let newtoken = jwt.sign({username: req.body.username, password:req.body.password }, secretkey, {expiresIn: "10s"});

                res.setHeader("Set-Cookie", cookie.serialize("token", newtoken, {
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 10,
                    sameSite: "strict",
                    httpOnly: true,
                    path: '/',
                }));


                let cookiedb = user.results[i].id;
        
                res.statusCode = 200;
                res.json({success: true})
                return;
            }
            
        }
    }
    res.statusCode = 401;
    res.send({success: false});
        
}
