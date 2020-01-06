import React, { Component, useContext, useEffect, useState } from 'react';
import KegList from './KegList';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';

const Kegs = (authUser: any) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [unsubscribe, setUnsubscribe] = useState();

  const ctx: IContext = useContext(ApiContext);
  const {kegs, putKeg } = ctx;

  useEffect(() => {
    console.log(JSON.stringify(kegs));
  },[kegs]);

  const onChangeText = (event: any) => {
    setText(event.target.value);
  };

  const onCreateKeg = (event: any, authUser: any) => {
    putKeg();
    setText('');
    event.preventDefault();
  };

  const onEditKeg = (message: any, text: any) => {
    const { uid, ...messageSnapshot } = message;

    putKeg();
  };

  const onRemoveKeg = (uid: string) => {
    // todo implement keg deletition
  };

  const onNextPage = () => {
    setLimit(limit + 5);
  };

  return (
    <div>
      {!loading && kegs && (
        <button type="button" onClick={onNextPage}>
          More
        </button>
      )}

      {loading && <div>Loading ...</div>}

      {kegs && ( kegs.map((keg:any)=>(
        <span>{keg.name}</span>
        ))
        // <KegList
        //   authUser={authUser}
        //   messages={kegs}
        //   onEditKeg
        //   onRemoveKeg
        // />
      )}

      {!kegs && <div>There are no messages ...</div>}

      <form
        onSubmit={(event) => onCreateKeg(event, authUser)}
      >
        <input
          type="text"
          value={text}
          onChange={onChangeText}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Kegs;
