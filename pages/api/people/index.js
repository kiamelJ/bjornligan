const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;
const projectID = `${process.env.NOTION_DATABASE_ID_PROJECTS}`;

export default async (req, res) => {
    const { method } = req;

    // GET (default request) to retrieve data
    // visit http://localhost:3000/api/timereport to view =)
    if (method === "GET") {
        const response = await notion.databases.query({
            database_id: peopleID,
        });
        const people = response.results.map((person) => {
            return {
                id: person.id,
                name: person.properties.Name.title[0].plain_text,
                image: person.properties.Image.files[0].file.url,
            }
        })
        res.status(200).json(people)
    }

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
        })

        let userActiveProjects = [];

        for (let i = 0; i < userProjectsId.length; i++) {
            for (let j = 0; j < allProjects.results.length; j++) {
                //console.log("project id:", j, " ", allProjects.results[j].id, "user id: ", i, " ", userProjectsId[i]);
                if (allProjects.results[j].id == userProjectsId[i].id && allProjects.results[j].properties.Status.select.name == "Active") {
                    //console.log("hittad");
                    userActiveProjects.push(allProjects.results[j]);
                }
            }
        }
        res.send(userActiveProjects);
    }
};