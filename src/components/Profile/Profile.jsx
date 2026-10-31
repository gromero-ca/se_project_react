import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddClothes,
  onCardClick,
  onCardLike,
  onLogout,
  onEditProfile,
}) {
  return (
    <main className="profile">
      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClothes={onAddClothes}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
