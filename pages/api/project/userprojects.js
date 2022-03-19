const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = process.env.NOTION_DATABASE_ID_PEOPLE;
const projectID = process.env.NOTION_DATABASE_ID_PROJECTS;


export default async (req, res) => {
    console.log(req.body);

    if(req.body == "")
    {
        console.log("ingen data");
        res.status(401).send({msg: "bad cookie"});
        return;
    }

    const user = await notion.databases.query({
        database_id: peopleID,
        filter: {
            property: "Cookie",
            number: { equals: parseInt(req.body), }
        }
    })

    if(user.results.length == 0)
    {
        console.log("fel kaka")
        res.status(401).send({msg: "bad cookie"});
        return;
    }

    let userProjectsId = [];

    for(let i = 0; i < user.results[0].properties.Projects.relation.length; i++){
        userProjectsId.push(user.results[0].properties.Projects.relation[i].id);
    }

    const allProjects = await notion.databases.query({
        database_id: projectID,
    })


    let userActiveProjects = [];


    for(let i = 0; i < userProjectsId.length; i++){
        for(let j = 0; j < allProjects.results.length; j++){
            //console.log("project id:", j, " ", allProjects.results[j].id, "user id: ", i, " ", userProjectsId[i]);
            if(allProjects.results[j].id == userProjectsId[i] && allProjects.results[j].properties.Status.select.name == "Active"){
                //console.log("hittad");
                userActiveProjects.push(allProjects.results[j]);
            }
        }
    }

    res.status(200);
    res.send(JSON.stringify(userActiveProjects));

    
};