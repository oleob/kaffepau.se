import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import GlobalStyle from "./components/GlobalStyle";

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
