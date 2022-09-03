import idiots from './json/idiots.json';
import { StatePopulations } from './States';

type CaseStatus =
  | 'acquitted'
  | 'convicted'
  | 'dismissed'
  | 'missing'
  | 'pleaded-guilty'
  | 'pleaded-not-guilty';

type Jurisdiction = 'Federal' | 'DC' | 'Federal and DC';
type YesNo = 'Y' | 'N';

type Idiot = {
  age: number;
  case_status: CaseStatus;
  case_updates: string;
  charges: string;
  charges_link: string;
  city: string;
  conspiracy: YesNo;
  first: string;
  extremist: YesNo;
  inspired_trump: YesNo;
  jurisdiction: Jurisdiction;
  last: string;
  middle: string;
  military_le: YesNo;
  new: YesNo;
  photo_name: string;
  property: YesNo;
  publish: YesNo;
  summary: string;
  state: keyof StatePopulations;
  theft: YesNo;
  updated: YesNo;
  violence_assault: YesNo;
};

type Field = {
  prop: keyof Idiot;
  label: string;
};

const fields: Field[] = [
  {
    prop: 'first',
    label: 'First',
  },
  {
    prop: 'last',
    label: 'Last',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'city',
    label: 'City',
  },
  {
    prop: 'state',
    label: 'State',
  },
  {
    prop: 'case_status',
    label: 'Status',
  },
  {
    prop: 'jurisdiction',
    label: 'Jusrisdiction',
  },
];

export const Idiots = () => (
  <table>
    <thead>
      {fields.map(({ label }) => (
        <th align="left" key={label}>
          {label}
        </th>
      ))}
    </thead>
    <tbody>
      {(idiots as Idiot[])
        .sort((iA, iB) => iB.age - iA.age)
        .map(idiot => (
          <tr key={`${idiot.first}-${idiot.last}-${idiot.charges_link}`}>
            {fields.map(({ prop }) => (
              <td key={prop}>{idiot[prop] || '--'}</td>
            ))}
          </tr>
        ))}
    </tbody>
  </table>
);
