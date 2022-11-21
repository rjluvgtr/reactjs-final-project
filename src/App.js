import './App.css';
import React from 'react'
import Navbar from './Navbar';
import Loginpage from './Loginpage'
import Dashboard from './Dashboard';
import Product from './Products';
import Account from './Accounts';
import Footer from './Footer';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      data: '',
    }
  }
  async componentDidMount(){
    let response = await axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json');
    this.setState({data:response.data})
    localStorage.setItem('adminPanelData',JSON.stringify(response.data))
  }
  render() {
    return (
      <div className="App">
        <Router>
            <Navbar/>
          <Switch>
              <Route path='/' exact component={Dashboard}></Route>
              <Route path='/Product' exact component={Product}></Route>
              <Route path='/Account' exact component={Account}></Route>
              <Route path='/Footer' exact component={Footer}></Route>
              <Route path='/Loginpage' exact component={Loginpage}></Route>
              {/* <Route path='' exact component={}></Route> */}
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
}
}


