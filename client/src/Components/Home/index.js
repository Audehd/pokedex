import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state);

  console.log("STATE", state);
  return (
    <>
      <div>POKEDEX HOME PAGE</div>
    </>
  );
};

export default Home;
