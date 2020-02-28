import React from "react";
import css from './index.module.css';
import Layout from "../components/layout";
import SEO from "../components/seo";
import useIsClient from '../useIsClient';
import useLocalStorage from "../useLocalStorage";

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
  const [token, setToken] = useLocalStorage('token', "");
  const isLoggedIn = token !== "";

  const onLogin = () => setToken(Math.random().toString(36).substring(2));
  const onLogout = () => setToken("");

  return (
    <div>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
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
