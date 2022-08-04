import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postPeliculas, getGenerosMovies } from "../../Redux/Actions/Actions";
import validate from "../../util/validate.js";
import poster from "../../img/poster.jpg";
import back from "../../img/backdrop.jpg";
import "../../Styles/components/_FormPeliculas.scss";

const FormPeliculas = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenerosMovies());
  }, []);

  const generos = useSelector((state) => state.generosMovies);
  const [error, setError] = useState({ " ": " " });
  const [data, setdata] = useState({
    name: "",
    genre_ids: [],
    overview: "",
    cast: [],
    runtime: "",
    release_date: "",
    posterImagen: "",
    backDropImagen: "",
    vote_average: "",
    popularity: "",
    tipo: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (data.backDropImagen === "Alt") {
      data.backDropImagen = back;
    }
    if (data.posterImagen === "Alt") {
      data.posterImagen = poster;
    }

    dispatch(postPeliculas(data));
    alert("Pelicula creada");
    setdata({
      name: "",
      genre_ids: [],
      overview: "",
      cast: [],
      runtime: "",
      release_date: "",
      posterImagen: "",
      backDropImagen: "",
      vote_average: "",
      popularity: "",
      tipo: "",
    });
    setError({ " ": " " });

    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].localName === "input") {
        if (e.target[i].id !== "elencobutton") {
          e.target[i].value = "";
        }
      } else if (e.target[i].localName === "textarea") {
        e.target[i].value = "";
      } else if (e.target[i].localName === "select") {
        e.target[i].selectedIndex = 0;
      }
    }
  };

  const HandleChangeGeneros = (e) => {
    if (e.target.value !== " ") {
      let arrset = [...new Set([e.target.value, ...data.genre_ids])];

      setdata({
        ...data,
        genre_ids: arrset,
      });
      setError(
        validate({
          ...data,
          genre_ids: arrset,
        })
      );
    }
  };

  const HandleChangeTipos = (e) => {
    setdata({
      ...data,
      tipo: e.target.value,
    });
    setError(
      validate({
        ...data,
        tipo: e.target.value,
      })
    );
  };

  const HandleElenco = (e) => {
    if (e.value !== "") {
      setdata({ ...data, cast: [...data.cast, e.value] });
      setError(validate({ ...data, cast: [...data.cast, e.value] }));
      e.value = "";
    }
  };
  const HandleInput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  const eliminarGenero = (g) => {
    var arrAux = data.genre_ids.filter((fil) => fil !== g);
    setdata({
      ...data,
      genre_ids: arrAux,
    });
  };

  return (
    <>
      <div className="ContainerForm2">
        <div className="FormPeliculas">
          <form className="form2" onSubmit={HandleSubmit}>
            <div className="pageTitle title"> Agregar nuevo: </div>
            <div className="nombreconteiner">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nombre:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>
            <textarea
              id="Overview"
              type="text"
              name="overview"
              rows="5"
              maxLength="140"
              className="message formEntry2"
              placeholder="Descripción:"
              onChange={(e) => HandleInput(e)}
            />

            <div className="nombreconteiner">
              <input
                id="release_date"
                type="text"
                name="release_date"
                placeholder="Released:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="vote_average"
                type="text"
                name="vote_average"
                placeholder="Rating:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="popularity"
                type="text"
                name="popularity"
                placeholder="Popularidad:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="runtime"
                type="text"
                name="runtime"
                placeholder="Duración:"
                className="name formEntry2"
                onChange={(e) => HandleInput(e)}
              />
            </div>
            <div className="nombreconteiner">
              <input
                id="elenco"
                type="text"
                name="elenco"
                placeholder="Elenco:"
                className="name formEntry2"
              />
              <button
                class="submit formEntry2"
                id="elencobutton"
                value="Agregar"
                type="button"
                onClick={() => HandleElenco(document.getElementById("elenco"))}
              >
                Agregar{" "}
              </button>
            </div>

            <div className="nombreconteiner">
              <input
                id="backDropImagen"
                type="text"
                name="backDropImagen"
                onChange={(e) => HandleInput(e)}
                placeholder="Imagen back-drop:"
                className="name formEntry2"
              />
            </div>

            <div className="nombreconteiner">
              <input
                id="posterImagen"
                type="text"
                name="posterImagen"
                onChange={(e) => HandleInput(e)}
                placeholder="Imagen poster:"
                className="name formEntry2"
              />
            </div>

            <div className="generos-select">
              <select
                name="generos"
                onChange={(e) => HandleChangeGeneros(e)}
                className="generosconteiner"
              >
                <option value=" ">Generos..</option>
                {generos?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {data.genre_ids?.map((g) => (
              <div style={{ color: "white" }} onClick={() => eliminarGenero(g)}>
                {g}
              </div>
            ))}

            <div className="tipo-select">
              <select
                name="tipo"
                onChange={(e) => HandleChangeTipos(e)}
                className="generosconteiner"
              >
                <option value=" ">Tipos..</option>
                <option value="serie">serie</option>
                <option value="pelicula">pelicula</option>
              </select>
            </div>
            <button
              class="submit formEntry2"
              type="submit"
              value="Enviar"
              disabled={Object.keys(error).length}
            >
              Enviar
            </button>
          </form>

          <div className="erroresconteiner">
            <h2 style={{ color: "white" }}>{error.name}</h2>
            <h2 style={{ color: "white" }}>{error.genre_ids}</h2>
            <h2 style={{ color: "white" }}>{error.overview}</h2>
            <h2 style={{ color: "white" }}>{error.release_date}</h2>
            <h2 style={{ color: "white" }}>{error.vote_average}</h2>
            <h2 style={{ color: "white" }}>{error.cast}</h2>
            <h2 style={{ color: "white" }}>{error.posterImagen}</h2>
            <h2 style={{ color: "white" }}>{error.backDropImagen}</h2>
            <h2 style={{ color: "white" }}>{error.popularity}</h2>
            <h2 style={{ color: "white" }}>{error.tipo}</h2>
          </div>

          <div className="conteinerbackDropImagen">
            <div className="backDropImagen" style={{ color: "white" }}>
              Image back-drop
            </div>

            {data.backDropImagen.length === 0 ? (
              <>
                <img
                  className="imgconteinerbackDropImagen"
                  src={back}
                  alt="img"
                />
              </>
            ) : data.backDropImagen === "Alt" ? (
              <>
                <img
                  className="imgconteinerbackDropImagen"
                  src={back}
                  alt="Debe ingresar una URL"
                />
              </>
            ) : (
              <>
                <img
                  className="imgconteinerbackDropImagen"
                  src={data.backDropImagen}
                  alt="Debe ingresar una URL"
                />
              </>
            )}
          </div>

          <div className="conteinerposterImagen">
            <div className="posterImagen" style={{ color: "white" }}>
              Image poster
            </div>

            {data.posterImagen.length === 0 ? (
              <>
                <img
                  className="imgconteinerposterImagen"
                  src={poster}
                  alt="img"
                />
              </>
            ) : data.posterImagen === "Alt" ? (
              <>
                <img
                  className="imgconteinerposterImagen"
                  src={poster}
                  alt="Debe ingresar una URL"
                />
              </>
            ) : (
              <>
                <img
                  className="imgconteinerposterImagen"
                  src={data.posterImagen}
                  alt="Debe ingresar una URL"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPeliculas;
