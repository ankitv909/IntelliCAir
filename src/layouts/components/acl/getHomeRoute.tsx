import {UserDataType} from '@/context/types';

/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (user: UserDataType, route?: any) => {
    console.log(route);
    console.log('roless--', user?.role?.toLowerCase());
    if (user?.role?.toLowerCase() === 'hr') {
        return '/agency-dashboard';
    } else if (user?.role?.toLowerCase() === 'hospital') {
        return '/hospital';
    } else return '/dashboard';


}

export default getHomeRoute
