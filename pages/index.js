import { Client } from '@notionhq/client'
import ProjectList from '../components/ProjectList'
import styles from '../styles/Home.module.css'


export default function Home({ projects }) {
  return (
    <>
      <ProjectList projects={projects} />
    </>
  )
}


export async function getServerSideProps() {

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  /*const response = await notion.search({
      filter: {
          property: "object",
          value: "database"
      }
  });*/

  const ProjectID = process.env.NOTION_DATABASE_ID_PROJECTS;
  /*const PeopleID = response.results[1].id;
  const TimereportID = response.results[2].id;*/

  /*const People = await notion.databases.query({
      database_id: PeopleID,
  });
  const Timereports = await notion.databases.query({
      database_id: TimereportID,
  });*/
  const ActiveProjects = await notion.databases.query({
    database_id: ProjectID,
    filter: {
      property: "Status",
      select: {
        equals: "Active"
      }
    }
  });

  return {
    props: {
      projects: ActiveProjects.results
    }
  }
}


