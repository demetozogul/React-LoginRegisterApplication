import React from "react";
import { Helmet } from "react-helmet";

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Dashboard content"></meta>
      </Helmet>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <img src="./loading2.gif" width={200} />
      </div>
    </>
  );
}
