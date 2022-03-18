const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;



export default async (req, res) => {
    const { method } = req;
    //console.log(req.body);
    
    if (method === "POST"){
        let userdata = req.body;
        console.log(userdata);

        //Uppdatera lösenordet med det nya angivna lösenordet.
        //TODO: Användaren måste ange sitt gamla lösenord för att kunna ändra lösenord. 
        const response = await notion.pages.update({
            page_id: userdata.id,
            properties: {
                Password: {
                    rich_text: [{ 
                        text: {content: userdata.pw }
                    }]
                }
            }
        });

        //Flagga att det gick bra.
        res.status(200);

    }
}