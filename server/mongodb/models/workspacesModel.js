const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const workspacesSchema = new Schema({
    workspace_title: {
        type: String,
        required: [true, "Workspace title is required."]
    },
    workspace_description: {
        type: String,
    },
    user_id: {
        type: String,
        required: true
    },
    label_sequence: [
        {
            type: String
        }
    ],
    section_sequence: [
        {
            type: String
        }
    ],
    completed_task: [
        {
            type: String
        }
    ],
}, {
    timestamps: true
});

const WorkspacesModel = models.workspaces || model('workspaces', workspacesSchema);

module.exports = WorkspacesModel;