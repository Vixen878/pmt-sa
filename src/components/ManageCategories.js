import React from 'react';
import { UseCollection } from "../hooks/useCollection"
import { GetUserAccessLevel, Users } from '../hooks/useUserAccessLevel'
import { useHistory } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useState, Fragment } from 'react'
import AddCategoryModal from './AddCategoryModal'
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase/config' 

const Managecategories = () => {

    const { accessLevel } = GetUserAccessLevel();
    const history = useHistory()

    const { documents } = UseCollection("project-category")

    let [isAddModalOpen, setIsAddModalOpen] = useState(false)
    let [isEditModalOpen, setIsEditModalOpen] = useState(false)

    let [editingCategory, setEditingCategory] = useState(false)

    function closeAddModal() {
        setIsAddModalOpen(false)
    }

    function openAddModal() {
        setIsAddModalOpen(true)
    }

    function closeEditModal() {
        setIsEditModalOpen(false)
    }

    function editCategory(doc) {
        setEditingCategory(doc)
        setIsEditModalOpen(true)
    }

    async function deleteCategory(name, id) {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            await deleteDoc(doc(db, "project-category", id))

            toast.info(`${name} deleted`)
        }
    }

    return (
        <div>
            {accessLevel === Users.AccountManager && <div>You dont have access to this page</div> === history.push('/')}

            {accessLevel === Users.Admin &&
                <div>
                    <section class="antialiased bg-gray-100 text-gray-600 h-screen w-full px-4">
                        <div class="flex flex-col pt-8 h-full">
                            <div class="w-screen max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                <header class="px-5 py-4 border-b border-gray-100 justify-center">
                                    <h2 class="font-semibold text-gray-800">Project Categories</h2>
                                    <motion.div
                                        whileHover={{ scale: 1.01, originX: 0 }}
                                        onClick={openAddModal} className='mt-7 h-10 hover:cursor-pointer text-white bg-primaryGreen shadow-2xl flex justify-center rounded-3xl items-center space-x-2'>
                                        <div className='w-6 h-6'>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>
                                        </div>
                                        <span>
                                            Add a New Category
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
                                                        <div class="font-semibold text-left">Actions</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="text-sm divide-y divide-gray-100">
                                                {documents && documents.map(doc => (
                                                    <tr>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left">{doc.Category}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium flex space-x-2 divide-x-2">
                                                                <button className='text-green-500' onClick={() => editCategory(doc)}>Edit</button>
                                                                <button className='text-red-500 pl-1' onClick={() => deleteCategory(doc.Category, doc.id)}>Delete</button>
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

                        <Transition appear show={isAddModalOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={closeAddModal}
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
                                                Add a Project Category
                                            </Dialog.Title>

                                            <AddCategoryModal cModal={closeAddModal} />
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>

                        <Transition appear show={isEditModalOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={closeEditModal}
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
                                                Edit a Project Category
                                            </Dialog.Title>

                                            <AddCategoryModal cModal={closeEditModal} editCat={editingCategory} />
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </section>
                </div>
            }
        </div>
    );
}

export default Managecategories;
