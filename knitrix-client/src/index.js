import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'


const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjcjj8vfi4dsl0184websamgz'
})

const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem('graphcoolToken') && `Bearer ${localStorage.getItem('graphcoolToken')}`,
  }
}));

const link = middlewareLink.concat(httpLink)
const cache = new InMemoryCache()

const client = new ApolloClient({ link, cache })

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('root'));
registerServiceWorker();
