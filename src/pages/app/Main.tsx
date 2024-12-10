import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../components/misc/Api";

export const Main = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      alert("No ingresó datos");
      return;
    }

    try {
      navigate("/c");

      const fetchData = async () => {
        try {
          localStorage.removeItem("title");
          localStorage.removeItem("roadmap");
          localStorage.removeItem("syllabus");

          const fetchTitle = Api.getTitle(inputValue);
          const titleResponse = await fetchTitle;
          localStorage.setItem("title", titleResponse.data.title);

          const fetchContent = (async () => {
            const roadmapResponse = await Api.getRoadmap(inputValue);
            localStorage.setItem(
              "roadmap",
              JSON.stringify(roadmapResponse.data.roadmap)
            );

            const syllabusResponse = await Api.getSyllabus(
              inputValue,
              roadmapResponse.data.roadmap
            );
            localStorage.setItem(
              "syllabus",
              JSON.stringify(syllabusResponse.data.syllabus)
            );
          })();

          await Promise.all([fetchTitle, fetchContent]);

          const themeRequest = { name: inputValue };
          await Api.createTheme(themeRequest);
          console.log("Tema creado con éxito");
        } catch (error) {
          console.error(
            "Error al realizar las solicitudes en segundo plano:",
            error
          );
          localStorage.removeItem("user");
          alert("Hubo un error al crear el tema. Has sido deslogueado.");
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error al realizar la petición inicial:", error);
      alert("Hubo un error al procesar tu solicitud.");
    }
  };

  return (
    <form className="subcontainer subcontainer--app" onSubmit={handleSubmit}>
      <h1 className="title--lg">LearnAI</h1>
      <p>¿Qué quieres aprender hoy?</p>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ingresa el título de lo que quieres aprender"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m2 21l21-9L2 3v7l15 2l-15 2z" />
          </svg>
        </button>
      </div>
    </form>
  );
};
