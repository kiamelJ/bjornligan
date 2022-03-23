const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;
const projectID = `${process.env.NOTION_DATABASE_ID_PROJECTS}`;

export default async function Handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const userID = req.body;

    const userData = await notion.pages.retrieve({
      page_id: userID,
    });

    let userProjectsId = [];

    for (let i = 0; i < userData.properties.Projects.relation.length; i++) {
      userProjectsId.push(userData.properties.Projects.relation[i]);
    }

    const allProjects = await notion.databases.query({
      database_id: projectID,
    });

    let userActiveProjects = [];

    for (let i = 0; i < userProjectsId.length; i++) {
      for (let j = 0; j < allProjects.results.length; j++) {
        if (
          allProjects.results[j].id == userProjectsId[i].id &&
          allProjects.results[j].properties.Status.select.name == "Active"
        ) {
          userActiveProjects.push(allProjects.results[j]);
        }
      }
    }
    res.status(200).json(userActiveProjects);
  }
}
