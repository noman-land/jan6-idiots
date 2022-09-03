import { Idiot } from './Idiots';
import idiots from './json/idiots.json';
import statePopulations from './json/state-populations.json';

type State = keyof typeof statePopulations;

export type StatePopulations = {
  [K in State]: number;
};

const format = new Intl.NumberFormat().format;

const sortedStates = Object.entries(statePopulations as StatePopulations).sort(
  ([, popA], [, popB]) => popB - popA
) as [State, number][];

type IdiotsByState = { [K in State]: number };

const idiotsByState = (idiots as Idiot[]).reduce((accum, idiot) => {
  accum[idiot.state] = (accum[idiot.state] || 0) + 1;
  return accum;
}, {} as IdiotsByState);

console.log(idiotsByState);

const getScore = (amount: number, population: number) => {
  console.log((amount / population) * 10_000_000);
  return (amount / population) * 10_000_000;
};

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
        {sortedStates
          .sort(
            ([stateA], [stateB]) =>
              getScore(idiotsByState[stateB] || 0, statePopulations[stateB]) -
              getScore(idiotsByState[stateA] || 0, statePopulations[stateA])
          )
          .map(([state, population]) => {
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
