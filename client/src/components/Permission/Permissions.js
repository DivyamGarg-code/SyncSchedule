import React, { useState } from 'react'
import RoleBased from './RoleBased';
import UserBased from './UserBased';
import PermissionCreationPopUp from './PermissionCreationPopUp';
import PopUpWrapper from '../common/PopUpWrapper';
import ViewPermissionsPopUp from './ViewPermissionsPopUp';

function Permissions() {
  const [showAddPermissionPopUp, setAddPermissionPopUp] = useState(false);
  const [showViewPermissionPopUp, setViewPermissionPopUp] = useState(false);
  const [activeTab, setActiveTab] = useState("roleBased");
  const toggleTab = (currentTab) => {
    if (activeTab !== currentTab) {
      setActiveTab(currentTab);
    }
  }
  console.log("Active Tab ", activeTab);
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row items-center justify-between flex-wrap gap-4'>
        {showAddPermissionPopUp && <PopUpWrapper isConfirmationPopUp={true} component={<PermissionCreationPopUp openPopUp={setAddPermissionPopUp} />} openPopUp={setAddPermissionPopUp} />}
        {showViewPermissionPopUp && <PopUpWrapper isConfirmationPopUp={false} component={<ViewPermissionsPopUp openPopUp={setViewPermissionPopUp} />} openPopUp={setViewPermissionPopUp} />}
        <div className='flex flex-row items-center gap-3 bg-purple-300 p-2 rounded-md font-semibold w-fit'>
          <div className={activeTab === "roleBased" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer' : 'cursor-pointer'} onClick={() => { toggleTab("roleBased") }}>Role Based</div>
          <div className={activeTab !== "roleBased" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer' : 'cursor-pointer'} onClick={() => { toggleTab("userBased") }}>User Based</div>
        </div>
        <div className='flex flex-row gap-4 items-center flex-wrap'>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit font-semibold hover:bg-purple-700' onClick={() => setAddPermissionPopUp(true)}>Create New Permission</div>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit font-semibold hover:bg-purple-700' onClick={() => setViewPermissionPopUp(true)}>View All Permission</div>
        </div>
      </div>
      {activeTab === "roleBased" ? <RoleBased /> : <UserBased />}
    </div>
  )
}

export default Permissions