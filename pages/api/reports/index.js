import jwt from 'jsonwebtoken'

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;


const secretkey = "alshkdhasdlhaasdkasdasdasdadasdasdasdad1231d1d1d1asdda"

export default async function handler(req, res) {
  const { method } = req;
  console.log("request.body: ", req.body);

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

    let newString = "";

    for(let i = 0; i < req.headers.cookie.length; i++)
    {   
        if(req.headers.cookie[i] == '=' && req.headers.cookie[i-1] == 'n')
        {
            for(let j = i + 1; j < req.headers.cookie.length; j++)
            {
                if(req.headers.cookie[j] == ';')
                {
                    break;
                }
                newString += req.headers.cookie[j];
            }
            break;
        }
    }

    const decodedToken = jwt.verify(newString, secretkey);

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

    console.log(1);


    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Note: {
          title: [
            {
              text: {
                content: req.body[0],
              },
            },
          ],
        },
        Date: {
          date: {
            start: req.body[3],
          },
        },
        Hours: {
          type: "number",
          number: parseInt(req.body[1]),
        },
        Project: {
          relation: [
            {
              id: req.body[2],
            },
          ],
        },
        Person: {
          relation: [
            {
              id: user.results[0].id,
            },
          ],
        },
      },
    });
    console.log("response, timereport added: ", response);
    res.status(200).json();
  }
}
