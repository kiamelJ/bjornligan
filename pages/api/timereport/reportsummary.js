const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const reportID = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

export default async function handler(req, res) {
  const { method } = req;
  console.log("req.body: ", req.body.startDate);

  // POST (create new page in timereport database)
  if (method === "POST") {

    const users = await notion.databases.query({
        database_id: peopleID,
    })

    let summary = [];

    for(let i = 0; i < users.results.length; i++)
    {
        summary.push({name: users.results[i].properties.Name.title[0].plain_text, id: users.results[i].id, hours: 0});
    }
    
    if(req.body.endDate == null)
    {
        console.log(1);
        const response = await notion.databases.query({
            database_id: reportID,
            filter: {
                  property: "Date",
                  date: {
                        equals: req.body.startDate,
                  },
                },  
          });



        
        for(let i = 0; i < response.results.length; i++)
        {
            for(let j = 0; j < summary.length; j++)
            {
                if(response.results[i].properties.Person.relation[0].id == summary[j].id)
                {
                    summary[j].hours += response.results[i].properties.Hours.number;
                }
            }
        }
        
        console.log(summary);
        res.status(200).json(JSON.stringify(summary));
        return;
    }
    else
    {

        const response = await notion.databases.query({
            database_id: reportID,
            filter: {
              and: [
                {
                  property: "Date",
                  date: {
                    on_or_after: req.body.startDate,
                  },
                },
                {
                  property: "Date",
                  date: {
                    on_or_before: req.body.endDate,
                  },
                },
              ],
            },
          });
          
            for(let i = 0; i < response.results.length; i++)
            {
                for(let j = 0; j < summary.length; j++)
                {
                    if(response.results[i].properties.Person.relation[0].id == summary[j].id)
                    {
                        summary[j].hours += response.results[i].properties.Hours.number;
                    }
                }
            }
        
            
        console.log(summary);
          res.status(200).json(JSON.stringify(summary));
        return;
    }

    
      
  }
}