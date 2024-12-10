import { useState } from "react";
import { Navbar } from "../../components/modules/layout/navbar";
import { SubmitButton } from "../../components/modules/elements/buttons";
import { DefaultField } from "../../components/modules/components/FormFields";
import { Api } from "../../components/misc/Api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const ForgotYourPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRecover = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await Api.forgotPassword(email);
      setMessage(response.data);
      setError("");
      navigate("/recover-your-account");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        if (err instanceof Error && err.response) {
          setError(
            err.response.data || "Ocurrió un error. Inténtalo nuevamente."
          );
        } else {
          setError("Ocurrió un error. Inténtalo nuevamente.");
        }
      }
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main main--auth">
        <section className="container container--auth">
          <div className="subcontainer subcontainer--auth">
            <div className="d-flex f-col gap-1">
              <h1 className="title--lg">Recupera tu cuenta</h1>
              <p
                style={{ color: "var(--neutral-700)" }}
                className="interactive--xl"
              >
                Ingresa tu correo electrónico para recibir un enlace de
                recuperación.
              </p>
            </div>
            <form className="form form--auth" onSubmit={handleRecover}>
              <DefaultField
                label="Correo Electrónico"
                input={
                  <input
                    className="input input--form interactive--lg"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                }
              />
              <SubmitButton type="default" text="Enviar Enlace" />
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="subcontainer subcontainer__img--auth">
            <img
              height="400"
              src="https://st2.depositphotos.com/2419757/43548/v/450/depositphotos_435482738-stock-illustration-business-person-sitting-at-table.jpg"
              alt="Login image"
            />
          </div>
        </section>
      </main>
    </>
  );
};
