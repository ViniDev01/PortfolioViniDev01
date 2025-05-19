import React from 'react';
import { useEffect, useState } from 'react';
import { collection, getDocs, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Ajuste o caminho conforme necessário



const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {

            const querySnapshot = await getDocs(collection(db, "projects"));
            const projects = querySnapshot.docs.map((doc) => ({ 
                id: doc.id, 
                ...doc.data(),
                
            }));

            setProjects(projects);
        };
        fetchProjects();
    }, []);

    

    const updateProject = async (projectId, data) => {
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
            ...data,
            updatedAt: serverTimestamp(), // Atualiza o timestamp
        });
    } 
    
  return (
    <div className="projects-container">
      <h1 className="projects-title">Meus Projetos</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {project.image && project.image !== "" ? (
              <img src={project.image} alt={project.title} className='project-image'/>
            ) : (
              <p>Imagem não disponível</p>
            )}
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-links">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
