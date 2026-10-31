import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="side-bar">
      <Avatar className="side-bar__avatar" user={currentUser} />
      <div className="side-bar__content">
        <h1 className="side-bar__name">{currentUser?.name}</h1>
        <div className="side-bar__links">
          <button
            className="side-bar__link"
            type="button"
            onClick={onEditProfile}
          >
            Change profile data
          </button>
          <button className="side-bar__link" type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
export default SideBar;
