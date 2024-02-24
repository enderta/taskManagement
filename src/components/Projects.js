import React from 'react';

const Projects = () => {

    return (
        <div>
            {
                localStorage.getItem('role') === 'admin' ?
                    <div>
                        <h1>Projects</h1>
                        <p>Admin</p>
                    </div>
                    :
                    <div>
                        <h1>Projects</h1>
                        <p>User</p>
                    </div>
            }
        </div>
    );
};

export default Projects;