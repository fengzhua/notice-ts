import React from 'react'
import styles from './index.module.scss'
import {Route, BrowserRouter as Router, Redirect, Switch, Link} from 'react-router-dom'
import routes from '../routes'
import Loadable from 'react-loadable';
import Notice from "../pages/notice";
import RenderProps from "../pages/renderProps";

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <header className={styles.header}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path={'/notice'}
                        component={Notice}/>
                    <Route
                        exact
                        path={'/renderprops'}
                        component={RenderProps}/>
                </Switch>

            </Router>
        </header>
    }
}
