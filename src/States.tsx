import statePopulations from './json/state-populations.json';

type State = keyof typeof statePopulations;

export type StatePopulations = {
  [K in State]: number;
};

export const States = () => (
  <div>
    {Object.entries(statePopulations as StatePopulations).map(
      ([state, population]) => (
        <div key={state}>
          {state}: {population}
        </div>
      )
    )}
  </div>
);
