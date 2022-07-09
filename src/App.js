import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export default class App extends Component {
  pageSize = 5;
  country = "in";
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Router>
          <Navbar /> 
            <Routes>
              <Route exact path="/" element={<News apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={this.country} category="general" />}></Route>
              <Route exact path="/business" element={<News apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={this.country} category="business" />}></Route>
              <Route exact path="/health" element={<News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={this.country} category="health" />}></Route>
              <Route exact path="/science" element={<News apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={this.country} category="science" />}></Route>
              <Route exact path="/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country={this.country} category="technology" />}></Route>
              <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment" />}></Route>
              <Route exact path="/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country={this.country} category="sports" />}></Route>
            </Routes>
        </Router>
      </>
    )
  }
}