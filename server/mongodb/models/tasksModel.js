const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const tasksSchema = new Schema({
    task_title: {
        type: String,
        required: true
    },
    section_id: {
        type: String,
        required: true
    },
    workspace_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const TasksModel = models.tasks || model('tasks', tasksSchema);

module.exports = TasksModel;