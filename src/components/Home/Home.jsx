import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { GiProgression } from 'react-icons/gi';
import { FaPersonRunning } from 'react-icons/fa6';
import { MdOutlineUpcoming } from 'react-icons/md';
import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import LineChart from '../LineChart/LineChart';

const Home = () => {
  const { tasks } = useSelector((state) => state.taskReducer);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in progress').length;
  const upcomingTasks = tasks.filter(task => task.status === 'not started').length;

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <section className="container task-overview-section mb-3">
        <div className=" pt-3 d-flex ">
          <div className="task-card pb-2 border rounded-2 col-lg-3 col-md-5 col-sm-8 col-12 m-2" data-aos="fade-up">
            <div className="d-flex justify-content-between p-3">
              <GiProgression className="icon-1" />
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>This Month</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Week</Dropdown.Item>
                  <Dropdown.Item>Yesterday</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="m-0 d-flex justify-content-start ps-3">
              <span className="text-warning fs-1 p-2">{totalTasks}</span>
            </p>
            <div className="ps-4">
              <h2 className="justify-content-start d-flex">Total Tasks</h2>
            </div>
          </div>

          <div className=" task-card pb-2 border rounded-2 col-lg-3 col-md-5 col-sm-8 col-12 m-2" data-aos="fade-up">
            <div className="d-flex justify-content-between p-3">
              <FaPersonRunning className="icon-2" />
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>This Month</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Week</Dropdown.Item>
                  <Dropdown.Item>Yesterday</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="m-0 d-flex justify-content-start ps-3">
              <span className="text-success fs-1 p-2">{inProgressTasks}</span>
            </p>
            <div className="ps-4">
              <h2 className="justify-content-start d-flex">In Progress Tasks</h2>
            </div>
          </div>

          <div className="task-card pb-2 border rounded-2 col-lg-3 col-md-5 col-sm-8 col-12 m-2" data-aos="fade-up">
            <div className="d-flex justify-content-between p-3">
              <AiOutlineFileDone className="icon-4" />
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>This Month</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Week</Dropdown.Item>
                  <Dropdown.Item>Yesterday</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="m-0 d-flex justify-content-start ps-3">
              <span className="text-primary-emphasis fs-1 p-2">{completedTasks}</span>
            </p>
            <div className="ps-4">
              <h2 className="justify-content-start d-flex">Completed Tasks</h2>
            </div>
          </div>

          <div className="task-card pb-2 border rounded-2 col-lg-3 col-md-5 col-sm-8 col-12 m-2" data-aos="fade-up">
            <div className="d-flex justify-content-between p-3">
              <MdOutlineUpcoming className="icon-3" />
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>This Month</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Week</Dropdown.Item>
                  <Dropdown.Item>Tomorrow</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="m-0 d-flex justify-content-start ps-3">
              <span className="text-secondary fs-1 p-2">{upcomingTasks}</span>
            </p>
            <div className="ps-4">
              <h2 className="justify-content-start d-flex">Upcoming Tasks</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <h3>Progress</h3>
        <section className="col-12 d-sm-none d-md-block">
          <LineChart />
        </section>
      </div>

      <h2 className="container justify-content-center text-center mt-5">"What Our Clients Say"</h2>
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="testimonial-card col-lg-3 col-md-5 col-sm-8 col-12 m-2">
          <img
            src="https://randomuser.me/api/portraits/men/31.jpg"
            alt="John Doe"
            className="testimonial-image w-40"
          />
          <p className="testimonial-name text-center">John Doe</p>
          <p className="testimonial-about text-center">
            Working with WorkFlow Hub Front-End Services has been a great experience. The project was delivered on time, and the quality was exceptional.
          </p>
        </div>

        <div className="testimonial-card col-lg-3 col-md-5 col-sm-8 col-12 m-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Jane Smith"
            className="testimonial-image w-40"
          />
          <p className="testimonial-name text-center">Jane Smith</p>
          <p className="testimonial-about text-center">
            I’m very impressed with the level of detail and professionalism that WorkFlow Hub Front-End Services brings to their work. Highly recommended!
          </p>
        </div>

        <div className="testimonial-card col-lg-3 col-md-5 col-sm-8 col-12 m-2">
          <img
            src="https://randomuser.me/api/portraits/men/65.jpg"
            alt="Michael Lee"
            className="testimonial-image w-40"
          />
          <p className="testimonial-name text-center">Michael Lee</p>
          <p className="testimonial-about text-center">
            WorkFlow Hub Front-End Services provided top-notch service. The team was responsive and very knowledgeable. I’m extremely satisfied with the outcome.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
