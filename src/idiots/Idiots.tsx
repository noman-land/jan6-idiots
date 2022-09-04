import { useCallback, useState } from 'react';

import idiots from '../json/idiots.json';
import { fields } from './IdiotConstants';
import { Idiot } from './IdiotTypes';
import { makeSorter } from './IdiotUtils';

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
              {fields.map(({ align, prop, renderer = () => null }) => (
                <td
                  key={prop}
                  style={{ whiteSpace: 'nowrap', textAlign: align }}
                >
                  {renderer(idiot) || idiot[prop] || '--'}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
