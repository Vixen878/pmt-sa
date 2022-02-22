import {UseCollection} from "../../hooks/useCollection"

export default function AdminDashboard() {

    // const {documents} = UseCollection()

    return (
        <div className="flex w-full space-x-5 h-full justify-center">
            <div className="flex flex-col">
                <span>
                    Total number of projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col">
                <span>
                    Projects waiting approval
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col">
                <span>
                    Total number of clients
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col">
                <span>
                    Completed projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col">
                <span>
                    Currently on going projects
                </span>
                <span>
                    0
                </span>
            </div>
            <div className="flex flex-col">
                <span>
                    Cancelled projects
                </span>
                <span>
                    0
                </span>
            </div>
        </div>
    )
}
