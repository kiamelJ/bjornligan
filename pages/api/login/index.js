const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;
const projectID = `${process.env.NOTION_DATABASE_ID_PROJECTS}`;

export default async function Handler(req, res) {
  const response = await notion.databases.query({
    database_id: peopleID,
    filter: {
      and: [
        {
          property: "Username",
          rich_text: {
            equals: req.body.username,
          },
        },
        {
          property: "Password",
          rich_text: {
            equals: req.body.password,
          },
        },
      ],
    },
  });

  if (response.results.length > 0) {
    res.status(200).json(response);
    return;
  } else {
    res.status(401).json({ msg: "Du finns inte" });
    return;
  }
}
