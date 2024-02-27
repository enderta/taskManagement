import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Row, Col, Button } from "react-bootstrap";

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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        if (!text) {
            throw new Error('No data returned from server');
        }

        const data = JSON.parse(text);
        return data;
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await fetchData(`http://localhost:3000/api/projects/user/${localStorage.getItem('user_id')}`);
            setProjects(projects);
        }
        fetchProjects();
    }, []);

    console.log(projects);

    return (
        <div>
            <h1> Projects</h1>
            <Row>
                {Array.isArray(projects) && projects.map(project => (
                    <Col md={4} key={project.id}>
                        <Card className="mb-6" bg="dark" text="white" border="dark" style={{ height: '300px', margin: "10px" }}>
                            <CardBody>
                                <h2>{project.project_name}</h2>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ backgroundColor: 'goldenrod', border: 'none' }}
                                    onClick={() => {
                                        window.location = `/tasks`;
                                    }}
                                >
                                    Tasks
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Projects;
