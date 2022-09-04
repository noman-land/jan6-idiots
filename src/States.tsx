import { Idiot } from './idiots/IdiotTypes';
import idiots from './json/idiots.json';
import statePopulations from './json/state-populations.json';

export type State = keyof typeof statePopulations;

export type StatePopulations = {
  [K in State]: number;
};

const format = new Intl.NumberFormat().format;

type IdiotsByState = { [K in State]: number };

const idiotsByState = (idiots as Idiot[]).reduce((accum, idiot) => {
  accum[idiot.state] = (accum[idiot.state] || 0) + 1;
  return accum;
}, {} as IdiotsByState);

const getScore = (amount: number, population: number) =>
  (amount / population) * 10_000_000; // Inflate to value between 0 - 100

type SortedStates = [State, number][];

const sortedStates = Object.entries(statePopulations).sort(
  ([stateA], [stateB]) =>
    getScore(
      idiotsByState[stateB as State] || 0,
      statePopulations[stateB as State]
    ) -
    getScore(
      idiotsByState[stateA as State] || 0,
      statePopulations[stateA as State]
    )
) as SortedStates;

export const States = () => (
  <div>
    <table>
      <thead>
        <tr>
          <th align="left">State</th>
          <th align="right">Population</th>
          <th align="right">Idiots</th>
          <th align="right">Idiot Score</th>
        </tr>
      </thead>
      <tbody>
        {sortedStates.map(([state, population]) => {
          const amount = idiotsByState[state] || 0;
          return (
            <tr key={state}>
              <td>{state}</td>
              <td align="right">{format(population)}</td>
              <td align="right">{format(amount)}</td>
              <td align="right">{getScore(amount, population).toFixed(1)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
