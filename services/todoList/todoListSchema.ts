import mongoose from "../../utils/dbConfig";

const ToDoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createTime: Number,
  isFinished: Boolean,
  finishTime: Number,
  updateTime: Number,
});

const todoListModel = mongoose.model("TodoList", ToDoListSchema, "todolist");

export interface ITodoItem {
  _id?: string;
  name?: string;
  content?: string;
  createTime?: number;
  isFinished?: boolean;
  finishTime?: number;
  updateTime?: number;
}

// 获取所有代办事项
export function getAll(): Promise<ITodoItem[]> {
  return new Promise((resolve, reject) => {
    todoListModel.find({}, (error: any, todoList: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(todoList);
      }
    });
  });
}

// 根据名称获取代办事项
export function getTodoItemByName(name: string): Promise<ITodoItem[]> {
  return new Promise((resolve, reject) => {
    todoListModel.find({ name }, (error: any, todoItem: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(todoItem);
      }
    });
  });
}

// 保存代办事项
export function saveTodoItem(item: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const newTodoList = new todoListModel({
      ...item,
      createTime: new Date().getTime(),
      isFinished: false,
      finishTime: 0,
      updateTime: new Date().getTime(),
    });
    newTodoList.save((error: any, docs: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// 根据id获取代办事项
export function getTodoItemById(id: string): Promise<ITodoItem[]> {
  return new Promise((resolve, reject) => {
    todoListModel.find({ _id: id }, (error: any, todoItem: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(todoItem);
      }
    });
  });
}

// 修改待办事项
export function updateTodoItem(item: ITodoItem): Promise<ITodoItem[]> {
  return new Promise((resolve, reject) => {
    todoListModel.updateOne(
      { _id: item._id },
      { ...item, updateTime: new Date().getTime() },
      null,
      (error: any, todoItem: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(todoItem);
        }
      }
    );
  });
}

// 删除代办事项
export function deleteTodoItemById(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    todoListModel.deleteOne({ _id: id }, null, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
