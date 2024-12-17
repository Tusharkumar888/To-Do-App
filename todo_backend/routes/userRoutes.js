const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../schema/userSchema");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const jwtTokens = process.env.JWT_SECRET;
const ToDo = require("../schema/todoSchema");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoutes = express.Router();

// route schema for sign up
const userSignUpSchema = zod.object({
  name: zod.string(),
  surname: zod.string(),
  userName: zod.string(),
  email: zod.string(),
  gender: zod.string(),
  password: zod.string(),
});

// route schema for sign up
userRoutes.post("/signup", async (req, res) => {
  const body = req.body;
  const bodyParse = userSignUpSchema.safeParse(body);

  if (!bodyParse.success) {
    return res.json({
      mess: "inavalide values",
    });
  }

  let user = await User.findOne({
    userName: body.userName,
  });

  if (user) {
    if (user._id || user.email) {
      return res.json({
        mess: "Username is alrady exsist please try with other username",
      });
    }
  }

  const createdUser = await User.create(body);

  const token = jwt.sign({ userId: createdUser._id }, jwtTokens);

  if (!token) {
    return res.json({
      mess: "unable to sign in",
    });
  }
  res.json({
    mess: "user created success",
    token: token,
    userId: createdUser._id,
  });
});

// route schema for log in
const userLogInSchema = zod.object({
  userName: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

// logIn route

userRoutes.post("/login", async (req, res) => {
  const body = req.body;
  const bodyParse = userLogInSchema.safeParse(body);

  if (!bodyParse.success) {
    return res.json({
      mess: "inavalide values",
    });
  }
  let user = await User.findOne({
    userName: bodyParse.data.userName,
    email: bodyParse.data.email,
    password: bodyParse.data.password,
  });

  if (!user) {
    return res.json({
      mess: "invalid username or password",
    });
  }

  const token = jwt.sign({ userId: user._id }, jwtTokens);

  if (!token) {
    return res.json({
      mess: "unable to sign in",
    });
  }
  res.json({
    mess: "user signin successfuly",
    token: token,
    userId: user._id,
  });
});

//add  the todo
const todoSchema = zod.object({
  taskId: zod.string(),
  title: zod.string(),
  description: zod.string(),
  dueDate: zod.preprocess((arg) => new Date(arg), zod.date()),
  priority: zod.string(),
  status: zod.boolean(),
});

userRoutes.post("/todo", authMiddleware, async (req, res) => {
  const body = req.body;

  // Validate input using Zod
  const parsetodo = todoSchema.safeParse(body);
  if (!parsetodo.success) {
    return res
      .status(400)
      .json({ message: "Invalid todo values", errors: parsetodo.error.errors });
  }

  const todoData = parsetodo.data;

  try {
    // Find the user by taskId
    const findUserId = await User.findOne({ _id: todoData.taskId });
    if (!findUserId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a todo with the same title already exists for this user
    const existingTodo = await ToDo.findOne({ title: todoData.title });
    if (existingTodo && existingTodo.taskId.equals(findUserId._id)) {
      return res
        .status(400)
        .json({ message: "You have already created this todo!" });
    }

    // Create the todo
    const createdTodo = await ToDo.create(todoData);
    if (!createdTodo) {
      return res.status(500).json({ message: "Unable to create the todo" });
    }

    // Success response
    return res.status(201).json({
      message: "Todo created successfully",
      todo: createdTodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// get todo Schema
const getTodoSchema = zod.object({
  taskId: zod.string(),
  title: zod.string(),
});
// get the todo
userRoutes.get("/todo", authMiddleware, async (req, res) => {
  const body = req.body;
  parsetodo = getTodoSchema.safeParse(body);
  if (!parsetodo.success) {
    return res.json({ mess: "todo does not exisit" });
  }

  const existingTodo = await ToDo.findOne({
    title: parsetodo.data.title,
    taskId: parsetodo.data.taskId,
  });
  if (!existingTodo) {
    return res.json({ mess: "todo not found" });
  }
  res.json(existingTodo);
});

//update todo status
const UpdateTodoSchema = zod.object({
  taskId: zod.string(),
  title: zod.string(),
});

//upade todo route
userRoutes.put("/todo", authMiddleware, async (req, res) => {
  const body = req.body;
  const parseBody = deleteTodoSchema.safeParse(body);
  if (!parseBody.success) {
    return res.json({ mess: "invalide input" });
  }

  let updated = await ToDo.findOneAndUpdate(
    {
      taskId: parseBody.data.taskId,
      title: parseBody.data.title,
    },
    {status: true,},
    {new: true,}
  );

  if(!updated){
    return res.json({
      mess:"unable to upade the todo!"
    })
  }

  res.json({
    mess:"succesfuly updated",
    updated:updated
  })

});

const deleteTodoSchema = zod.object({
  taskId: zod.string(),
  title: zod.string(),
});

// delete todo request
userRoutes.delete("/todo", authMiddleware, async (req, res) => {
  const taskId = req.query.taskId;  // Extract taskId from the query string
  const title = req.query.title;    // Extract title from the query string

  const parseBody = deleteTodoSchema.safeParse({
    taskId: taskId,
    title: title
  });

  if (!parseBody.success) {
    return res.json({ mess: "invalid input" });
  }

  let deleted = await ToDo.deleteOne({
    taskId: parseBody.data.taskId,
    title: parseBody.data.title,
  });

  if (!deleted.acknowledged) {
    return res.json({ mess: "unable to delete todo" });
  }

  res.json({
    mess: "todo has been deleted successfully",
    deleted: deleted.deletedCount,
  });
});




module.exports = userRoutes;
