import './App.css';
import { AuthProvider } from './context/AuthContext';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Quiz from './components/Quiz';
import QuestionState from './context/question/QuestionState';
import Signup from './components/Signup';
import Login from './components/Login';
import News from './components/News';
import Profile from './components/profile'
import TakeQuiz from './components/TakeQuiz';
import AdminDashboard from './components/AdminDashboard';
// import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <AuthProvider>
        <QuestionState> {/* Also updated here */}
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/Quiz" element={<Quiz />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/takequiz" element={<TakeQuiz />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </QuestionState>
    </AuthProvider>
);
}

export default App;
