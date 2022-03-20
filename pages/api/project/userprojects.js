import jwt from "jsonwebtoken";

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = process.env.NOTION_DATABASE_ID_PEOPLE;
const projectID = process.env.NOTION_DATABASE_ID_PROJECTS;

import cookie from "cookie"

const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"


export default async (req, res) => {
    //console.log(req.body);

    if(req.body == "")
    {
        console.log("ingen data");
        res.status(401).send({msg: "bad cookie"});
        return;
    }

    const decodedToken = jwt.verify(req.body, secretkey);
    console.log(decodedToken);

    console.log("exp: ", decodedToken.exp, "tid nu: ", Date.now() / 1000)


    if(decodedToken.exp < Date.now() / 1000)
    {
        console.log("Gammal kaka")
        res.setHeader("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            sameSite: "strict",
            path: '/',
        }));
    
        res.statusCode = 200;
        res.json({msg: "Kakan är gammal"});
        return;
    }

    const user = await notion.databases.query({
        database_id: peopleID,
        filter: {
            and: [{
                property: "Username",
                rich_text: { equals: decodedToken.username, }
            },
            {
                property: "Password",
                rich_text: { equals: decodedToken.password, }
            }
            ]
        }
    })
    
    if(!user)
    {
        console.log("Dålig kaka")
        res.setHeader("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            sameSite: "strict",
            path: '/',
        }));
    
        res.statusCode = 200;
        res.json({msg: "Kakan är dålig"});
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