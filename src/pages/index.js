import React from "react";
import css from './index.module.css';
import Layout from "../components/layout";
import SEO from "../components/seo";
import useIsClient from '../useIsClient';
import useLocalStorage from "../useLocalStorage";

const ComponentWithEarlyExit = ({isLoggedIn, onLogin, onLogout}) => {
  const { isClient, key } = useIsClient();

  if ( !isClient ) return null;
  return (
    <div key={key}>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
    </div>
  );
}

const ComponentWithKey = ({isLoggedIn, onLogin, onLogout}) => {
  const { key } = useIsClient();
  return (
    <div key={key}>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
    </div>
  );
}

const ComponentWithoutKey = ({isLoggedIn, onLogin, onLogout}) => {
  return (
    <div>
      {isLoggedIn 
        ? <button className={css['red']} onClick={onLogout}>Logout</button>
        : <button className={css['blue']} onClick={onLogin}>Login</button>}
    </div>
  );
}

const IndexPage = () => {
  const [token, setToken] = useLocalStorage('token', "");

  // Manipulate token
  const isLoggedIn = token !== "";
  const onLogin = () => setToken(Math.random().toString(36).substring(2));
  const onLogout = () => setToken("");

  return (
    <Layout>
      <SEO title="Home" />
      <pre>
        The first button has a hydration issue. Notice that if you are logged in, 
        <br />
        the logout color should be blue, which doesn't happen when you first load the page.
      </pre>
      <ComponentWithoutKey isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />
      <br />
      <pre>
        The second button fixes the above issue. However, notice that there is a 
        <br />
        flicker in the color, which is the time it takes for the JS to be parsed.
      </pre>
      <ComponentWithKey isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />
      <br />
      <pre>
        The third button only appears when the JS is already parsed. This avoids 
        <br />
        the flicker at the expense of delaying the completeness of the UI.
      </pre>
      <ComponentWithEarlyExit isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />
    </Layout>
  );
}

export default IndexPage
