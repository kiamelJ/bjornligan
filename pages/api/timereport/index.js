const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;

export default async function handler(request, res) {
  const { method } = request;
  console.log("request.body: ", request.body);

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
                content: request.body.note,
              },
            },
          ],
        },
        Date: {
          date: {
            start: request.body.date,
          },
        },
        Hours: {
          type: "number",
          number: parseInt(request.body.hour),
        },
        Project: {
          relation: [
            {
              id: request.body.project,
            },
          ],
        },
        Person: {
          relation: [
            {
              id: request.body.person,
            },
          ],
        },
      },
    });
    console.log("response, timereport added: ", response);
    res.status(200).json();
  }
}
