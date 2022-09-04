import { abbrevToName } from '../constants/state-constants';
import { State } from '../States';

export type Place = {
  ALAND: number;
  ALAND_SQMI: number;
  ANSICODE: string;
  AWATER: number;
  AWATER_SQMI: number;
  GEOID: string | number;
  FUNCSTAT: string;
  INTPTLAT: number;
  INTPTLONG: number;
  LSAD: number;
  NAME: string;
  USPS: keyof typeof abbrevToName;
};

type CityLookup = {
  [state in keyof typeof abbrevToName]: Place;
};

export type PlaceLookup = {
  [city: string]: CityLookup;
};

type CaseStatus =
  | 'acquitted'
  | 'convicted'
  | 'dismissed'
  | 'missing'
  | 'pleaded-guilty'
  | 'pleaded-not-guilty';

type Jurisdiction = 'Federal' | 'DC' | 'Federal and DC';
type YesNo = 'Y' | 'N';

type ComputedProperties = {
  distance: number;
};

export type Idiot = {
  age: number | null;
  case_status: CaseStatus;
  case_updates: string;
  charges: string;
  charges_link: string;
  city: string;
  conspiracy: YesNo;
  extremist: YesNo;
  first: string;
  inspired_trump: YesNo;
  jurisdiction: Jurisdiction;
  last: string;
  middle: string;
  military_le: YesNo;
  new: YesNo;
  photo_name: string;
  property: YesNo;
  publish: YesNo;
  state: State;
  summary: string;
  theft: YesNo;
  updated: YesNo;
  violence_assault: YesNo;
} & ComputedProperties;

export type Field = {
  align?: 'right';
  label: string;
  prop: keyof Idiot;
  renderer?: (idiot: Idiot) => string | null;
};

export type GetDistance = (idiot: Idiot) => number | null;

type Sorter = (a: Idiot, b: Idiot) => number;

export type MakeCamparator = (property: keyof Idiot) => Sorter;

export type Comparators = { [K: string]: Sorter };

export type MakeSorter = (
  sortField: keyof Idiot,
  sortDirection: boolean
) => Sorter;
