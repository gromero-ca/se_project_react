import { useState } from "react";
import "./Avatar.css";

function Avatar({ user, className = "" }) {
  const [failedUrl, setFailedUrl] = useState("");
  if (!user?.avatar || failedUrl === user.avatar) {
    return (
      <span className={`avatar ${className}`} aria-label={user?.name || "User"}>
        {user?.name?.charAt(0).toUpperCase() || "?"}
      </span>
    );
  }
  return (
    <img
      className={className}
      src={user.avatar}
      alt={user.name}
      onError={() => setFailedUrl(user.avatar)}
    />
  );
}
export default Avatar;
