import React, { Component, useContext, useEffect, useState } from 'react';
import KegList from './KegList';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';
import Context, { ICtx } from '../../context/Ctx';

const Kegs = (authUser: any) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState();
  const [limit, setLimit] = useState(5);
  const [unsubscribe, setUnsubscribe] = useState();

  const ctx: ICtx = useContext(Context);
  const { actions: {serverTimeStamp, db} } = ctx;

  useEffect(() => {
    console.log('from useEffect');
    // onListenForMessages();
  }, [messages]);

  useEffect(() => {
    console.log('from useEffect2');
    onListenForMessages();
  }, [limit]);

  const onListenForMessages = (): () => void => {
    setLoading(true);
    db.collection("kegs")
      .onSnapshot(function(querySnapshot) {
        let msgs: Array<any> = [];
        //const msgs[] = [];
        console.log('data loaded');
        querySnapshot.docs.forEach(function(doc) {
          msgs.push(doc.data().name);
        });
        console.log("Kegs: ", msgs.join(", "));
        setMessages(msgs);
        setLoading(false);
      });

    //
    // setUnsubscribe(db.collection('messages')
    //   .orderBy('createdAt', 'desc')
    //   .limit(limit)
    //   .onSnapshot((snapshot: any) => {
    //     if (snapshot.size) {
    //       let messages: any[] = [];
    //       snapshot.forEach((doc: any) => messages.push({ ...doc.data(), uid: doc.id }));
    //
    //       setMessages(messages.reverse());
    //       setLoading(false);
    //
    //     } else {
    //       setMessages([]);
    //       setLoading(false);
    //     }
    //   }));
    return function cleanup() {
      // unsubscribe();
    }

  };

  const onChangeText = (event: any) => {
    setText(event.target.value);
  };

  const onCreateMessage = (event: any, authUser: any) => {
    db.collection('messages').add({
      text: text,
      userId: authUser.uid,
      createdAt: serverTimeStamp(),
    });

    setText('');

    event.preventDefault();
  };

  const onEditMessage = (message: any, text: any) => {
    const { uid, ...messageSnapshot } = message;

    db.collection(`messages/${message.uid}`).doc().set({
      ...messageSnapshot,
      text,
      // editedAt: fs().fieldValue.serverTimestamp(),
    });
  };

  const onRemoveMessage = (uid: string) => {
    db.collection(`messages/${uid}`).doc().delete();
  };

  const onNextPage = () => {
    setLimit(limit + 5);
  };

  return (
    <div>
      {!loading && messages && (
        <button type="button" onClick={onNextPage}>
          More
        </button>
      )}

      {loading && <div>Loading ...</div>}

      {messages && (
        <KegList
          authUser={authUser}
          messages={messages}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      )}

      {!messages && <div>There are no messages ...</div>}

      <form
        onSubmit={(event) => onCreateMessage(event, authUser)}
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
