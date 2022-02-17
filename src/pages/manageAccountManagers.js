import { Link } from 'react-router-dom';
import { UseCollection } from '../hooks/useCollection'
import { Tab, Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useState, Fragment } from 'react'
import AddAccountManagerModal from '../components/AddAccountManagerModal'
import { GetUserAccessLevel, Users } from '../hooks/useUserAccessLevel';
import { useHistory } from 'react-router-dom';


export default function ManageAccountManagers() {

    const history = useHistory()

    const { accessLevel } = GetUserAccessLevel();

    const { documents } = UseCollection("AccountManagers");

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>

            {accessLevel === Users.AccountManager && <div>You dont have access to this page</div> === history.push('/')}

            {accessLevel == Users.Admin &&
                <section class="antialiased bg-gray-100 text-gray-600 h-screen w-auto px-4">
                    <div class="flex flex-col justify-center h-full">
                        <div class="w-screen max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <header class="px-5 py-4 border-b border-gray-100">
                                <h2 class="font-semibold text-gray-800">Account Managers</h2>
                                <motion.div
                                    whileHover={{ scale: 1.01, originX: 0 }}
                                    onClick={openModal} className='mt-7 h-10 hover:cursor-pointer text-white bg-primaryGreen shadow-2xl flex justify-center rounded-3xl items-center space-x-2'>
                                    <div className='w-6 h-6'>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>
                                    </div>
                                    <span>
                                        Add a New Account Manager
                                    </span>
                                </motion.div>
                            </header>
                            <div class="p-3">
                                <div class="overflow-x-auto">
                                    <table class="table-auto w-full">
                                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Name</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Email</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Actions</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-sm divide-y divide-gray-100">

                                            {documents && documents.map(user => (
                                                <tr>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <img className="rounded-full ml-4 bg-primaryGreen w-10 h-10 mr-2 sm:mr-3" src={user.profilePicture} alt="User Avatar" />
                                                            <div class="font-medium text-gray-800">{user.displayName}</div>
                                                        </div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left">{user.email}</div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left font-medium flex space-x-2 divide-x-2">
                                                            <Link to={`accountmanagers/${user.email}`}><button className='text-green-500'>Edit</button></Link>
                                                            <button className='text-red-500 pl-1'>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto"
                            onClose={closeModal}
                        >
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed bg-black opacity-30 inset-0" />
                                </Transition.Child>

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add a New Account Manager
                                        </Dialog.Title>

                                        <AddAccountManagerModal cModal={closeModal} />

                                        <div className=" flex space-x-3 mt-4">

                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gred rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </section>}
        </div>
    )
}
