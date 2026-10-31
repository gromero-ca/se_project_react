import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onClick, onLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.includes(currentUser?._id);
  return (
    <li className="item-card">
      <button
        className="item-card__image-button"
        type="button"
        onClick={() => onClick(item)}
      >
        <img className="item-card__image" src={item.imageUrl} alt={item.name} />
        <span className="item-card__title">{item.name}</span>
      </button>
      {currentUser && (
        <button
          className="item-card__like"
          type="button"
          aria-label={`${isLiked ? "Unlike" : "Like"} ${item.name}`}
          aria-pressed={Boolean(isLiked)}
          onClick={() => onLike(item)}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
