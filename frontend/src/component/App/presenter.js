import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './styles.scss';
import Footer from 'component/Footer';

const App = props => [
  props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
]

const PrivateRoute = props => (
  <Switch>
    <Route exact path="/" render={() => "feed"} />
    <Route exact path="/explore" render={() => "explore"} />
  </Switch>
)

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" render={() => "login"} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
)

// class App extends Component {
//   render() {
//     return (
//       <div className={styles.App}>
//         <Switch>
//           <Route exact path="/" render={() =>"hello"} />
//           <Route path="/login" render={() => "login"} />
//         </Switch>
//         <Footer />
//       </div>
//     );
//   }
// }

export default App;
