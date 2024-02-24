import React, {useState} from 'react';
import {Button, Card, Form} from 'react-bootstrap';


function Register() {

    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');


    const handleChanges = (e) => {
        if (e.target.name === 'username') {
            setUserName(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            window.location = '/login';
        } else {
            alert(data.message);
        }
    };

    return (
        <div style={{backgroundColor: 'black', minHeight: '100vh'}} className={'bg-dark text-light'}>
            <br/>
            <Button
                variant="primary"
                type="submit"
                style={{backgroundColor: 'goldenrod', border: 'none'}}
                onClick={() => {
                    window.location = '/home';
                }}
            >
                Back to Home
            </Button>

            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px', opacity: '0.9'}}
                        >
                            <h1
                                className="text-center"
                                style={{color: 'goldenrod'}}
                            >
                                Register
                            </h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter User Name"
                                        name="username"
                                        value={username}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                            </Form>
                            <br/>
                            <div className="d-flex justify-content-between">
                                <Button variant={'outline-warning'} type="submit" onClick={handleSubmit}>
                                    Register
                                </Button>
                                <Button
                                    variant={'outline-warning'}
                                    onClick={() => {
                                        window.location = '/login';
                                    }}
                                >
                                    Have an account? Login!
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
