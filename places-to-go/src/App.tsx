import { useState } from "react";
import Accessible from "./components/Accessible";
import "./App.css";

function App() {
  const DATA = [
    { id: "place-0", name: "Mont Blanc", completed: true },
    { id: "place-1", name: "Bhutan", completed: false },
    { id: "place-2", name: "Bennidorm", completed: false },
  ];

  return (
    <>
      <div>
        <Accessible places={DATA} />
      </div>

      {/* <NotAccessible /> */}
    </>
  );
}

export default App;
