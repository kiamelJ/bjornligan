const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;

export default async function handler(req, res) {
  const { method } = req;
  console.log("request.body: ", req);

  // GET (default request) to retrieve data
  // visit http://localhost:3000/api/timereport to view =)
  if (method === "GET") {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json({ response });
  }

  // POST (create new page in timereport database)
  if (method === "POST") {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Note: {
          title: [
            {
              text: {
                content: req.body[0],
              },
            },
          ],
        },
        Date: {
          date: {
            start: req.body[3],
          },
        },
        Hours: {
          type: "number",
          number: parseInt(req.body[1]),
        },
        Project: {
          relation: [
            {
              id: req.body[2],
            },
          ],
        },
        Person: {
          relation: [
            {
              id: req.body[4],
            },
          ],
        },
      },
    });
    console.log("response, timereport added: ", response);
    res.status(200).json();
  }
}
