import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  BackgroundBoxComponent,
  TitleComponent,
  ButtonAnimateComponent,
  TextComponentOne,
  TextComponentTwo,
  ButtonComponent,
  LinkComponent,
  Box1Component1,
  Box1Component2,
  InputComponent,
  FormSigninComponent,
  FormSignupComponent,
  ForgotPasswordCard,
} from "./";
import "./forgotPasswordCard.css";

function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleClick = () => setClick(!click);

  const onSubmit = handleSubmit(async (data) => {
    if (forgotPassword) {
      // TODO : make a better way to handle this
      console.log("Restablecer contraseña:", data);
    } else {
      const user = await signIn(data);
      if (user) navigate("/home");
    }
  });

  return (
    <>
      {forgotPassword && <div className="blur-background"></div>}

      <BackgroundBoxComponent clicked={click}>
        <ButtonAnimateComponent clicked={click} onClick={handleClick} />
        <FormSigninComponent onSubmit={onSubmit} className="signin">
          {loginErrors &&
            loginErrors.map((err: string, i: number) => (
              <p
                key={i}
                className="text-red-500 text-center mb-2 font-semibold"
              >
                {err}
              </p>
            ))}
          <TitleComponent>Sign In</TitleComponent>
          {errors.id && <p className="text-red-500">ID is required</p>}
          <InputComponent
            type="id"
            id="idId"
            placeholder="User ID"
            {...register("id", { required: true })}
          />
          {errors.clave && <p className="text-red-500">Password is required</p>}
          <InputComponent
            type="password"
            id="passwordId1"
            placeholder="Password"
            {...register("clave", { required: true })}
          />

          <LinkComponent href="#" onClick={() => setForgotPassword(true)}>
            Forgot Your Password?
          </LinkComponent>

          <ButtonComponent>Sign In</ButtonComponent>
        </FormSigninComponent>
        <FormSignupComponent className="signup">
          <TitleComponent>Pre Register</TitleComponent>
          <InputComponent
            type="text"
            name="username"
            id="usernameId"
            placeholder="Username"
          />

          <InputComponent
            type="email"
            name="email"
            id="emailId"
            placeholder="Email"
          />
          <InputComponent
            type="password"
            name="password"
            id="passwordId2"
            placeholder="Password"
          />
          <LinkComponent href="#" onClick={handleClick}>
            Already have an Account?
          </LinkComponent>
          <ButtonComponent>Pre Register</ButtonComponent>
        </FormSignupComponent>
        <TextComponentOne className="text1" clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click Me</span>
          <span className="attention-icon">⤶</span>
        </TextComponentOne>
        <TextComponentTwo className="text2" clicked={click}>
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className="attention">Click Me</span>
          <span className="attention-icon">⤷</span>
        </TextComponentTwo>
        {forgotPassword && (
          <ForgotPasswordCard onCancel={() => setForgotPassword(false)} />
        )}
        <Box1Component1 clicked={click} />
        <Box1Component2 clicked={click} />
      </BackgroundBoxComponent>
    </>
  );
}

export default FormComponent;
