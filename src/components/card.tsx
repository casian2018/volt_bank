import { useEffect, useState } from "react";

// Define types for card info and user data
interface CardInfo {
  number: string;
  cvv: string;
  validFrom?: string;
  expiry?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  cardInfo: CardInfo[];
}

interface CardProps {
  email: string; // Accept email as a prop
}

const Card: React.FC<CardProps> = ({ email }) => {
  const [cardData, setCardData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        console.log("Fetching data with email:", email); // Debugging log to verify email
        const response = await fetch(`/api/getCardInfo?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setCardData(data);
        } else {
          console.error("Error fetching card data:", data.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (email) {
      fetchCardData();
    }
  }, [email]);

  const handleDeleteCard = async (cardNumber: string) => {
    try {
      const response = await fetch('/api/deleteCard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: email,  // Send the email as the userId
          cardId: cardNumber,  // Send the card number as the identifier
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted card from the state
        setCardData((prevData) => ({
          ...prevData!,
          cardInfo: prevData!.cardInfo.filter(card => card.number !== cardNumber),
        }));
        console.log('Card deleted successfully');
      } else {
        console.error('Error deleting card:', data.error);
      }
    } catch (error) {
      console.error('Error occurred while deleting card:', error);
    }
  };

  if (!cardData) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {cardData.cardInfo.map((card, index) => (
            <div
              key={index}
              className="w-auto h-56 md:min-h-74 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl"
            >
              <img
                className="relative object-cover w-full h-full rounded-xl"
                src="https://files.123freevectors.com/wp-content/original/152951-abstract-black-background-vector-illustration.jpg"
                alt="Card Background"
                
              />
              <button
                  className="absolute top-0 right-0 text-white text-xl bg-red-600 rounded-full  "
                  onClick={() => handleDeleteCard(card.number)}
                >
                  &times;
                </button>
              <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Name</p>
                    <p className="font-s tracking-widest">
                      {`${cardData.firstName} ${cardData.lastName}`}
                    </p>
                  </div>
                  <img
                    className="w-14 h-14"
                    src="https://i.imgur.com/bbPHJVe.png"
                    alt="Bank Logo"
                  />
                </div>
                <div className="pt-1">
                  <p className="font-semibold">Card Number</p>
                  <p className="font-s tracking-more-wider">
                    {card.number.replace(/\d{4}(?=.)/g, "$& ")}
                  </p>
                </div>
                <div className="pt-6 pr-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-xs">Valid</p>
                      <p className="font-s tracking-wider text-sm">
                        {card.validFrom || "11/15"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-xs">Expiry</p>
                      <p className="font-medium tracking-wider text-sm">
                        {card.expiry || "03/25"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-xs">CVV</p>
                      <p className="font-bold tracking-more-wider text-sm">···</p>
                    </div>
                  </div>
                </div>
                {/* Small "X" button in the corner */}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
