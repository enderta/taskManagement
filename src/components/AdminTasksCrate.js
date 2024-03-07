import React, {useState} from 'react';

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


    return (
        <div>
            {
                <h>
                    project_id: {project_id}

                </h>}
            {
                <h1>
                    assigned_to_user_id: {assigned_to_user_id}
                </h1>
            }
        </div>
    );
}

export default AdminTasksCrate;