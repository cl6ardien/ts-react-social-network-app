import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Landing from './components/Landing';
import FourOhFour from './components/FourOhFour';
import FullPost from './components/FullPost';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/posts/:post_id" component={FullPost} />
      <Route component={FourOhFour} />
    </Switch>
  );
}

export default App;
