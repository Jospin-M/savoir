import "./App.css"
import Login from "./frontend/pages/Auth/Login"

function App() {
  // Ensure all children are always centered
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";

  return (
    <>
      <div>
        <Login></Login>
      </div>
    </>
  );
}

export default App;
