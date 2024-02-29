import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar cep");
      setInput("");
    }
  }

  return (
    <>
      <div className="Titulo">
        <h1>Buscador de CEP</h1>
      </div>
      <div className="Buscador">
        <input
          id="inputCep"
          type="text"
          placeholder="Digite seu cep ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="Search" onClick={handleSearch}>
          <FaSearch size={20} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <div className="Endereco">
          <h1>CEP: {cep.cep}</h1>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>
            Cidade: {cep.localidade} - {cep.uf}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
