const { default: mongoose } = require("mongoose");
mongoose.connect(
  process.env.DATABASE_URL
);

const todoSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const ToDo = mongoose.model("userTodos", todoSchema);

module.exports = ToDo;
