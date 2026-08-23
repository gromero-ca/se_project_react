import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddClothes, onCardClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={onAddClothes}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
