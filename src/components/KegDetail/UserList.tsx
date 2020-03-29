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
) => {
  const getBeerPrice = (volume: number): number => {
    if (!keg.isFinished) {
      if (volumePrice !== -1) return Math.round(volume * volumePrice);
      return -1;
    }
    return Math.round(volume * keg.finalBeerPrice);
  };

  return (
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
            alc={keg.alc}
            beers={userBeers}
            beerCount={userBeers.length}
            beerPrice={getBeerPrice(volume)}
            user={user}
            userId={user.id}
            isFinished={keg.isFinished}
            addBeer={addBeer}
          />
        );
      })}
    </>
  );
};

export default UserList;
