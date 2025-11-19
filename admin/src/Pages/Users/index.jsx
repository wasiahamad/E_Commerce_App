import { useContext } from 'react'
import { MyContext } from '../../App';
import UserList from '../../Components/UserList';

const Users = () => {
    
    const context = useContext(MyContext);
    return (
        <>
            <div className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"} transition-all duration-300`}>
                <UserList />
            </div>
        </>
    )
}

export default Users