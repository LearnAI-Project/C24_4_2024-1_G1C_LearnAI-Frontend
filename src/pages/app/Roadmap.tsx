import React, { useEffect, useState, useCallback } from "react";
import Marp from "@marp-team/marp-core";

const marp = new Marp();

function useLocalStorageState<T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue) as T);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [key]);

  return [state, setState];
}

export const Roadmap: React.FC = () => {
  const [theme, setTheme] = useState<string>("uncover");
  const [header, setHeader] = useState<string>("TECSUP");
  const [footer, setFooter] = useState<string>("Por TheShepsMT");
  const [title, setTitle] = useLocalStorageState<string>(
    "title",
    "Cargando título de la presentación..."
  );
  const [roadmap] = useLocalStorageState<string[]>("roadmap", []);
  const [syllabus] = useLocalStorageState<string[][]>("syllabus", []);

  const generateMarkdown = useCallback((): string => {
    return `
<!-- title: marp -->
<!-- theme: ${theme} -->
<!-- class: invert -->
<!-- paginate: true -->
<!-- header: ${header} -->
<!-- footer: ${footer} -->
<style>
    header {
        color: hsl(232, 10%, 60%);
        text-align: right;
        font-weight: 700;
    }
    footer {
        color: hsl(232, 10%, 50%);
        text-align: left;
        font-weight: 500;
    }
</style>

# ${title}

---

${roadmap
  .map(
    (topic, index) => `
## ${index + 1}. ${topic}

---

${
  syllabus[index]
    ?.map(
      (subtopic, subindex) => `
### ${index + 1}.${subindex + 1}. ${subtopic}

---`
    )
    .join("") || ""
}
`
  )
  .join("")}
`;
  }, [theme, header, footer, title, roadmap, syllabus]);

  const handleDownload = async () => {
    const markdown = generateMarkdown();
    try {
      const response = await fetch("http://localhost:4000/convert?format=pdf", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: markdown,
      });

      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }

      const data = await response.json();
      const url = data.url;

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.href = url;
      link.download = "presentation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const sliderElement = document.getElementById("slider");
    if (sliderElement) {
      const markdown = generateMarkdown();
      const { html, css } = marp.render(markdown);
      console.log({ markdown });
      let sliderStyle = document.getElementById("slider-style");
      if (!sliderStyle) {
        sliderStyle = document.createElement("style");
        sliderStyle.id = "slider-style";
        document.head.appendChild(sliderStyle);
      }
      sliderStyle.innerHTML = css;
      sliderElement.innerHTML = html;
    }
  }, [theme, header, footer, generateMarkdown]);

  return (
    <div className="container container--slider">
      <form className="subcontainer subcontainer1--slider">
        <fieldset>
          <legend className="title--sm">Edita tu presentación</legend>
          <div>
            <label htmlFor="theme" className="interactive--xl">
              Tema:
            </label>
            <input
              type="text"
              id="theme"
              className="input--form interactive--lg"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="interactive--xl">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="input--form interactive--lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="header" className="interactive--xl">
              Encabezado:
            </label>
            <input
              type="text"
              id="header"
              className="input--form interactive--lg"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="footer" className="interactive--xl">
              Pie de página:
            </label>
            <input
              type="text"
              id="footer"
              className="input--form interactive--lg"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
            />
          </div>
          <button className="button button--submit button--submit--default interactive--lg" onClick={handleDownload}>
            Download PDF
          </button>
        </fieldset>
      </form>
      <div className="subcontainer subcontainer2--slider">
        <div id="slider"></div>
      </div>
    </div>
  );
};
