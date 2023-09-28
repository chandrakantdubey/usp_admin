import { Form, Stack, TextInput, Checkbox } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import CenteredButton from "src/components/buttons/CenteredButton";
import { loginWithCread } from "src/redux/login/LoginSlice";
import { idLogin } from "src/redux/chargeBeeBilling/chargeBeeBillingSlice";
import PlainHeader from "src/components/headers/PlainHeader";

const Login = () => {
  const dispatch = useDispatch();
  const { data, isError, message } = useSelector(
    (state) => state.login.loginData
  );
  return (
    <section className="login d-grid grid-centered full-view-height">
      <PlainHeader />
      <div className="popup">
        <Formik
          initialValues={{ userName: "", password: "", rememberMe: true }}
          onSubmit={(values) => {
            dispatch(
              idLogin({
                username: "v.yadav@uvation.com",
                password: "vishnu@123;",
              })
            );
            dispatch(loginWithCread(values));
          }}
        >
          {({ values, handleChange, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="text-center">
                <img src="/favicon.ico" height={50} alt="" />
              </div>
              <Stack gap={5}>
                <h3 className="text-center"> Login</h3>
                <TextInput
                  labelText="Enter Your User Name"
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  labelText="Enter Your Password"
                  type="password"
                  placeholder="Password "
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <Checkbox
                  labelText="Remember Me"
                  id="checkbox-label-1"
                  checked={values.rememberMe}
                  name="rememberMe"
                  onChange={(e) =>
                    setFieldValue("rememberMe", e.target.checked)
                  }
                />
                {isError && <p className="danger">{message}</p>}
                <CenteredButton type="submit" text="Submit" />
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
