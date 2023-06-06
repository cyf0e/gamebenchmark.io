import { Outlet, useLoaderData } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "./components/Loader";
import "./index.css";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/games");
  }, []);
  return (
    <>
      <div className="App">
        <Loader>
          <NavBar />
          <Outlet />
        </Loader>
      </div>
    </>
  );
}

export default App;
