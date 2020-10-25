import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { Button, InputText } from '../../../../components';
import './CreateRoom.scss';

const QUERY_ROOM = gql`
  query GetRoom($roomName: String!) {
    rooms(roomName: $roomName) {
      roomName
    }
  }
`;

const MUTATION_CREATE_ROOM = gql`
  mutation CreateRoom($roomName: String!) {
    createRoom(roomName: $roomName) {
      successful
    }
  }
`;

const CreateRoom = (props) => {
  const { header, onChangeStateParent, step } = props;
  const [roomName, setRoomName] = useState('');
  let [getRoom, rooms] = useLazyQuery(QUERY_ROOM);
  const [createRoom] = useMutation(MUTATION_CREATE_ROOM);

  useEffect(() => {
    let { loading, data } = rooms;
    if (!loading && data) {
      const condition = data.rooms.length > 0;
      if (step === 'createRoom' && condition) {
        alert('ห้องนี้ถูกสร้างไปแล้ว');
        setRoomName('');
      } else if (step === 'createRoom' && !condition) {
        createRoom({ variables: { roomName } });
        onSubmitRoomName();
      } else if (step === 'joinRoom' && !condition) {
        alert('ไม่พบห้องที่คุณต้องการ');
        setRoomName('');
      } else if (step === 'joinRoom' && condition) {
        onSubmitRoomName();
      }
    }
  }, [rooms]);

  const onSubmitRoomName = () => {
    onChangeStateParent({ name: 'roomName', value: roomName });
    onChangeStateParent({ name: 'step', value: 'chatRoom' });
  };

  const onClickCancel = () => {
    onChangeStateParent({ name: 'step', value: 'room' });
  };

  const beforeGetRoom = () => {
    if (roomName !== '' && roomName !== 'rooms') {
      getRoom({ variables: { roomName } });
    }
  };

  return (
    <section className="create-room container">
      <div className="create-room-header">{header}</div>
      <div className="create-room-content">
        <InputText
          name="roomName"
          value={roomName}
          onChange={({ target }) => setRoomName(target.value)}
        />
      </div>
      <div className="create-room-footer">
        <Button onClick={onClickCancel} type="text">
          กลับ
        </Button>
        <Button onClick={() => beforeGetRoom()}>ยืนยัน</Button>
      </div>
    </section>
  );
};

CreateRoom.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
};

export default CreateRoom;
