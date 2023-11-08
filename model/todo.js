// Contains the SQL code for database interaction. The application will have the ability to create a task, display the list of tasks, and delete tasks. Each of these functionalities correlates with the following CRUD REST API functions: create, read, and delete.

// To keep our connection to the database open in our application we’ll need to create a connection pool. In model/todo.js, create a const variable called pool to connect the SQL database.

const pool = require('./database');

// Todo structure: id (primary key), description
exports.create = (description) => {
    return pool.query(
        // insert into the table TODO, column DESCRIPTION
        // value specified in brackets [description]
        // and return all updated values (or something like that)
        'INSERT INTO todo (description) VALUES ($1) RETURNING *',
        [description]
    );
}

exports.get = () => {
    return pool.query(
        'SELECT * FROM todo'
    );
}

exports.remove = (id) => {
    return pool.query(
        'DELETE FROM todo WHERE todo_id = $1', 
        [id]
    );
}