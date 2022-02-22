import {UseCollection} from "../../hooks/useCollection"

export default function AdminDashboard() {

    // const {documents} = UseCollection()

    return (
        <div className="flex w-full space-x-5 h-full justify-center mt-24">
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Total number of projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Projects waiting approval
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Total number of clients
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Completed projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Currently on going projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col border rounded-lg p-4 items-center">
                <span className="text-lg font-bold text-gray-700">
                    Cancelled projects
                </span>
                <span>
                    0
                </span>
            </div>
        </div>
    )
}
