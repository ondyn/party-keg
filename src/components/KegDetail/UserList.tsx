import React from 'react';
import User from './User';
import 'firebase/auth';
import 'firebase/firestore';
import { IBeer, IKegUser } from './interface';
import { IKeg } from '../../context/interface';

const UserList = (
  {
    keg, users, addBeer, beers, volumePrice,
  }: {
    keg: IKeg,
    volumePrice: number,
    users: IKegUser[],
    beers: IBeer[],
    addBeer: (userId: string, volume: number) => void
  },
) => (
  <>
    {users.map((user) => {
      const userBeers = beers.filter((beer) => beer.userId === user.id).sort(((a, b) => {
        if (a.createTime && b.createTime) {
          if (a.createTime > b.createTime) return -1;
          if (a.createTime < b.createTime) return 1;
          return 0;
        }
        return 1;
      }));

      const volume = userBeers.reduce((part, beer) => part + beer.volume, 0);

      return (
        <User
          key={user.id}
          actualVolume={volume}
          alcInBlood={0.2}
          beerCount={userBeers.length}
          beerPrice={!keg.isFinished
            ? volumePrice !== -1 ? Math.round(volume * volumePrice) : -1
            : Math.round(volume * keg.finalBeerPrice)}
          lastTime={(userBeers.length > 0 && userBeers[0] && userBeers[0].createTime) ? userBeers[0].createTime!.toDate().toLocaleString() : ''}
          name={user.name}
          userId={user.id}
          isFinished={keg.isFinished}
          addBeer={addBeer}
        />
      );
    })}
  </>
);

export default UserList;
