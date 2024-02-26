import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from "react-bootstrap";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const fetchData = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.json();
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await fetchData('http://localhost:3000/api/projects');
            const projectsWithUsernames = await Promise.all(projects.map(async (project) => {
                const user = await fetchData(`http://localhost:3000/api/user/${project.user_id}`);
                return {...project, username: user.username};
            }));
            setProjects(projectsWithUsernames);
        }
        fetchProjects().then(r => console.log(r));
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <Card>
                <CardBody>
                    <CardHeader>
                        {projects.length > 0 ? (
                            <>
                                <h1>
                                    {projects[0].username}'s Projects
                                </h1>
                                <h2>
                                    {projects[0].project_name}
                                </h2>
                            </>
                        ) : (
                            <h1>
                                No Projects
                            </h1>
                        )}
                    </CardHeader>
                </CardBody>
            </Card>
        </div>
    );
};

export default Projects;