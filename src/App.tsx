import { AgeBreakdown } from './AgeBreakdown';
import './App.css';
import { Idiots } from './idiots/Idiots';
import { States } from './States';

function App() {
  return (
    <div className="App">
      <States />
      <br />
      <br />
      <AgeBreakdown />
      <br />
      <br />
      <Idiots />
    </div>
  );
}

export default App;
