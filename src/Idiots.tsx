import { useCallback, useState } from 'react';

import idiots from './json/idiots.json';
import places from './json/census-gov-places.json';
import stateAbbreviations from './json/state-abbreviations.json';
import { State } from './States';

type CaseStatus =
  | 'acquitted'
  | 'convicted'
  | 'dismissed'
  | 'missing'
  | 'pleaded-guilty'
  | 'pleaded-not-guilty';

type Jurisdiction = 'Federal' | 'DC' | 'Federal and DC';
type YesNo = 'Y' | 'N';

export type Idiot = {
  age: number | null;
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
  state: State;
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
    label: 'First',
    prop: 'first',
  },
  {
    label: 'Last',
    prop: 'last',
  },
  {
    label: 'Age',
    prop: 'age',
  },
  {
    label: 'City',
    prop: 'city',
  },
  {
    label: 'State',
    prop: 'state',
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

type Sorter = (a: Idiot, b: Idiot) => number;

type MakeCamparator = (property: keyof Idiot) => Sorter;

const makeComparator: MakeCamparator = property => (a, b) => {
  const aProp = a[property];
  const bProp = b[property];

  if (typeof aProp === 'string' && typeof bProp === 'string') {
    return aProp.localeCompare(bProp);
  }

  if (
    (typeof aProp === 'number' || aProp === null) &&
    (typeof bProp === 'number' || bProp === null)
  ) {
    return Number(aProp) - Number(bProp);
  }

  return 0;
};

type Comparators = { [K: string]: Sorter };

const comparators: Comparators = Object.fromEntries(
  fields.map(({ prop }) => [prop, makeComparator(prop)])
);

type MakeSorter = (sortField: keyof Idiot, sortDirection: boolean) => Sorter;

const makeSorter: MakeSorter = (sortField, sortDirection) => (a, b) => {
  [a, b] = sortDirection ? [a, b] : [b, a];
  const comparator = comparators[sortField];
  return comparator ? comparator(a, b) : 0;
};

const defaultSortDirection = true as const;
const defaultSortField = 'age';

export const Idiots = () => {
  const [sortField, setSortField] = useState<keyof Idiot>(defaultSortField);
  const [sortDirection, setSortDirection] =
    useState<boolean>(defaultSortDirection);

  const makeSortHandler = useCallback(
    (fieldName: keyof Idiot) => () => {
      setSortField(fieldName);
      setSortDirection(direction =>
        sortField === fieldName ? !direction : defaultSortDirection
      );
    },
    [sortField]
  );

  return (
    <table>
      <thead>
        <tr>
          {fields.map(({ label, prop }) => (
            <th align="left" key={label} onClick={makeSortHandler(prop)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(idiots as Idiot[])
          .sort(makeSorter(sortField, sortDirection))
          .map(idiot => (
            <tr key={`${idiot.first}-${idiot.last}-${idiot.charges_link}`}>
              {fields.map(({ prop }) => (
                <td key={prop} style={{ whiteSpace: 'nowrap' }}>
                  {idiot[prop] || '--'}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
