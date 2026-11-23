import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutAPIMutation } from "../store/slices/userApiSlice";
import { useRef } from "react";
import { toast } from "react-toastify";

const NavigationBar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutAPI] = useLogoutAPIMutation();

  const logoutHandler = async () => {
    try {
      await logoutAPI().unwrap();
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Logo
          </Link>

          <Nav>
            {isLoggedIn ? (
              <>
                <NavDropdown title={userData.name} id="username">
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} onClick={logoutHandler}>
                    Logout
                  </Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active bg-primary" : "nav-link"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active bg-primary" : "nav-link"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
