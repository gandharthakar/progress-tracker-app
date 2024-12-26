const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const TasksModel = require("../../mongodb/models/tasksModel");
const LabelsModel = require("../../mongodb/models/labelsModel");
const { isValidObjectIdString, sortLabelsBySequence, sortSectionsBySequence, sortTasksBySequence } = require("../../libs/helperFunctions");

const getLabels = async (workspace_id, sequence) => {
    const resp = await LabelsModel.find({ workspace_id })
        .exec()
        .then(docs => {
            return docs.map((doc) => {
                return {
                    label_id: doc._id,
                    label_title: doc.label_title,
                    label_value: doc.label_value,
                    workspace_id: doc.workspace_id,
                    user_id: doc.user_id
                }
            })
        });
    const sortedLabels = sortLabelsBySequence(resp, sequence);
    return sortedLabels ? sortedLabels : [];
}

const getSectionsAndTasks = async (workspace_id, sequence) => {
    const resp = await SectionsModel.find({ workspace_id });
    const arr = [];
    for (const sect of resp) {
        const obj = {
            section_id: sect._id,
            section_title: sect.section_title,
            section_value: sect.section_value,
            workspace_id: sect.workspace_id,
            user_id: sect.user_id,
            task_sequence: sect.task_sequence
        }
        arr.push(obj);
    }
    const sortedSections = sortSectionsBySequence(arr, sequence);

    const finalArr = [];
    for (const ss of sortedSections) {
        const obj = {
            section_id: ss.section_id.toString(),
            section_title: ss.section_title,
            section_value: ss.section_value,
            workspace_id: ss.workspace_id,
            user_id: ss.user_id,
            tasks: await TasksModel.find({ _id: { $in: ss.task_sequence } })
                .exec()
                .then(docs => {
                    return sortTasksBySequence(docs.map((doc) => {
                        return {
                            task_id: doc._id.toString(),
                            task_title: doc.task_title,
                            section_id: doc.section_id,
                            workspace_id: doc.workspace_id,
                            user_id: doc.user_id
                        }
                    }), ss.task_sequence)
                })
        }
        finalArr.push(obj);
    }
    // console.dir(finalArr, { depth: null });
    return finalArr;
}

const readMasterWorkspaceController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { workspace_id, token } = req.query;
        if (workspace_id && token) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        status = 200;
                        response = {
                            success: true,
                            message: "Master workspace found.",
                            master_workspace: {
                                workspace_id: workspaceAlreadyExist._id,
                                workspace_title: workspaceAlreadyExist.workspace_title,
                                workspace_description: workspaceAlreadyExist.workspace_description,
                                user_id: workspaceAlreadyExist.user_id,
                                completed_task: workspaceAlreadyExist.completed_task,
                                sections: await getSectionsAndTasks(workspace_id, workspaceAlreadyExist.section_sequence),
                                labels: await getLabels(workspace_id, workspaceAlreadyExist.label_sequence),
                            }
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "Workspace not found."
                        }
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "Invalid workspace ID found."
                    }
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: "User not found."
                }
            }
        } else {
            status = 400;
            response = {
                success: false,
                message: "Missing required fields."
            }
        }

        res.status(status).json(response);
    } catch (error) {
        response = {
            success: false,
            message: error.message
        }
        res.json(response);
    }
}

module.exports = readMasterWorkspaceController;