import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  incremented,
  decremented,
  amountAdded,
} from "./features/counter/counter-slice";
import "./App.css";
import { useFetchBreedsQuery } from "./features/dogs/dogs-api-slice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  function handleIncrement() {
    dispatch(incremented());
  }

  function handleDecrement() {
    dispatch(decremented());
  }

  function handleAmountAdded(value: number) {
    dispatch(amountAdded(value));
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Clique nos logos do Vite e do React para saber mais
      </p>
      {isFetching ? <h1>Carregando...</h1> : <h1>Carregado!</h1>}
      <div className="card">
        <p>Contagem é {count}</p>
        <button onClick={() => handleAmountAdded(-10)}>Reduzir 10</button>
        <button onClick={handleDecrement}>Diminuir</button>
        <button onClick={handleIncrement}>Aumentar</button>
        <button onClick={() => handleAmountAdded(10)}>Adicionar 10</button>

        <div>
          <p>Quantidade de cachorros para buscar:</p>
          <select
            value={numDogs}
            onChange={(e) => setNumDogs(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <p>Quantidade de cachorros encontrados: {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} alt={breed.name} height={250} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
