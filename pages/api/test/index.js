const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;

export default async function handler(request, res) {
  const { method } = request;
  console.log("request.body: ", request.body);

  if (method === "GET") {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json({ response });
  }
  //TODO request.body.dateFrom
  if (method === "POST") {
    const response = await notion.databases.query({
      database_id: databaseId,

      filter: {
        and: [
          {
            property: "Date",
            date: {
              on_or_after: "2022-02-07",
            },
          },
          {
            property: "Date",
            date: {
              on_or_before: "2022-02-11",
            },
          },
          {
            property: "Project",
            relation: { contains: "a404d585c7504640a49cbda90e367de7" },
          },
        ],
      },
    });

    // console.log("response, timereport added: ", response);
    res.status(200).json({ response });
  }
}
