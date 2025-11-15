import React, { useState } from "react";
import { Card } from "./ui/card";
import { CheckCircle2, Square, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title || "");

  // Placeholder function for deleting a task
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success(`Task: ${task.title} deleted successfully!`);
      handleTaskChanged();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again later.");
    }
  };

  // Placeholder function for updating a task
  const updateTask = async () => {
    if (updatedTaskTitle.trim()) {
      try {
        setIsEditing(false);
        await api.put(`/tasks/${task._id}`, {
          title: updatedTaskTitle,
        });
        toast.success(`Task: ${updatedTaskTitle} updated successfully!`);
        handleTaskChanged();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task. Please try again later.");
        s;
      }
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status == "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Task: ${task.title} changed as completed!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`Task: ${task.title} changed as uncompleted!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again later.");
    }
  };

  // Setting to key press "Enter" to update task
  const handKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}>
      {/*Task Content */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleteButton}>
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Task Title or Edit Input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Edit task..."
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updatedTaskTitle}
              onChange={(e) => setUpdatedTaskTitle(e.target.value)}
              onKeyPress={handKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdatedTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}>
              {task.title}
            </p>
          )}

          {/* Due Date */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />

                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/*Edit Button*/}
          <Button
            variant="ghost"
            size="icon"
            className=" flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdatedTaskTitle(task.title || "");
            }}>
            <SquarePen className="size-4" />
          </Button>
          {/*Delete Button*/}
          <Button
            variant="ghost"
            size="icon"
            className=" flex-shrink-0 size-8 transition-colors text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
