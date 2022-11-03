import React from "react";
import { BeatLoader } from "react-spinners";

function Loader(props) {
  return (
    <div className="flex h-52 items-center justify-center">
      <BeatLoader color="rgb(99 102 241)" />
    </div>
  );
}

export default Loader;
