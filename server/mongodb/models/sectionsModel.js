const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const sectionsSchema = new Schema({
    section_title: {
        type: String,
        required: true
    },
    section_value: {
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

const SectionsModel = models.sections || model('sections', sectionsSchema);

module.exports = SectionsModel;