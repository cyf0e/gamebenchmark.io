import React from "react";
import { Link } from "react-router-dom";

export const CategoryButtons = () => {
  return (
    <div>
      <Link to="/games">
        <button>Games</button>
      </Link>

      <Link to="/components">
        <button>Components</button>
      </Link>
    </div>
  );
};
