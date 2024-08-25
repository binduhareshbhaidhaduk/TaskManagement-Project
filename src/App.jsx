import { Route, Routes, Navigate } from "react-router";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import SignUP from "./components/SignUp/SignUP";
import { useSelector } from "react-redux";
import TaskView from "./components/TaskView/TaskView";
import CalendarPage from "./components/Calender/Calendar";
import LogIn from "./components/LogIn/LogIn";

function App() {
  const { isLogin } = useSelector(state => state.taskReducer);

  return (
    <>
      {isLogin ? (
        <>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/task" element={<TaskView />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
