import React, { useState } from "react";
import { Container, Button, Badge, Form, ProgressBar } from "react-bootstrap";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  // CREATE
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
  };

  // UPDATE
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  // SEARCH
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // STATISTIK
  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <Container className="my-5">
      {/* HEADER */}
      <div
        className="p-4 mb-4 rounded-4 shadow"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "white",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">📋 Task List Manager</h1>

            <p className="mb-0">Kelola tugas harian dengan mudah</p>
          </div>

          <Button variant="light" onClick={handleShowForm}>
            + Add Task
          </Button>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="mb-3">
        <Badge bg="primary" className="me-2">
          Total Task : {tasks.length}
        </Badge>

        <Badge bg="success">Selesai : {completedTasks}</Badge>
      </div>

      {/* PROGRESS */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold">Progress Penyelesaian Tugas</p>

        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </div>

      {/* SEARCH */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Cari task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        showEditForm={showEditForm}
      />

      {/* MODAL */}
      <TaskForm
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />

      {/* FOOTER */}
      <div className="text-center mt-5 text-muted">
        <small>Created by Kurnia Ramadhani | React Todo List</small>
      </div>
    </Container>
  );
}

export default App;
