import jwt from 'jsonwebtoken'
const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

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


    const decodedToken = jwt.verify(newString, secretkey);

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

    const specificUser = await notion.pages.retrieve({
        page_id: user.results[0].id,
    })

    //console.log(specificUser);
    res.statusCode = 200;
    res.json({specificUser});

};