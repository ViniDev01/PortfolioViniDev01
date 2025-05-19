import React from 'react';
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react"
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Ajuste o caminho conforme necessário

function Projects() {
    const [projects, setProjects] = useState([]);
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const queryLimit = isMobile ? 3 : 6;
            const q = query(
                collection(db, "projects"),
                orderBy("updatedAt", "desc"),
                limit(queryLimit)
            )

            const querySnapshot = await getDocs(q);
            const projects = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            setProjects(projects);
        }

        fetchProjects();
    }, [isMobile]);


    return (
        <div className="projects">
            <h2>Projetos mais recentes</h2>
            <Link to="/projects" className="btn btn-projects">Ver todos <MoveRight /></Link>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <div className="box-project">
                            <img src={project.image} alt={project.title} />
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className="project-links">
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Projects;