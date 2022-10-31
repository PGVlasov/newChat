import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { v4 } from "uuid";

export const MyModalForGuest = () => {
  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState("");

  const handleClose = () => setShow(false);
  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  let authorId = v4();
  const sendMessage = () => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("authorId", authorId);
    setShow(false);
    window.location.reload();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
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
