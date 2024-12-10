import { Link, Navigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { DefaultField } from "../../components/modules/components/FormFields";
import { Navbar } from "../../components/modules/layout/navbar";
import { SubmitButton } from "../../components/modules/elements/buttons";
import { useAuth } from "../../context/auth/UseAuth";
import { Api } from "../../components/misc/Api";
import { handleLogError } from "../../components/misc/Helpers";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setIsError(true);
      setErrorMessage("Please, inform all fields!");
      return;
    }

    try {
      await Api.register({ username, email, password });
      setFormData({ username: "", email: "", password: "" });
      setIsError(false);
      navigate("/verify-your-account");
    } catch (error) {
      handleLogError(error as AxiosError);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main main--auth">
        <section className="container container--auth">
          <div className="subcontainer subcontainer--auth">
            <div className="d-flex f-col gap-1">
              <h1 className="title--lg">Regístrate</h1>
              <p className="interactive--xl">
                ¿Ya tienes una cuenta?{" "}
                <Link className="link" to="/login">
                  Inicia Sesión
                </Link>
              </p>
            </div>
            <form
              className="form form--auth"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="flexbox gap-2 f-wrap">
                <DefaultField
                  label="Usuario"
                  input={
                    <input
                      className="input input--form interactive--lg"
                      placeholder="Ingresa tu nombre de usuario"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      autoComplete="username"
                    />
                  }
                />
                <DefaultField
                  label="Correo"
                  input={
                    <input
                      className="input input--form interactive--lg"
                      placeholder="Ingresa tu correo electrónico"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                    />
                  }
                />
              </div>
              <div className="flexbox gap-2 f-wrap">
                <DefaultField
                  label="Contraseña"
                  input={
                    <input
                      className="input input--form interactive--lg"
                      placeholder="Ingresa tu contraseña"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                    />
                  }
                />
              </div>
              <SubmitButton type="default" text="Regístrate" />
            </form>

            <div>
              <hr />
            </div>
            <form
              className="form form--auth"
              action="/oauth2/authorization/google"
              method="get"
            >
              <SubmitButton type="google" text="Regístrate con Google" />
            </form>
          </div>
          {isError && <p>{errorMessage}</p>}
        </section>
      </main>
    </>
  );
};

export default Register;
