import { useState } from "react";
import Accessible from "./components/Accessible";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const DATA = [
    { id: "place-0", name: "Mont Blanc", completed: true },
    { id: "place-1", name: "Bhutan", completed: false },
    { id: "place-2", name: "Bennidorm", completed: false },
  ];

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Accessible places={DATA} />
      {/* <NotAccessible /> */}
    </>
  );
}

export default App;
