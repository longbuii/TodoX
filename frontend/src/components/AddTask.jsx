import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  // Function to add a new task
  const addTask = async () => {
    // Functionality to add a new task will be implemented here
    if (newTaskTitle.trim()) {
      try {
        // Example API call to add a new task
        await api.post("/tasks", { title: newTaskTitle });

        toast.success(`Task: ${newTaskTitle} added successfully!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error adding task?", error);
        toast.error("Failed to add task. Please try again later.");
      }

      setNewTaskTitle("");
    } else {
      toast.error("Task title cannot be empty.");
    }
  };

  // Handle Enter key press to add task
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What need do it?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}>
          <Plus className="size-5" />
          ADD
        </Button>
      </div>
    </Card>
  );
};
export default AddTask;
