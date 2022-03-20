const { Client } = require("@notionhq/client");

import jwt from 'jsonwebtoken'

const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;


export default async function handler(req, res) {
    //console.log("request.body: ", req.body);

    if(req.body == "")
    {
        console.log("ingen data");
        res.status(401).send({msg: "bad cookie"});
        return;
    }

    const decodedToken = jwt.verify(req.body, secretkey);
    console.log(decodedToken);

    console.log("exp: ", decodedToken.exp, "tid nu: ", Date.now() / 1000)


    if(decodedToken.exp < Date.now() / 1000)
    {
        console.log("Gammal kaka")
        res.setHeader("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            sameSite: "strict",
            path: '/',
        }));
    
        res.statusCode = 200;
        res.json({msg: "Kakan är gammal"});
        return;
    }

    const user = await notion.databases.query({
        database_id: peopleID,
        filter: {
            and: [{
                property: "Username",
                rich_text: { equals: decodedToken.username, }
            },
            {
                property: "Password",
                rich_text: { equals: decodedToken.password, }
            }
            ]
        }
    })
    
    if(!user)
    {
        console.log("Dålig kaka")
        res.setHeader("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            sameSite: "strict",
            path: '/',
        }));
    
        res.statusCode = 200;
        res.json({msg: "Kakan är dålig"});
        return;
    }
    

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
          property: "Person",
              relation: 
                  {
                  contains: user.results[0].id,
                  },
      }
    });

    res.statusCode = 200;
    res.json(response);



  }
  