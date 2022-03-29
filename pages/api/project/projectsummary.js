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
              on_or_after: request.body.startDate,
            },
          },
          {
            property: "Date",
            date: {
              on_or_before: request.body.endDate,
            },
          },
          {
            property: "Project",
            relation: { contains: request.body.projectId },
          },
        ],
      },
    });

    let totalTime = 0;


    for(let i = 0; i < response.results.length; i++)
    {
        totalTime += response.results[i].properties.Hours.number
    }

    console.log(totalTime);
    //console.log("result: ", response.results);
    res.status(200).send(totalTime);
  }
}