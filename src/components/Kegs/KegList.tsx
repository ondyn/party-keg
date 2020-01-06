import React from 'react';

import KegItem from './KegItem';

const KegList = (authUser: any,
                 kegs: Array<any>,
                 onEditKeg: (message: any, editText: any) => void,
                 onRemoveKeg: (uid: string) => void,
) => (
  <ul>
    <li>{JSON.stringify(kegs)}</li>
    {kegs.length > 0 && kegs.map((keg: any) => (
      <li>ahoj</li>
    ))}
  </ul>
);

export default KegList;