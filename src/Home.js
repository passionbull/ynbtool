import React, { Fragment } from "react";
import withRoot from "./modules/withRoot";

// components
import ProductHero from "./modules/views/ProductHero";
import AppFooter from "./modules/views/AppFooter";

// <NavbarView />
const Home = () => (
  <Fragment>
    <ProductHero />
    <AppFooter />
  </Fragment>
);

export default withRoot(Home);
