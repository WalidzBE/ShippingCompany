import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function ShipmentListHeader(props) {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-between items-center py-4">
      <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
        My shipments
      </h2>
      <div className="flex space-x-2">
      <button
          disabled={!props.hasShipments}
          onClick={openModal}
          className=" flex justify-between items-center space-x-2 px-2.5 md:px-5 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md enabled:red:bg-indigo-700 enabled:hover:shadow-lg enabled:focus:bg-red-700 enabled:focus:shadow-lg enabled:focus:outline-none enabled:focus:ring-0 enabled:active:bg-red-800 enabled:active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50"
        >
          <TrashIcon className="w-5 h-5" />
          <div className="hidden sm:flex">Remove All shipments</div>
        </button>
        <Link
          to={"/addShipment"}
          className=" flex justify-between items-center space-x-2 px-2.5 md:px-5 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          <PlusIcon className="w-5 h-5" />
          <div className="hidden sm:flex">Add new shipment</div>
        </Link>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Delete All Shipments
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete all your shipments.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          props.deleteAllShipments();
                          closeModal();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default ShipmentListHeader;
