const ProjectList = ({ projects }) => {
  return (
    <div>
      <h1>Aktiva Projekt</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.properties.Projectname.title[0].plain_text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
