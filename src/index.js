import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import promise from 'redux-promise';

import logo from './logo.svg';
import './index.css';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/posts/new" component={PostsNew} />
                        <Route path="/posts/:id" component={PostsShow} />
                        <Route path="/" component={PostsIndex} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    </Provider>
    , document.querySelector('.container-fluid'));
