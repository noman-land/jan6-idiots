import { Idiot } from './idiots/IdiotTypes';
import idiots from './json/idiots.json';

type Decade = '?' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
type IdiotsByDecade = { [K in Decade]: number };

const idiotsByDecade = Object.entries(
  (idiots as Idiot[]).reduce((accum, idiot) => {
    const bucket = (idiot.age || '?').toString()[0] as Decade;
    accum[bucket] = (accum[bucket] || 0) + 1;
    return accum;
  }, {} as IdiotsByDecade)
);

export const AgeBreakdown = () => (
  <table>
    <thead>
      <tr>
        <th align="left">Decade</th>
        <th align="right">Count</th>
      </tr>
    </thead>
    <tbody>
      {idiotsByDecade.map(([decade, count]) => (
        <tr key={decade}>
          <td>{`${decade}0s`}</td>
          <td>{count}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
