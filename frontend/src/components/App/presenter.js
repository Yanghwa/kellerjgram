import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';

const App = props => [
  props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoute = props => (
  <Switch>
    <Route exact path="/" render={() => "feed"} />
    <Route exact path="/explore" render={() => "explore"} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
);

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