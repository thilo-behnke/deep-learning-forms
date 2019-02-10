import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {
    trainMode: 'deep',
    dataset: 'mnist',
    spec: {
        sampleSelect: {
            formData: {
                sampleSize: 50
            }
        },
        parameterSelect: {
            formData: {
                layers: 2,
                epochs: 5
            }
        }
    }
} as any, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
));

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById("root"));

registerServiceWorker();
