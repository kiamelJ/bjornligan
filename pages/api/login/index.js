const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;



export default async (req, res) => {
    const { method } = req;

  
    if (method === "POST") {
        let userdata = req.body;

        //Hämta hem användarens info
        const user = await notion.pages.retrieve({
            page_id: userdata.id,
        });

        //Skapa ett kakobjekt som vi senare skickar tillbaka till användaren.
        //Innehåller data: unikt tal, dvs varje kaka som skapas blir unik, samt
        //set: om lösenordet var rätt eller inte.
        let cookiedata = {
            data: "",
            set: false,
        }

        //Boolean för att hålla koll på om rätt lösenord användes.
        let found = false;
        
        //Testa det angivna lösenordet mot det som ligger i databasen.
        if(userdata.pw === user.properties.Password.rich_text[0].text.content)
        {
            cookiedata.data = Date.now();
            cookiedata.set = true;
            found = true;
        }
    
        //Är lösenordet rätt, sätt värdet på kakan i notions databas. Värdet i Notion överensstämmer med kakan användaren får ut.
        //TODO: Värdet på kakan lagras i minnet på servern för att slippa göra anrop mot notion.
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
            

        }

        //Är det fel lösenord, sätt kakans bool till false.
        if(!found)
        {
            console.log("fel lösenord");
            cookiedata.data = "";
            cookiedata.set = false;
        }

        //Lämna tillbaka kakan till användaren.
        res.send(JSON.stringify(cookiedata));
    }

    
}
