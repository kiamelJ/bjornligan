import styles from '../styles/Home.module.css'
import Button from '../components/Button'

const ProjectList = ({ projects }) => {
  return (
    <div className={styles.container}>
      <h1>Aktiva Projekt ☺</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className={styles.card}>
            {project.properties.Projectname.title[0].plain_text}
            {/* <Button
              color={'green'}
              text={'Add'}
              onClick={}
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
