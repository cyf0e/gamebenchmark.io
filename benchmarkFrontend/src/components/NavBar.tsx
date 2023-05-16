import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/games");
  }, []);
  return (
    <div className="navbar-container">
      <h1 style={{ margin: 0, display: "inline-block" }}>GameBenchmark.io</h1>
      <div>
        <button
          style={{ margin: "1rem" }}
          onClick={() => {
            navigate("/games");
          }}
        >
          Benchmarks
        </button>
        <button
          style={{ margin: "1rem" }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};
