import statePopulations from './json/state-populations.json';

type State = keyof typeof statePopulations;

export type StatePopulations = {
  [K in State]: number;
};

const formatter = new Intl.NumberFormat().format;

const sortedStates = Object.entries(statePopulations as StatePopulations).sort(
  ([, popA], [, popB]) => popB - popA
);

export const States = () => (
  <div>
    <table>
      <thead>
        <th align="left">State</th>
        <th align="right">Population</th>
      </thead>
      <tbody>
        {sortedStates.map(([state, population]) => (
          <tr key={state}>
            <td>{state}</td>
            <td align="right">{formatter(population)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
