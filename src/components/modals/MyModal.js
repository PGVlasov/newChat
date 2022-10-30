import React, { useState } from "react";
import { v4 } from "uuid";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";

export const MyModal = () => {
  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState("");
  const history = useNavigate();

  const handleClose = () => setShow(false);
  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    sessionStorage.setItem("userName", userName);
    history(`/room/${v4()}`);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onKeyPress={handleKeyPress}
      >
        <Modal.Header closeButton>
          <Modal.Title> Введите имя пользователя</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group
            className="d-flex"
            style={{ width: "30rem", margin: "1rem" }}
          >
            <Form.Control
              value={userName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Message..."
            />
            <Button style={{ margin: "1rem" }} onClick={sendMessage}>
              {`>`}
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};
