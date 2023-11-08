const formidable = require('formidable');
const { create, get, remove } = require('../model/todo');

exports.create = async (req, res) => {
    /* The function should 
    + receive req and res as its arguments
    + use formidable to parse the received form data
    + check to see if the description field is received
    
    if description is received,
        use imported create function to add a new entry to the todo database and returns the added row data
    if the description field does not exist, 
        return an error. */
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
        const { description } = fields;
        if (!description) {
            return res.status(400).json({
                error: 'Description is required',
            })
        };
        // description is received
        try {
            const newTask = await create(fields.description);
            return res.status(201).send({ data: newTask.rows[0] });
        } catch (error) {
            return res.status(400).json({
                error: `Error with create ${error}`,
            })
        }
    });
}

exports.read = async (req, res) => {
    /* The function should take req and res as its arguments and use the get() function to return all rows of the table as a response. Response returns all rows or error. */
    try {
        const task = await get();
        return res.json({ data: task.rows });
    } catch (error) {
        return res.status(400).json({
            error,
        })
    }
}

exports.removeTodo = async (req, res) => {
    /* The function will take req and res as its arguments and use the remove() function that we created in model/todo.js to match and delete the row with the received id. Response returns the deleted id or error. */
    const id = Number(req.params.id);
    try {
        await remove(id);
        return res.status(200).send({ data: id });
    } catch (error) {
        return res.status(400).json({
            error,
        })
    }
}