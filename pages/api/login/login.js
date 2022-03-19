

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

import cookie from "cookie"



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
                let tokenValue = Date.now();
                res.setHeader("Set-Cookie", cookie.serialize("token", tokenValue, {
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: '/',
                }));

                let cookiedb = user.results[i].id;
        
                //TUDU: Spara kakan server side istället för att snabbare kolla så kakan är rätt.
                const response = await notion.pages.update({
                        page_id: cookiedb,
                        properties: {
                            Cookie: {
                                number: tokenValue,
                            }
                        }
                    });
        
                res.statusCode = 200;
                res.send({success: true});
                return;
            }
            
        }
    }
    res.statusCode = 401;
    res.send({success: false});
        
}
