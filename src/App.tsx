import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/Home.page';
import ClassifierPage from './pages/ClassifierPage/Classifier.page';

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dog" element={<ClassifierPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
