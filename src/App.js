import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import GamePlay from './component/gameplay/GamePlay';
import GameOver from './component/gameutils/GameOver';
import StartPage from './component/startPage/StartPage';
import { GlobalState } from './component/state/GlobalState';

function App() {
  return (
    <GlobalState>
      <Router>
        <Switch>
          <Route path='/' exact component={StartPage} />
          <Route path='/board' exact component={GamePlay} />
          <Route path='/gameover' exact component={GameOver} />
        </Switch>
      </Router>
    </GlobalState>
  );
}

export default App;
