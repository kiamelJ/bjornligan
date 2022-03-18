const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;



export default async (req, res) => {
    const { method } = req;

    //console.log(req.body);

  
    if (method === "POST") {
        let userdata = req.body.id;
        let cookie = req.body.cookie;

        //Hämta hem användarens info
        const user = await notion.pages.retrieve({
            page_id: userdata,
        });


        if(cookie == user.properties.Cookie.number)
        {
            res.status(200);
        }
        else
        {
            res.status(500);
        }

        res.send(400);
    }
}
