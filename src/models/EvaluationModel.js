import axios from "axios";

export const getEnvList = async function () {
    const res = await axios.get('/models/environments/');
    return res.data
}
export const getTaskList = async function () {
    const res = await axios.get('/models/task_view/');
    return res.data
}
export const getModelList = async function (task) {
    const res = await axios.get('/models/list/architecture/', {data: {task_id: task}});
    return res.data
}
export const getDatasetList = async function (task) {
    const res = await axios.get('/datasets/list/', {data: {task_id: task}});
    return res.data
}
export const getLeaderList = async function (task_id, dataset_id, aspect_ids) {
    const res = await axios.post('/tasks/result_view/', {task_id, dataset_id, aspect_ids});
    return res.data
}
export const getMetricList = async function (task, aspect, perspective) {
    const res = await axios.get('/models/list/metrics/', {params: {task_id: task, aspect_id: aspect, perspective_id: perspective}});
    return res.data
}
export const getParamList = async function (architecture) {
    const res = await axios.get('/models/list/parameters/', {params: {architecture_id: architecture}});
    return res.data
}

export const archUploadAction = "/api/models/upload/architecture/"
export const parameterUploadAction = "/api/tasks/parameter/"

export const createEvaluation = async function (createInfo) {
    const res = await axios.post('/tasks/creator/', createInfo);
    return res.data
}

export const getModelStatus = async function (instance_id) {
    const res = await axios.get('/tasks/condition/', {params:{instance_id}});
    return res.data
}

export const getEvaluationInfo = async function (instance_id) {
    const res = await axios.get('/tasks/info/', {params:{instance_id}});
    return res.data
}