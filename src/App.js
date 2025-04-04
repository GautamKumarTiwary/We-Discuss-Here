import './App.css';
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
import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <>
      <QuestionState> {/* Also updated here */}
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/AddQuestion" element={<AddQuestion />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </QuestionState>
    </>
  );
}

export default App;
