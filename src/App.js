import React from 'react';
import './App.css';
import RuleForm from './pages/RuleForm/index'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <div id='main-content-container column-item'> 
        <RuleForm/>
      </div>
      <Footer/> 
    </div>
  );
}

export default App;
