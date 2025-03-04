import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { resetCourseState } from "../../slices/courseSlice";

function SidebarLink({link, icon}) {
    const Icon = Icons[icon];
    const dispatch = useDispatch();

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={({isActive}) => `${isActive ? 'bg-yellow-800 text-yellow-50' : 'bg-opacity-0 text-richblack-300' } relative px-8 py-2 text-sm font-medium $transition-all duration-200`}
    >
      <span className={ `opacity-0  absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 `}></span>
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink