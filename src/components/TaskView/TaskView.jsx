import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readTasks } from '../../Services/Action/taskAction';
import { BsListTask } from 'react-icons/bs';
import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { CiMenuKebab } from 'react-icons/ci';
import './TaskView.css';
import MessageBox from '../MessageBox/MessageBox';

const TaskView = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.taskReducer) || [];
  const [filterStatus, setFilterStatus] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    dispatch(readTasks());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(task => filterStatus ? task.status === filterStatus : true)
    : [];

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const seconds = timestamp.seconds || 0;
    const milliseconds = seconds * 1000;
    return new Date(milliseconds).toLocaleString();
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'not started':
        return '#f5cc84';
      case 'in progress':
        return 'hsla(100, 76%, 80%, 0.457)';
      case 'completed':
        return 'hsla(191, 76%, 80%, 0.573)';
      default:
        return 'hsla(43, 76%, 80%, 0.979)';
    }
  };

  const handleOpenMessageBox = (id) => {
    setSelectedTaskId(id);
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
    setSelectedTaskId(null);
  };

  return (
    <>
      {showMessageBox && (
        <MessageBox taskId={selectedTaskId} onClose={handleCloseMessageBox} />
      )}

      <div className=" filter-section container mb-0">
        <div className="filter-dropdown">
          <select
            name="filterStatus"
            value={filterStatus}
            onChange={handleFilterChange}
            className="custom-select"
          >
            <option value="">All</option>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="container">

        <div className="row">
          {filteredTasks.map((task, index) => (
            <div className="col-12 col-sm-6 col-md-4 p-3" key={index}>
              <div className="task" style={{ borderColor: getStatusBorderColor(task.status) }}>
                <div
                  className="task__status-icon"
                  style={{ backgroundColor: getStatusBorderColor(task.status) }}
                >
                  <BsListTask />
                </div>
                <div className="task__content">
                  <div className="task__content-left">
                    <div className="task__title-title">
                      <span className="task__field-title">Title</span>
                      <span className="task__field-value">{task.title}</span>
                    </div>
                    <p className="task__description">{task.description}</p>
                    <div className="task__fields">
                      <span className="task__field-title">Dependencies</span>
                      <span className="task__field-value">{task.dependencies}</span>
                    </div>
                    <div className="task__fields">
                      <div className="task__field">
                        <span className="task__field-title">Status</span>
                        <p className="task__description">{task.status}</p>
                      </div>
                      <div className="task__field">
                        <span className="task__field-title">Start Date</span>
                        <span className="task__field-value">
                          {formatTimestamp(task.planStartTime)}
                        </span>
                      </div>
                      <div className="task__field">
                        <span className="task__field-title">End Date</span>
                        <span className="task__field-value">
                          {formatTimestamp(task.planEndTime)}
                        </span>
                      </div>
                      <div className="task__field">
                        <span className="task__field-title">Duration</span>
                        <span className="task__field-value">{task.duration}</span>
                      </div>
                      <div className="task__field">
                        <span className="task__field-title">Team</span>
                        <span className="task__field-value">{task.team}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task__action">
                  <Dropdown as={NavItem}>
                    <Dropdown.Toggle as={NavLink} className="custom-dropdown-toggle">
                      <CiMenuKebab />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ul>
                        <li className="task_action__item">
                          <a href="#" className="task_action__link">
                            <span className="task_action__description btn fs-6 fw-light" onClick={() => handleOpenMessageBox(task.id)}>Message</span>
                          </a>
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskView;
