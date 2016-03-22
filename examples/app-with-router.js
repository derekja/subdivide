/*global document:false*/
import React, { Component } from 'react'
import Provider, { render } from 'react-dom'
import configureStore from '../src/containers/Subdivide'
import {
  Router, Route, IndexRoute, Link,
  createMemoryHistory,
  hashHistory,
  browserHistory
} from 'react-router'

const DevTools = require('./DevTools').default;
const store = {}; 
//configureStore(this.props);



//console.log(require.context('./pages/'), 'hello')
let pages = require.context('./pages', false, /.*.js$/)
  .keys()
  .map(page => page.replace('./', '').replace('.js',''))

const Menu = () => {
  const menu = []
  pages
    .map(page => <Link to={page} key={page}>{page}</Link>)
    .forEach((page, i) => {
      menu.push(page)
      menu.push(<span key={i}> | </span>)
    })
  menu.pop()
  return <div>{ menu }</div>
}

const Page = props => {
  return (
    <div>
      {props.children}
       <DevTools />
    </div>
  )
}

const Demo = ({ params }) => {
  let DemoComponent = require(`./pages/${params.demo}.js`).default
  return (<div><p/><DemoComponent/></div>)
}

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Menu} />
      <Route path="/:demo" component={Demo} />
    </Route>
  </Router>
)

const content = document.getElementById('content')

render(<App/>, content)
