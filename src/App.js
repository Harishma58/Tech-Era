import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import CourseItemData from './components/CourseItemData'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemData} />
    <Route path="/bad-path" component={NotFound} />
  </Switch>
)

export default App
