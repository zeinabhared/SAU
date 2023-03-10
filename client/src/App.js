import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Instructor from './pages/Instructor';
import Student from './pages/Student';
import SavedClasses from './pages/SavedClasses';

const httpLink = createHttpLink({
  uri: 'https://sau100.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
  <ApolloProvider client ={client}>
   <Router>
        <AppNavbar/>
        <Routes>
          <Route 
            path='/' 
            element={<Home/>} 
          />
          <Route 
            path='/about-us' 
            element={<AboutUs/>} 
          />
          <Route 
            path='/instructors' 
            element={<Instructor/>} 
          />
            <Route 
            path='/student' 
            element={<Student />} 
          />
           <Route 
            path='/saved' 
            element={<SavedClasses/>} 
          />
          <Route 
            path='/*'
            element={<h1 className='display-2 text-light'>Oops Under Construction! Coming Soon!</h1>}
          />
        </Routes>
        <Footer/>
    </Router>
    </ApolloProvider>
  );
}

export default App;