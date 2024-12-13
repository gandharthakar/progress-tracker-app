const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const labelsSchema = new Schema({
    label_title: {
        type: String,
        required: true
    },
    label_value: {
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

const LabelsModel = models.labels || model('labels', labelsSchema);

module.exports = LabelsModel;