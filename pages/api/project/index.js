const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_PROJECTS}`;

// GET (default request) to retrieve data (all pages in Project db)
// visit http://localhost:3000/api/project to view =)
export default async function handler(request, res) {
  const response = await notion.databases.query({
    database_id: databaseId,
    // filter: {
    //   property: "Status",
    //   select: {
    //     equals: "Active",
    //   },
    // },
  });

  res.status(200).json(response);
}
