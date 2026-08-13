import './ItemCard.css'

function ItemCard({ item, onClick }) {
  return (
    <li className="item-card">
      <button
        className="item-card__image-button"
        type="button"
        onClick={() => onClick(item)}
      >
        <img className="item-card__image" src={item.link} alt={item.name} />
        <span className="item-card__title">{item.name}</span>
      </button>
      <button
        className="item-card__like"
        type="button"
        aria-label={`Like ${item.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        ♡
      </button>
    </li>
  )
}

export default ItemCard
