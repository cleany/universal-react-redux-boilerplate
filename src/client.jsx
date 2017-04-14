import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import configureRoutes from './routes';

const store = configureStore(window.INITIAL_STATE);
const routes = configureRoutes(store);

if (DEV) {
  const { AppContainer } = require('react-hot-loader'); /* eslint global-require: [ off ],
                                               import/no-extraneous-dependencies: [ off ] */

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );

  // Hot reloading on the client
  if (module.hot) {
    module.hot.accept();
  }
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app'),
  );
}
