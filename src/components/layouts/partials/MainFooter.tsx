import Image from "next/image";
import React, { Fragment } from "react";
const MainFooter = () => {
  return (
    <Fragment>
      <div className={"bg-blue-100 py-4 w-auto grid grid-cols-2"}>
        <div className="text-base ml-3 justify-self-start"></div>
        <div className="text-base mr-3 justify-self-end"></div>
      </div>
    </Fragment>
  );
};

export default MainFooter;
