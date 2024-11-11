import React from "react";

const Loading = (props) => {
  return (
    <>
      <div className={props.loading ? " loader-big fired" : "loader-big"}></div>
    </>
  );
};

export default Loading;
