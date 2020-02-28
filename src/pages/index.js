import React from "react";
import css from './index.module.css';
import Layout from "../components/layout";
import SEO from "../components/seo";
import useIsClient from '../useIsClient';
import useLocalStorage from "../useLocalStorage";

const ComponentWithEarlyExit = () => {
  const [token, setToken] = useLocalStorage('token', "");
  const isLoggedIn = token !== "";
  const { isClient, key } = useIsClient();

  const onLogin = () => setToken(Math.random().toString(36).substring(2));
  const onLogout = () => setToken("");

  if ( !isClient ) return null;

  return (
    <div key={key}>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
    </div>
  );
}

const ComponentWithKey = () => {
  const [token, setToken] = useLocalStorage('token', "");
  const isLoggedIn = token !== "";
  const { key } = useIsClient();

  const onLogin = () => setToken(Math.random().toString(36).substring(2));
  const onLogout = () => setToken("");

  return (
    <div key={key}>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
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
