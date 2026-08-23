import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onAddClothes, onCardClick }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClothes={onAddClothes}
        onCardClick={onCardClick}
      />
    </main>
  );
}

export default Profile;
