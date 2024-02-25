import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form} from "react-bootstrap";

function AdminProjectsCreate(props) {
    const [projectName, setProjectName] = useState('');
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                const projectsWithUsernames = await Promise.all(data.map(async (project) => {
                    const userResponse = await fetch(`http://localhost:3000/api/users/${project.user_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    const user = await userResponse.json();
                    return {...project, username: user.username};
                }));
                setProjects(projectsWithUsernames);
            } else {
                console.error('Data fetched is not an array:', data);
                setProjects([]);
            }
        }
        getProjects().then(r => console.log('Projects fetched'));
    }, []);

    const handleProjectName = (e) => {
        e.preventDefault()
        setProjectName(e.target.value);
    }

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the function to create the project and assign it to the selected user
        // createProject(projectName, selectedUser);
        handleClose();
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Data fetched is not an array:', data);
                setUsers([]);
            }
        }
        getUsers().then(r => console.log('Users fetched'));
    }, []);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Project
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter project name" onChange={handleProjectName} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>User</Form.Label>
                            <Form.Select onChange={handleUserChange}>
                                {users.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>{user.username}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
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
                {projects.map((project, index) => {
                    return (
                        <tr key={project.id}>
                            <td>{index + 1}</td>
                            <td>{project.project_name}</td>
                            <td>{project.username}</td>
                            <td>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
        </div>
    );
}

export default AdminProjectsCreate;