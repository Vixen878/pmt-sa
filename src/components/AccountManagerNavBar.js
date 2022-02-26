import { motion } from "framer-motion"
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function AccountManagerNavBar() {
    const { logout, isPending, error } = useLogout()
    
    return (
        <nav className="flex flex-col mt-24 mx-auto space-y-10">
            <div className="pb-10">
                <img src="/Header_Logo.png" alt="" />
            </div>
            <motion.div
                whileHover={{ scale: 1.1, originX: 0 }}
                className="w-full text-primaryGreen text-lg">
                <NavLink className="flex flex-row space-x-2 items-center" exact to="/">
                    <div className="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                    </div>
                    <span>Dashboard</span>
                </NavLink>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1, originX: 0 }}
                className="w-full text-primaryGreen text-lg">
                <NavLink className="flex flex-row space-x-2 items-center" exact to="/manageprojects">
                    <div className="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Briefcase</title><rect x="32" y="128" width="448" height="320" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" /><path d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32M480 240H32M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                    </div>
                    <span>Manage projects</span>
                </NavLink>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1, originX: 0 }}
                className="w-full text-primaryGreen text-lg">
                <NavLink className="flex flex-row space-x-2 items-center" exact to="/clients">
                    <div className="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>People</title><path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" /><path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" /></svg>
                    </div>
                    <span>Clients</span>
                </NavLink>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1, originX: 0 }}
                className="w-full text-primaryGreen text-lg">
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
            </motion.div>
        </nav>
    )
}
