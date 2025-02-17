import React, { useState } from 'react'
import {sideBarLinks} from '../../data/dashboard-links'
import { useSelector, useDispatch } from 'react-redux'
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../ConfirmationModal'
import { logout } from '../../services/operations/authAPI'
import { VscSignOut } from 'react-icons/vsc'

function Sidebar() {
    const {loading: authLoading} = useSelector(state => state.auth)
    const {loading: profileLoading, user} = useSelector(state => state.profile)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()

    if(authLoading || profileLoading ){
        return (
            <div className='spinner m-auto'></div>
        )
    }
console.log(user)
  return (
    <div className='flex flex-col min-w-[222px] border-r-2 border-r-richblack-700 py-10 bg-richblack-800'>
        {
           sideBarLinks.map((item) => (
                item.type && item.type !== user.accountType ? null 
                : (
                    
                    <SidebarLink key={item.id} link={item} icon={item.icon} />
                )

           ))
        }
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"> </div>
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            icon="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: async () => await logout(navigate, dispatch),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar