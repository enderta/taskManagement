import React from 'react';

const Tasks = () => {
    const id = localStorage.getItem('user_id');
    return (
        <div>
        Tasks user id: {id}
        </div>
    );
};

export default Tasks;