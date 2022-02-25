import Avatar from "./Avatar";
import { UseAuthContext } from "../hooks/useAuthContext";
import AnimatedBlurBlobs from "./AnimatedBlurBlobs";
import { motion } from "framer-motion";
import { GetUserAccessLevel, Users } from '../hooks/useUserAccessLevel';
import AdminNavBar from "./AdminNavBar";
import AccountManagerNavBar from "./AccountManagerNavBar";
import { useLogout } from "../hooks/useLogout";
import { UseDocument } from "../hooks/useDocument"

export default function NavBar() {

    const { logout, isPending } = useLogout()

    const { user } = UseAuthContext()

    const { accessLevel } = GetUserAccessLevel();

    const { document } = UseDocument(accessLevel == Users.AccountManager ? 'AccountManagers' : 'admins', user.uid)

    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 40 }}
            className="antialiased relative overflow-hidden">
            <div className="absolute top-[700px] -left-32 blur-lg">
                < AnimatedBlurBlobs />
            </div>
            <div className="flex flex-col h-screen bg-gred bg-opacity-[0.04] backdrop-blur-xl justify-between">

                {/* Admin Nav */}
                {accessLevel == Users.Admin &&
                    <AdminNavBar />
                }

                {/* Account Manager Nav */}
                {accessLevel == Users.AccountManager &&
                    <AccountManagerNavBar />
                }
                {/* <div>
                    {!isPending &&
                        <button className="flex flex-row items-center space-x-2" onClick={logout} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon w-6 h-6" viewBox="0 0 512 512"><title>Power</title><path d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                            <span>Logout</span>
                        </button>}
                    {isPending &&
                        <button className="flex flex-row items-center space-x-2" onClick={logout} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon w-6 h-6" viewBox="0 0 512 512"><title>Power</title><path d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                            <span>Logging Out</span>
                        </button>}
                </div> */}
                <div>
                    <Avatar src={document?.profilePicture} userName={document?.displayName} emailAddress={user.email} />
                </div>
            </div>
        </motion.div>

    )
}
