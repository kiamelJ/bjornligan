import ProjectListComponent from "../../components/ProjectList";
import Layout from "../../components/Layout";
import Meta from "../../components/Meta";


const ProjectList = () => {
  return (    
    <Layout>
      <Meta title='Projects' />      
      <ProjectListComponent />
    </Layout>
  );
};

export default ProjectList;
