import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  const saveTask = (e) => {
    e.preventDefault();
    // Logic to save task (either create or update)
    closeModal();
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="row no-gutters">
        <Sidebar openModal={() => openModal(null)} />
        <div className="col-md-9 p-3">
          <TaskList tasks={tasks} onEdit={openModal} />
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} task={selectedTask} onClose={closeModal} onSave={saveTask} />
    </div>
  );
};

const Header = () => (
  <header className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Task Manager</a>
    <div className="navbar-nav ml-auto">
      <a className="nav-item nav-link" href="#">Home</a>
      <a className="nav-item nav-link" href="#">Tasks</a>
      <a className="nav-item nav-link" href="#">Profile</a>
      <a className="nav-item nav-link" href="#">Logout</a>
    </div>
  </header>
);

const Sidebar = ({ openModal }) => (
  <aside className="col-md-3 bg-light p-3">
    <ul className="list-group mb-3">
      <li className="list-group-item"><a href="#">All Tasks</a></li>
      <li className="list-group-item"><a href="#">Completed Tasks</a></li>
      <li className="list-group-item"><a href="#">Pending Tasks</a></li>
      <li className="list-group-item"><a href="#">Important</a></li>
    </ul>
    <button className="btn btn-primary w-100" onClick={openModal}>Create New Task</button>
  </aside>
);

const TaskList = ({ tasks, onEdit }) => (
  <div>
    {tasks.length === 0 ? (
      <div className="alert alert-info">No tasks available</div>
    ) : (
      tasks.map(task => (
        <div className="card mb-3" key={task.id}>
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <p className="card-text"><small className="text-muted">Due: {task.dueDate}</small></p>
            <button className="btn btn-warning mr-2" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn btn-danger mr-2">Delete</button>
            <button className="btn btn-success">Mark as Completed</button>
          </div>
        </div>
      ))
    )}
  </div>
);

const TaskModal = ({ isOpen, task, onClose, onSave }) => (
  isOpen ? (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? "Edit Task" : "Create Task"}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={onSave}>
            <div className="modal-body">
              <div className="form-group">
                <label>Task Title</label>
                <input type="text" className="form-control" defaultValue={task?.title || ''} placeholder="Task Title" required />
              </div>
              <div className="form-group">
                <label>Task Description</label>
                <textarea className="form-control" defaultValue={task?.description || ''} placeholder="Task Description" required></textarea>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" className="form-control" defaultValue={task?.dueDate || ''} required />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select className="form-control" defaultValue={task?.priority || 'Medium'}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">{task ? "Save" : "Create"}</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null
);

export default HomePage;
