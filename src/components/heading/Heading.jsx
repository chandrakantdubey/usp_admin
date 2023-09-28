import { Column } from "@carbon/react";
import React from "react";

const Heading = ({ heading, children }) => {
  return (
    <>
      <Column span={16}>
        <div className="d-flex justify-content-between">
          <h2>{heading}</h2>
          {children}
        </div>
      </Column>
      <br />
      <hr />
      <br />
    </>
  );
};

export default Heading;
