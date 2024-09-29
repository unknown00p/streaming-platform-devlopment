import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import CurrentUser from '../api/authentication/CurrentUser'

function OutletComp() {
    return (
        <>
        <CurrentUser/>
        <div className='fixed z-20 w-full'>
        <Header />
        </div>
        <div className='overflow-x-hidden'>
            <Outlet />
        </div>
        </>
    )
}

export default OutletComp
