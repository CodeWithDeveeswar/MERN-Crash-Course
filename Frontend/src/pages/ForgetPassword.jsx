import { useState, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useForgetPasswordAPIMutation } from "../store/slices/userApiSlice";

const ForgetPassword = () => {
  const [forgetPasswordAPI, { isLoading }] = useForgetPasswordAPIMutation();

  const [email, setEmail] = useState("");
  const toastId = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Email is required");
      }
      return;
    }

    try {
      const response = await forgetPasswordAPI({ email }).unwrap();
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(response.message);
      }
      setEmail("");
    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Forget Password</h1>
      <Form>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={submitHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgetPassword;
