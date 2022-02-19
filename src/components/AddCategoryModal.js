import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from '../firebase/config'
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

function AddCategoryModal(props) {

    const [name, setName] = useState("")
    const [editDoc, setEditDoc] = useState("")

    useEffect(() => {
        if (props.editCat != null) {
            setName(props.editCat.Category)
            setEditDoc(props.editCat)
        }

        return () => {

        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (props.editCat) {
            try {
                await updateDoc(doc(db, "project-category", props.editCat.id), {
                    Category: name
                });

                toast.success(`Edited ${name}`)

                props.cModal()
            } catch (err) {
                console.log(err)
            }
        } else {
            let id = uuidv4()
            const category = {
                id,
                Category: name
            }

            try {
                await setDoc(doc(db, "project-category", id), {
                    ...category
                });

                toast.success(`Added ${name}`)

                props.cModal()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="relative mt-4">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="pName" required name="pName" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Name" />
                    <label htmlFor="pName" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                </div>
                <div className="flex space-x-3 mt-4">
                    {props.editCat && <button
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Edit
                    </button>}
                    {!props.editCat && <button
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Add
                    </button>}

                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gred rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={props.cModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div >
    )
}

export default AddCategoryModal
