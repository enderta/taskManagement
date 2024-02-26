import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form} from "react-bootstrap";

function AdminProjectsCreate() {
    const [projectName, setProjectName] = useState('');
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
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

        const fetchUsers = async () => {
            const users = await fetchData('http://localhost:3000/api/users');
            setUsers(users);
            if (users.length > 0) {
                setSelectedUser(users[0].id); // Set the selectedUser state with the ID of the first user
            }
        }

        fetchUsers().then(r =>
            console.log(r));
        fetchProjects().then(r =>
            console.log(r));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                project_name: projectName,
                user_id: selectedUser
            })
        });
        window.location.reload();
    }

    return (
        <>
            <div>
                <Button variant="primary" onClick={() => setShowModal(true)}
                        style={{position: 'absolute', left: '0', margin: "10px"}}>
                    + Add Project
                </Button>
            </div>

            <div>
                <h1>Projects</h1>


                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter project name"
                                              onChange={(e) => setProjectName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>User</Form.Label>
                                <Form.Select onChange={(e) => setSelectedUser(e.target.value)}>
                                    {users.map((user) => <option key={user.id}
                                                                 value={user.id}>{user.username}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Assigned User</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project, index) => (
                        <tr key={project.id}>
                            <td>{index + 1}</td>
                            <td>{project.project_name}</td>
                            <td>{project.username}</td>
                            <td><Button variant="danger">Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>

    );
}

export default AdminProjectsCreate;