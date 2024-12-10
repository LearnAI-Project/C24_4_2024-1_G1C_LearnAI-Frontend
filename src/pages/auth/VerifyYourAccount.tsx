import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "../../components/modules/layout/navbar";
import { SubmitButton } from "../../components/modules/elements/buttons";
import { DefaultField } from "../../components/modules/components/FormFields";
import { Api } from "../../components/misc/Api";
import { useAuth } from "../../context/auth/UseAuth";
import { useNavigate } from "react-router-dom";

export const VerifyYourAccount = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [verificationCode, setVerificationCode] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Api.verifyAccount(verificationCode);
      navigate("/login");
    } catch (error) {
      console.error("Verification failed:", error);
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
              <h1 className="title--lg">Verifica tu cuenta</h1>
              <p
                style={{ color: "var(--neutral-700)" }}
                className="interactive--xl"
              >
                Ingresa el código que enviamos a tu correo electrónico.
              </p>
            </div>
            <form
              className="form form--auth"
              method="post"
              onSubmit={handleSubmit}
            >
              <DefaultField
                label="Código de verificación"
                input={
                  <input
                    className="input input--form interactive--lg"
                    placeholder="Ingresa el código de verificación"
                    type="number"
                    name="verification_code"
                    value={verificationCode}
                    onChange={(e) =>
                      setVerificationCode(Number(e.target.value))
                    }
                    required
                  />
                }
              />
              <SubmitButton type="default" text="Ingresar" />
            </form>
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
