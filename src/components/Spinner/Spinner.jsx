import React from "react";
import "./Spinner.scss";
export const Spinner = () => {
  return (
    <div className="loader-wrapper ">
      <div class="ring">
        Loading
        <span className="span"></span>
      </div>
    </div>
  );
};
