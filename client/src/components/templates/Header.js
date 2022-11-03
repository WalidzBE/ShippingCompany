import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../actions/account";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = (props) => {
  const navigate = useNavigate();

  console.log(props.isAuth);

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut())
      .then((response) => {
        console.log(response);
        navigate("/home", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="relative">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-white py-4 ">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              to={"/home"}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Company Name
            </Link>
          </div>

          {props.isAuth ? (
            //authenticated header components
            <div className="flex">
              <Menu as="div" className="relative z-20">
                <div>
                  <Menu.Button className="inline-flex items-center justify-center rounded-lg  bg-white p-1 text-indigo-400 border border-gray-100  hover:bg-gray-100 focus:outline-none focus:ring-2  focus:ring-indigo-500">
                    <div className="items-center justify-center px-2 my-1 text-indigo-400">
                      {props.fullName}
                    </div>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/addshipment"
                            className={`${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Add new shipment
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/shipments"
                            className={`${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            View my shipments
                          </Link>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logOutUser}
                            className={`${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            //not authenticated header components
            <>
              <div className="sm:hidden">
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signup"
                              className={`${
                                active
                                  ? "bg-indigo-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Sign Up
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={`${
                                active
                                  ? "bg-indigo-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Log In
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="hidden items-center justify-end sm:flex sm:flex-1 lg:w-0">
                <Link
                  to="/signup"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: Object.keys(state.account).length > 0,
  fullName: state.account.firstName + " " + state.account.lastName,
});

export default connect(mapStateToProps)(Header);
