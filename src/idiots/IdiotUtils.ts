import haversine from 'haversine';

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
import { comparators, placeLookup } from './IdiotConstants';

export const getDistance: GetDistance = idiot => {
  const { INTPTLAT: lat, INTPTLONG: lon } =
    (placeLookup[`${idiot.city} city`] || {})[nameToAbbrev[idiot.state]] || {};

  if (!lat || !lon) {
    return null;
  }

  const { INTPTLAT: latDC, INTPTLONG: lonDC } =
    placeLookup['Washington city']['DC'];

  if (!latDC || !lonDC) {
    return null;
  }

  return haversine(
    { latitude: lat, longitude: lon },
    { latitude: latDC, longitude: lonDC },
    { unit: 'km' }
  );
};

export const compareDistance = (a: Idiot, b: Idiot) => {
  const aDistance = getDistance(a) ?? 0;
  const bDistance = getDistance(b) ?? 0;

  return aDistance - bDistance;
};

export const makeComparator: MakeCamparator = property => (a, b) => {
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

export const makeSorter: MakeSorter = (sortField, sortDirection) => (a, b) => {
  [a, b] = sortDirection ? [a, b] : [b, a];
  const comparator = comparators[sortField];
  return comparator ? comparator(a, b) : 0;
};
