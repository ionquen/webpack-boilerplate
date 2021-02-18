import React, { Suspense, lazy } from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import css from 'Styl/menu.styl'

const Page1 = lazy(() => import('Components/page1'))
const Page2 = lazy(() => import('Components/page2'))

export function Routing() {
    return <div className={css.menu}>
        
        <Link to="/">page1</Link>
        <Link to="/page2">page2</Link>
            <Switch>
        <Suspense fallback="">
                <Route exact path="/" component={Page1} />
                <Route path="/page2" component={Page2} />
        </Suspense>
            </Switch>
    </div>
}