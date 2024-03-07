import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Table} from "react-bootstrap";

function UserProjects() {
    const [projects, setProjects] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/api/projects/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);}
        const data = await response.json();
        setProjects(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <Card>
                <CardBody>
                    <CardHeader>
                        <Table striped bordered hover>
                            <thead>
                            </thead>
                            <tbody>
                            {Array.isArray(projects) && projects.map((project, index) => (
                                <tr key={index} onClick={() => localStorage.setItem('project_id', project.id)}>
                                    <td>{project.project_name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </CardHeader>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserProjects;