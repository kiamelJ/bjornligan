import { Client } from '@notionhq/client'
import { appendBlockChildren } from '@notionhq/client/build/src/api-endpoints';

import NextCors from 'nextjs-cors';





export async function GetProjects() {
    
    const notion = new Client({auth: process.env.NOTION_API_KEY});
    const response = await notion.search({
        filter: {
            property: "object",
            value: "database"
        }
    });
    
    const ProjectID = response.results[0].id;
    const PeopleID = response.results[1].id;
    const TimereportID = response.results[2].id;

    const People = await notion.databases.query({
        database_id: PeopleID,
    });
    const Timereports = await notion.databases.query({
        database_id: TimereportID,
    });
    const Projects = await notion.databases.query({
        database_id: ProjectID,
    });

    return {
        props: {
            People
        }
    }
}
