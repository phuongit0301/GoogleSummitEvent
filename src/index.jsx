import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faAngleDown, faAngleDoubleDown, faAngleUp, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import history from './history';
import './style.css';
import App from './components/App';
import AppTemp from './components/AppTemp';
import BeforeBegin from './components/BeforeBegin';
import Init from './components/Init';
import StepFinalScreen from './components/StepFinalScreen';
import { store, persistor } from './store';

library.add(faArrowLeft, faAngleDown, faAngleDoubleDown, faAngleUp, faAngleDoubleUp);

render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={Init} />
					<Route path="/posts" component={App} />
					<Route path="/before" component={BeforeBegin} />
					<Route path="/temp" component={AppTemp} />
					<Route path="/final" component={StepFinalScreen} />
				</Switch>
			</Router >
		</PersistGate>
	</Provider>,
  document.getElementById('root')
)