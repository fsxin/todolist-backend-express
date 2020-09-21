import mongoose from '../utils/dbConfig';

const ToDoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    finishTime: Number,
    createTime: Number
})

const todoListModel = mongoose.model('TodoList', ToDoListSchema, 'todolist');

export default todoListModel;