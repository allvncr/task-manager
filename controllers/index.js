const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../erros/custom-error");

const getTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getOneTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findById(taskID);
  if (!task) {
    return next(createCustomError(`No Task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const createTasks = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndRemove(taskID);
  if (!task) {
    return next(createCustomError(`No Task with id: ${taskID}`, 404));
  }
  res.status(200).send();
});

module.exports = {
  getTasks,
  getOneTasks,
  createTasks,
  updateTasks,
  deleteTasks,
};
