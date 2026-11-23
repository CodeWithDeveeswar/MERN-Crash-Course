import { useState, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordAPIMutation } from "../store/slices/userApiSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  let { token } = useParams();
  const [resetPasswordAPI, { isLoading }] = useResetPasswordAPIMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("All fields are required");
      }
      return;
    }

    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Password & confirm password should match",
        );
      }
      return;
    }

    try {
      const response = await resetPasswordAPI({ password, token }).unwrap();
      setPassword("");
      setConfirmPassword("");
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(response.message);
      }
      navigate("/login", { replace: true });
    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Reset Password</h1>
      <Form>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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

export default ResetPassword;
