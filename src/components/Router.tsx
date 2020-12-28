import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import CreateBreak from "./CreateBreak";
import BreakCheck from "./BreakCheck";
import Footer from "./Footer";

const Router: FC = () => {
  return (
    <>
      <Switch>
        <Route path="/edit" component={CreateBreak} />
        <Route path="/:time?/:lengthInMinutes?" component={BreakCheck} />
      </Switch>
      <Footer />
    </>
  );
};

export default Router;
