import React from 'react';

// import AppStyle from "./App.module.css"

import TabMain from "./components/Main"

import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
        <TabMain />
      </Router>
    </div>
  );
}

export default App;
