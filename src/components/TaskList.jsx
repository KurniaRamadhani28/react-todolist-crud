import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "secondary";
      case "In Progress":
        return "primary";
      case "Done":
        return "success";
      default:
        return "dark";
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <Card className="text-center shadow-sm border-0 p-4">
          <p className="mb-0 text-muted">
            Belum ada task. Silakan tambahkan task baru.
          </p>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="mb-3 border-0 shadow-sm rounded-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div style={{ width: "40%" }}>
                <small className="text-muted">Task</small>
                <div>{task.name}</div>
              </div>

              <div style={{ width: "20%" }}>
                <small className="text-muted">Priority</small>
                <div>
                  <Badge bg={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              </div>

              <div style={{ width: "20%" }}>
                <small className="text-muted">Status</small>
                <div>
                  <Badge bg={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </div>

              <div>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => showEditForm(task)}
                >
                  <FaEdit />
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskList;
