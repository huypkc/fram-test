import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IUserForm } from "../models/user";
import { createUser } from "../services/users";

export function UserModal({ show, onClose, onSubmitted }: any) {
  const [user, setUser] = useState<IUserForm>({name: '', email: '', position: ''});
  const [creating, setCreating] = useState(false);
  const handleSubmit = (user: IUserForm) => {
    setCreating(true);
    createUser(user)
      .then(() => {
        setCreating(false);
        onClose();
        onSubmitted();
      })
      .catch(() => setCreating(false))
  }
  useEffect(() => {
    if (show) {
      setUser({name: '', email: '', position: ''});
    }
  }, [show]);
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={user.name} onChange={(event) => setUser({...user, name: event.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={(event) => setUser({...user, email: event.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formGroupPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Enter position" value={user.position} onChange={(event) => setUser({...user, position: event.target.value})}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={creating} onClick={() => handleSubmit(user)}>
            {creating? 'Creating': 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}