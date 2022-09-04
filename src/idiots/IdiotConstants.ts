import idiots from '../json/idiots.json';
import places from '../json/census-gov-places.json';
import { nameToAbbrev } from '../constants/state-constants';
import {
  Comparators,
  Field,
  GetDistance,
  Idiot,
  MakeCamparator,
  MakeSorter,
  Place,
  PlaceLookup,
} from './IdiotTypes';
import { compareDistance, getDistance, makeComparator } from './IdiotUtils';

export const placeLookup = (places as Place[]).reduce((lookup, place) => {
  const cityLookup = lookup[place.NAME] ?? {};
  cityLookup[place.USPS] = place;

  lookup[place.NAME] = cityLookup;
  return lookup;
}, {} as PlaceLookup);

export const fields: Field[] = [
  {
    label: 'First',
    prop: 'first',
  },
  {
    label: 'Last',
    prop: 'last',
  },
  {
    align: 'right',
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
  // {
  //   prop: 'case_status',
  //   label: 'Status',
  // },
  // {
  //   prop: 'jurisdiction',
  //   label: 'Jusrisdiction',
  // },
  {
    align: 'right',
    prop: 'distance',
    label: 'Distance (km)',
    renderer: idiot => getDistance(idiot)?.toFixed(1) ?? null,
  },
];

export const comparators: Comparators = Object.fromEntries([
  ...fields.map(({ prop }) => [prop, makeComparator(prop)]),
  ['distance', compareDistance],
]);
