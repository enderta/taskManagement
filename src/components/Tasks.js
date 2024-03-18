import React, {useEffect, useState} from 'react';

const Tasks = () => {
    const id = localStorage.getItem('user_id');
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            }
            );
    }, []);
    console.log(tasks)
    return (
        <div>
        Tasks user id: {id}
        </div>
    );
};

export default Tasks;