import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import useIsClient from '../useIsClient';
import css from './index.module.css';

const ComponentWithEarlyExit = () => {
  const { isClient, key } = useIsClient();
  if ( !isClient ) return null;
  return (
    <div key={key} className={isClient ? css['red'] : css['blue']}>
      I am in the {isClient ? "client" : "server"}
    </div>
  );
}

const ComponentWithKey = () => {
  const { isClient, key } = useIsClient();
  return (
    <div key={key} className={isClient ? css['red'] : css['blue']}>
      I am in the {isClient ? "client" : "server"}
    </div>
  );
}

const ComponentWithoutKey = () => {
  const { isClient } = useIsClient();
  return (
    <div className={isClient ? css['red'] : css['blue']}>
      I am in the {isClient ? "client" : "server"}
    </div>
  );
}

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <ComponentWithoutKey />
      <ComponentWithKey />
      <ComponentWithEarlyExit />
    </Layout>
  );
}

export default IndexPage
