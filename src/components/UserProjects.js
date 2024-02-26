import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Table} from "react-bootstrap";

function UserProjects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/projects/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setProjects(data);
        }
        fetchData().then(r => console.log(r));
    }
    , []);

    return (
        <div>
            <h1>Projects</h1>
           <Card>
               <CardBody>
                   <CardHeader>
                       {projects.length > 0 ? (
                           <h1>
                                 {projects[0].username}'s Projects
                           </h1>
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
}

export default UserProjects;