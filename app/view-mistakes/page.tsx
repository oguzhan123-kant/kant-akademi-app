import ShowMistakes from '../../components/ShowMistakes';

const ViewMistakes = () => {
  const userId = "defaultUserId"; // Şimdilik default bir userId kullanıyoruz

  return (
    <div>
      <h1>View Mistakes</h1>
      <ShowMistakes userId={userId} />
    </div>
  );
};

export default ViewMistakes;
