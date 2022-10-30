import { Form, Button } from "react-bootstrap";

export const MessageForm = ({ sendMessage, value, onChangeHandler }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      <Form onChange={(e) => e.preventDefault()}>
        <Form.Group
          className="d-flex"
          style={{ width: "100%", margin: "1rem" }}
        >
          <Form.Control
            value={value}
            onChange={onChangeHandler}
            type="text"
            placeholder="Message..."
            onKeyPress={handleKeyPress}
          />
          <Button style={{ margin: "1rem" }} onClick={sendMessage}>
            {`>`}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};
