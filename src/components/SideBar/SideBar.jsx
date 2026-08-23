import avatar from "../../assets/generic-avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="side-bar">
      <img className="side-bar__avatar" src={avatar} alt="Gabriel Romero" />
      <div className="side-bar__content">
        <h1 className="side-bar__name">Gabriel Romero</h1>
        <div className="side-bar__links">
          <button className="side-bar__link" type="button">
            Change profile data
          </button>
          <button className="side-bar__link" type="button">
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
