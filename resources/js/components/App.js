    // resources/assets/js/components/App.js

    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
    import FilesList from './FilesList'
	import NewFile from './NewFile';
	import Login from './Login';
	import SingleFile from './SingleFile';
	import CreateUser from './CreateUser';

    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
				<Route exact path='/' component={Login} />
				<Route path='/newUser' component={CreateUser} />
                <Route path='/list' component={FilesList} />				
				<Route path='/create' component={NewFile} />
				<Route path='/:id' component={SingleFile} />
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))