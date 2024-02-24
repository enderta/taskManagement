const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";


const registerUser = async (username, email, password) => {
    try {
        let role = 'user'; // default role

        // Check if an admin exists
        const adminExists = await pool.query(
            "select * from users where role = 'admin';"
        );

        // If no admin exists, assign 'admin' role to the new user
        if (adminExists.rows.length === 0) {
            role = 'admin';
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const response = await pool.query(
            "insert into users (username, email, password_hash, role) values ($1, $2, $3, $4) returning *;",
            [username, email, passwordHash, role]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const response = await pool.query(
            "select * from users;"
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "select * from users where id = $1;",
            [id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {username, email, password, role} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const response = await pool.query(
            "update users set username = $1, email = $2, password_hash = $3, role = $4 where id = $5;",
            [username, email, passwordHash, role, id]
        );
        res.json("User updated successfully");
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "delete from users where id = $1;",
            [id]
        );
        res.json("User deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (userData) => {
    const {email, password} = userData;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
        return {
            status: "error",
            message: "User not found",
        };
    } else {
        const match = await bcrypt.compare(password, user.rows[0].password_hash);
        if (match) {
            const token = jwt.sign({id: user.rows[0].id}, secret, {expiresIn: "1h"});
            return {
                status: "success",
                message: "User logged in successfully",
                token: token,
                user: user.rows[0]
            };
        } else {
            return {
                status: "error",
                message: "Incorrect password",
            };
        }
    }
}

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}


