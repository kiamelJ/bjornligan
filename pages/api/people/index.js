const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;
const projectID = `${process.env.NOTION_DATABASE_ID_PROJECTS}`;

export default async function Handler(req, res) {
  const { method } = req;

  // GET (default request) to retrieve data
  // visit http://localhost:3000/api/people to view =)
  if (method === "GET") {
    const response = await notion.databases.query({
      database_id: peopleID,
    });
    const people = response.results.map((person) => {
      return {
        id: person.id,
        name: person.properties.Name.title[0].plain_text,
        image: person.properties.Image.files[0].file.url,
      };
    });
    res.status(200).json(people);
  }
}
