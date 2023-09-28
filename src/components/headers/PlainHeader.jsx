import React from "react";
import Header from "@carbon/react/lib/components/UIShell/Header";
import HeaderName from "@carbon/react/lib/components/UIShell/HeaderName";

const PlainHeader = () => {
  return (
    <Header aria-label="Uvation USP">
      <HeaderName href="/" prefix="">
        <div className="text-center">
          <img
            src="/favicon.ico"
            height={25}
            alt=""
            style={{ filter: "invert(1)" }}
          />
        </div>
        &nbsp; Uvation USP
      </HeaderName>
    </Header>
  );
};

export default PlainHeader;
