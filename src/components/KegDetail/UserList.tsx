import React from 'react';
import User from './User';
import 'firebase/auth';
import 'firebase/firestore';
import { IBeer, IKegUser } from './interface';

const UserList = ({ users, addBeer, beers, volumePrice }: { volumePrice: number, users: IKegUser[], beers: IBeer[], addBeer: (userId: string, volume: number) => void }) => {

  return (
    <>
      {users.map(user => {

        const userBeers = beers.filter(beer => beer.userId === user.id).sort(((a, b) => {
          if (a.createTime && b.createTime) {
            return a.createTime > b.createTime ? -1 : a.createTime < b.createTime ? 1 : 0
          } else
            return 1
        }));

        const volume = userBeers.reduce((part, beer) => part + beer.volume, 0);

        return <User
          key={user.id}
          actualVolume={volume}
          alcInBlood={0.2}
          beerCount={userBeers.length}
          beerPrice={Math.round(volume * volumePrice)}
          lastTime={ (userBeers.length>0 && userBeers[0] && userBeers[0].createTime)? userBeers[0].createTime!.toDate().toLocaleString(): ''}
          name={user.name}
          userId={user.id}
          addBeer={addBeer} />
      })
      }
    </>
  )
};

export default UserList;