import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link
      to="/"
      className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
    >
      <span className="px-2 rounded-lg py-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Mahmoud's
      </span>{" "}
      Blog
    </Link>
  );
};

export default Logo;
