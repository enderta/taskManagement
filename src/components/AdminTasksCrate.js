import React, {useState} from 'react';
import {Card, Container, Form} from "react-bootstrap";

function AdminTasksCrate() {
    //        const response = await query('INSERT INTO tasks (task_name, description, due_date, status, project_id, assigned_to_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [task_name, description, due_date, status, project_id, assigned_to_user_id]);
    const [task_name, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const project_id = localStorage.getItem('selected_user_id');
    const assigned_to_user_id = localStorage.getItem('selected_project_id');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({task_name, description, due_date, status, project_id, assigned_to_user_id})
        });
        const data = await response.json();
console.log(data);
        window.location = '/createProject';

    }
    const handleChanges = (e) => {
        if (e.target.name === 'task_name') {
            setTaskName(e.target.value);
        } else if (e.target.name === 'description') {
            setDescription(e.target.value);
        } else if (e.target.name === 'due_date') {
            setDueDate(e.target.value);
        } else if (e.target.name === 'status') {
            setStatus(e.target.value);
        }
    }



    return (
        <div>
            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Card style={{width: '30rem', margin:"10px"}}>
                    <Card.Body>
                        <Card.Title>Create Task</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicTaskName">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control type="text" name="task_name" value={task_name} onChange={handleChanges} placeholder="Enter Task Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={description} onChange={handleChanges} placeholder="Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control type="date" name="due_date" value={due_date} onChange={handleChanges} placeholder="Due Date" />
                            </Form.Group>
                            <button type="submit" className="btn btn-primary">Create Task</button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </div>
    );
}

export default AdminTasksCrate;