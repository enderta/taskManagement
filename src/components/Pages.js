import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Tasks from "./Tasks";
import Projects from "./Projects";
import AdminProjectsCreate from "./AdminProjectsCreate";

function Pages() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                {isLoggedIn ? (
                    localStorage.getItem("role") === "admin" ? (
                        <>
                            <Route path={"/*"} element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path={"/tasks"} element={<Tasks/>}/>
                            <Route path={"/projects"} element={<Projects/>}/>
                            <Route path={"/createProject"} element={<AdminProjectsCreate/>}/>
                        </>
                    ) : (
                        <>
                            <Route path={"/*"} element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path={"/tasks"} element={<Tasks/>}/>
                            <Route path={"/projects"} element={<Projects/>}/>
                        </>
                    )
                ) : (
                    <>
                        <Route path={"/*"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
}

export default Pages;