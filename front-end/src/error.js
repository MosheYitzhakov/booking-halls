const { Link } = require("react-router-dom");

export const Err = () => {
    return (<>
      <h2>404</h2>
      <p>page not found</p>
      <Link to={"/"}> home </Link>
    </>);
  }