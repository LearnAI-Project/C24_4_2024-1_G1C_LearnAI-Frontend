import { Link, Navigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  DefaultField,
  DoubleLabelField,
} from "../../components/modules/components/FormFields";
import { Navbar } from "../../components/modules/layout/navbar";
import { SubmitButton } from "../../components/modules/elements/buttons";
import { useAuth } from "../../context/auth/UseAuth";
import { Api } from "../../components/misc/Api";
import { handleLogError } from "../../components/misc/Helpers";
import { AxiosError } from "axios";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Login: React.FC = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { username, password } = formData;
  
    if (!username || !password) {
      setIsError(true);
      return;
    }
  
    try {
      const response = await Api.authenticate({ username, password });
      const { id, name, email, token } = response.data;
      const authenticatedUser: AuthUser = { id, name, email, token };
  
      Auth.userLogin(authenticatedUser);
  
      setFormData({ username: "", password: "" });
  
      setIsError(false);
    } catch (error) {
      handleLogError(error as AxiosError);
      setIsError(true);
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
              <h1 className="title--lg">Iniciar Sesión</h1>
              <p className="interactive--xl">
                ¿No tienes una cuenta aún?{" "}
                <Link className="link" to="/register">
                  Regístrate
                </Link>
              </p>
            </div>
            <form
              className="form form--auth"
              onSubmit={handleSubmit}
              method="post"
            >
              <DefaultField
                label="Usuario"
                input={
                  <input
                    className="input input--form interactive--lg"
                    placeholder="Ingresa tu nombre de usuario"
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    autoComplete="username"
                  />
                }
              />
              <DoubleLabelField
                primary_label="Contraseña"
                secondary_label={
                  <Link className="link" to="/forgot-your-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                }
                input={
                  <input
                    className="input input--form interactive--lg"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                }
              />

              <SubmitButton type="default" text="Ingresar" />
            </form>

            <div>
              <hr />
            </div>
            <form
              className="form form--auth"
              action="/oauth2/authorization/google"
              method="get"
            >
              <SubmitButton type="google" text="Ingresar con Google" />
            </form>
          </div>
          <div className="subcontainer__img--auth">
            <img
              height="400"
              src="https://st2.depositphotos.com/2419757/43548/v/450/depositphotos_435482738-stock-illustration-business-person-sitting-at-table.jpg"
              alt="Login image"
            />
          </div>
        </section>
        <section>
          {isError && <p>The username or password provided are incorrect!</p>}
        </section>
      </main>
    </>
  );
};

export default Login;
