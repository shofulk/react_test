import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Test from './containers/Test/Test'
import TestCreate from './containers/TestCreater/TestCreate'
import TestList from './containers/TestList/TestList'
import Auth from './containers/Auth/Auth'
import {connect} from 'react-redux'
import Logout from './component/Logout/Logout'
import {autoLogin} from './store/actions/auth'

class App extends Component{

  componentDidMount(){
    this.props.autoLogin();
  }

    render(){
      let routes = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/test/:id' component={Test}/>
            <Route path='/' exact component={TestList}/>
            <Redirect to = '/'/>
          </Switch>
      );

      if(this.props.isAuthenticated){
        routes = (
          <Switch>
              <Route path='/test-creater' component={TestCreate}/>
              <Route path='/test/:id' component={Test}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/' exact component={TestList}/>
              <Redirect to = '/'/>
            </Switch>
        )
      }

      return(
        <Layout>
            {routes}
        </Layout>
      )
    }
}

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
