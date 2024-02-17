import {
    MDBBtn,
} from "mdb-react-ui-kit";
import { Formik, Field, Form } from "formik"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/images/logo.jpeg";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { setUserDetails } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const token = "ancajbdjbasakjbfja";
        const role = "superadmin";
        setUserDetails(token, role);
        navigate("/");
    };

    const handleAdminRole = () => {
        const token = "ancajbdjbasakjbfja";
        const role = "admin";
        setUserDetails(token, role);
        navigate("/");
    };

    const handleAuthorRole = () => {
        const token = "ancajbdjbasakjbfja";
        const role = "author";
        setUserDetails(token, role);
        navigate("/");
    };

    return (
        <div className="container-fluid" style={{ minHeight: "100vh" }}>
            <div className="row align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundImage: "url('https://cdn.fs.teachablecdn.com/f1NuGaSRUyrXWlr9GxTK')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <div className="col-lg-3 col-12 py-5 px-0">
                    <div data-aos="zoom-out" className="py-5 bg-light" style={{ opacity: "0.9", borderRadius: "10px" }}>
                        <div className="row align-items-center">
                            <div className="col-lg-12 col-md-10 order-2 order-lg-1 d-flex flex-column py-3">
                                <img src={logo} alt="Logo" className="login-logo mx-auto mb-3" />
                                <h6 className="mb-5 fw-bold text-center lineAfter text-uppercase d-inline-block">Sign In to your Account</h6>
                                <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
                                    <Form className="d-flex flex-column gap-3 px-5">
                                        <div className="d-flex flex-column gap-1">
                                            <label htmlFor="emailAddress" className="fw-bold">Email Address: </label>
                                            <Field autoComplete="off" className="input border rounded px-2 py-2 text-muted fw-bold" name="email" id="emailAddress" placeholder="Email Address..." />
                                        </div>
                                        <div className="d-flex flex-column gap-1">
                                            <label htmlFor="password" className="fw-bold">Your Password: </label>
                                            <Field autoComplete="off" className="input border rounded px-2 py-2 text-muted fw-bold" name="password" id="password" placeholder="Password..." />
                                        </div>
                                        <div className="mt-2">
                                            <MDBBtn type="submit" className="w-100" color="success">Login as Super Admin</MDBBtn>
                                            <MDBBtn type="button" className="w-100 mt-2" color="danger" onClick={handleAdminRole}>Login as Admin</MDBBtn>
                                            <MDBBtn type="button" className="w-100 mt-2" color="info" onClick={handleAuthorRole}>Login as Author</MDBBtn>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>

                            {/* <div className='col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                            </div> */}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login