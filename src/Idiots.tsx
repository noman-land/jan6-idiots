import idiots from './json/idiots.json';
import { StatePopulations } from './States';

type YesNo = 'Y' | 'N';

type Idiot = {
  first: string;
  last: string;
  middle: string;
  publish: YesNo;
  new: YesNo;
  updated: YesNo;
  summary: string;
  jurisdiction: 'Federal' | 'DC';
  charges: string;
  charges_link: string;
  case_status: 'pleaded-guilty' | 'pleaded-not-guilty';
  case_updates: string;
  violence_assault: YesNo;
  conspiracy: YesNo;
  theft: YesNo;
  property: YesNo;
  age: number;
  city: string;
  state: keyof StatePopulations;
  military_le: YesNo;
  extremist: YesNo;
  inspired_trump: YesNo;
  photo_name: string;
};

export const Idiots = () => (
  <div>
    {(idiots as Idiot[]).map(idiot => (
      <div key={`${idiot.first}-${idiot.last}-${idiot.charges_link}`}>
        {idiot.first} {idiot.last}, aged {idiot.age}, from {idiot.city},{' '}
        {idiot.state}.
      </div>
    ))}
  </div>
);
