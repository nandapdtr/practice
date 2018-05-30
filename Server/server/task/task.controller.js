const Task = require('./task.model');


function load(req, res, next, id) {
    Task.get(id)
        .then((task) => {
            req.task = task;
            return next();
        })
        .catch(e => next(e));
}

function get(req, res) {
    return res.json(req.task);
}

function get_all_tasks(req, res, next) {
    Task.find().exec().then(tasks => res.json(tasks)).catch(e => next(e));
}

function create_task(req, res, next) {
    const task = new Task(req.body);
    task.save().then(savedTask => res.json(savedTask))
        .catch(e => next(e));
}

function update_task(req, res, next) {
    const task = req.task;
    console.log('before merging', task);
    Object.assign(task, req.body);
    console.log('after merging', task);
    task.save().then(updatedTask => res.json(updatedTask))
        .catch(e => next(e));
}

function delete_task(req, res, next) {
    const task = new Task(req.task);
    task.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

module.exports = { load, get, get_all_tasks, create_task, update_task, delete_task };