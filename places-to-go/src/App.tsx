import Accessible from "./components/accessible/Accessible";
import "./App.css";
import NotAccessible from "./components/nonaccessible/NotAccessible";

function App() {
  const INITIAL_DATA = [
    { id: "place-0", name: "Mont Blanc", completed: true },
    { id: "place-1", name: "Bhutan", completed: false },
    { id: "place-2", name: "Bennidorm", completed: false },
  ];

  return (
    <>
      <div>
        {/* <Accessible places={INITIAL_DATA} /> */}
        <NotAccessible places={INITIAL_DATA} />
      </div>
    </>
  );
}

export default App;
