const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";

const registerUser = async (username, email, password) => {
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const response = await pool.query(
            "insert into users (username, email, password_hash) values ($1, $2, $3) returning *;",
            [username, email, password_hash]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async () => {
    try {
        const response = await pool.query(
            "select * from users;"
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        const response = await pool.query(
            "select * from users where id = $1;",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (username, email, password, id) => {
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const response = await pool.query(
            "update users set username = $1, email = $2, password_hash = $3 where id = $4;",
            [username, email, password_hash, id]
        );
        return "User updated successfully";
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        const response = await pool.query(
            "delete from users where id = $1;",
            [id]
        );
        return "User deleted successfully";
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (body) => {
    try {
        const {email, password} = body;
        const response = await pool.query(
            "select * from users where email = $1;",
            [email]
        );
        const user = response.rows[0];
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({id: user.id}, secret);
            return token;
        } else {
            return "Invalid email or password";
        }
    } catch (error) {
        console.log(error);
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