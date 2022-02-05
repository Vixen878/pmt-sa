import { GetUserAccessLevel, Users } from '../../hooks/useUserAccessLevel';
import AdminDashboard from './admin'
import AccountManagerDashboard from './accountManager'

export default function Dashboard() {

    const { accessLevel } = GetUserAccessLevel();

    return (
        <div>
            {accessLevel == Users.Loading &&
                <span>Loading...</span>}

            {accessLevel == Users.AccountManager &&
                <AccountManagerDashboard />}

            {accessLevel == Users.Admin &&
                <AdminDashboard />}
        </div>
    )
}
