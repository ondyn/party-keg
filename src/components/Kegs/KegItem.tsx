import React, { Component, useState } from 'react';

interface IProps {
  userUid: string,
  onEditKeg: (message: any, editText: any) => void,
  keg: any,
  onRemoveKeg: (uid: string) => void

}

const KegItem = (props: IProps) => {

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(props.keg.text);

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(props.keg.text);
  };

  const onChangeEditText = (event: any) => {
    setEditText(event.target.value);
  };

  const onSaveEditText = () => {
    props.onEditKeg(props.keg, editText);
    setEditMode(false);
  };

  return (
    <li>
      {editMode ? (
        <input
          type="text"
          value={editText}
          onChange={onChangeEditText}
        />
      ) : (
        <span>
            <strong>{props.keg.userId}</strong>
          {' '}
          {props.keg.text}
          {props.keg.editedAt && <span>(Edited)</span>}
          </span>
      )}

      {props.userUid === props.keg.userId && (
        <span>
            {editMode ? (
              <span>
                <button onClick={onSaveEditText}>Save</button>
                <button onClick={onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={onToggleEditMode}>Edit</button>
            )}

          {!editMode && (
            <button
              type="button"
              onClick={() => props.onRemoveKeg(props.keg.uid)}
            >
              Delete
            </button>
          )}
          </span>
      )}
    </li>
  );
};

export default KegItem;
