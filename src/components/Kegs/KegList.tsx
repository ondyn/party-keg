import React from 'react';

import KegItem from './KegItem';

const KegList = (authUser: any,
                 kegs: Array<any>,
                 onEditKeg: (message: any, editText: any) => void,
                 onRemoveKeg: (uid: string) => void,
) => (
  <ul>
    {kegs.length > 0 && kegs.map((keg: any) => (
      <KegItem
          userUid= { authUser.uid }
          key={keg.uid}
          keg={keg}
          onEditKeg={onEditKeg}
          onRemoveKeg={onRemoveKeg}
      />
    ))}
  </ul>
);

export default KegList;