import "./App.css"
import Login from "./frontend/pages/Auth/Login"
import SignUp from "./frontend/pages/Auth/SignUp";
import VerifyCode from "./frontend/pages/Auth/VerifyCode";

function App() {
  // Ensure all children are always centered
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";

  return (
    <>
      <div>
        <VerifyCode/>
      </div>
    </>
  );
}

export default App;
