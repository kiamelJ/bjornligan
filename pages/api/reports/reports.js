const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;
const personId = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;


export default async function handler(req, res) {
    const { method } = req;
    //console.log("request.body: ", req.body);
    
    // POST (create new page in timereport database)
    if (method === "POST") {
        let userId = req.body;

        const username = await notion.databases.query({
            database_id: personId,
            filter: {
                property: "Cookie",
                number: { equals: parseInt(userId), }
            }
        })

        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Person",
                    relation: 
                        {
                        contains: username.results[0].id,
                        },
            }
        });

        res.status(200).json(response);
        return;
    }
    res.status(403);
  }
  