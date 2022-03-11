const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

export default async (request, res) => {
    const { method } = request;
  
    // GET (default request) to retrieve data
    // visit http://localhost:3000/api/timereport to view =)
    if (method === "GET") {
      const response = await notion.databases.query({
        database_id: databaseId,
    });

    //console.log(response);

    let jsonUsers = [{
        name: "",
        id: ""
    }];
    
    for(let i = 0; i < response.results.length; i++)
    {
        jsonUsers[i] = {
            name: response.results[i].properties.Name.title[0].plain_text,
            id: response.results[i].id
        }
    }

    res.send(jsonUsers);
    }
};