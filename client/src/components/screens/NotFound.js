import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h2 className={"mt-2 text-3xl font-bold tracking-tight text-gray-900"}>
        Page not found
      </h2>
      <Link
        className={"text-center text-2xl tracking-tight text-indigo-900"}
        to="/"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
