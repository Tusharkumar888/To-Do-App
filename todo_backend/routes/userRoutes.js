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
});

// get the todo
userRoutes.get("/todo", authMiddleware, async (req, res) => {
  const { taskId } = req.query;
  const parsedTodo = getTodoSchema.safeParse({ taskId });
  if (!parsedTodo.success) {
    return res.status(400).json({ mess: "Invalid taskId" });
  }

  const existingTodo = await ToDo.find({ taskId: parsedTodo.data.taskId });
  if (existingTodo.length === 0) {
    return res.status(404).json({ mess: "Todo not found" });
  }
  res.json(existingTodo);
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

// Delete todo request
userRoutes.delete("/todo", authMiddleware, async (req, res) => {
  const { taskId, title } = req.query; // Extract taskId and title from query string

  // Validate the inputs using Zod
  const parseResult = deleteTodoSchema.safeParse({ taskId, title });

  if (!parseResult.success) {
    return res.status(400).json({
      mess: "Invalid input",
      errors: parseResult.error.errors, // Return validation errors
    });
  }

  try {
    // Attempt to delete the todo
    const result = await ToDo.deleteOne({
      taskId: parseResult.data.taskId,
      title: parseResult.data.title,
    });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        mess: "Todo not found or already deleted",
      });
    }

    // Return success response
    res.status(200).json({
      mess: "Todo has been deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      mess: "Internal server error",
    });
  }
});





module.exports = userRoutes;
