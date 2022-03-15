const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;



export default async (req, res) => {
    const { method } = req;

  
    if (method === "POST") {
        let userdata = req.body;

        const user = await notion.pages.retrieve({
            page_id: userdata.id,
        });

        //console.log(user);

        let cookiedata = {
            data: "",
            set: false,
        }

        let found = false;

        //console.log(user);
        
        if(userdata.pw === user.properties.Password.rich_text[0].text.content)
        {
            cookiedata.data = Date.now();
            cookiedata.set = true;
            found = true;
        }
    

        if(found)
        {
            console.log("rätt lösenord");
            const response = await notion.pages.update({
                page_id: userdata.id,
                properties: {
                    Cookie: {
                        number: cookiedata.data,
                    }
                }
            });
            cookiedata.set = true;
            
            //console.log(response);

        }

        if(!found)
        {
            console.log("fel lösenord");
            cookiedata.data = "";
            cookiedata.set = false;
        }

        res.send(JSON.stringify(cookiedata));
    }

    
}
