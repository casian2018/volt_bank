import { useState } from "react";
import Image from "next/image";
import logo from "../../images/logo.png"; // Your logo import

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
  cardInfo: CardInfo;
}

const Card: React.FC = () => {
  const [cardData, setCardData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleGenerateCard = async () => {
    // Set loading state to true while fetching
    setLoading(true);

    const cardInfo = {
      number: "1234 5678 9876 5432", // Example card number
      cvv: "123",
      validFrom: "11/15",
      expiry: "03/25",
    };
    
    const userInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "justpetrez@gmail.com",
      cardInfo: [cardInfo],
    };

    try {
      const response = await fetch('/api/saveCardInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to save card info");
      }

      const data = await response.json();
      console.log("Card data saved:", data);
      setCardData(data); // Set card data in state after saving
    } catch (error) {
      console.error("Error saving card data:", error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  // If loading or no card data, show loading text or message
  if (loading || !cardData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="w-10 mt-4 flex justify-center items-center m-auto">
        <Image src={logo} alt="Logo" />
      </div>
      <div className="bg-white mt-6 flex justify-center items-center">
        <div className="space-y-16">
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            <img
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
              alt="Card Background"
            />
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Name</p>
                  <p className="font-s tracking-widest">{`${cardData.firstName} ${cardData.lastName}`}</p>
                </div>
                <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="Bank Logo" />
              </div>
              <div className="pt-1">
                <p className="font-semibold">Card Number</p>
                <p className="font-s tracking-more-wider ">
                  {cardData.cardInfo.number.replace(/\d{4}(?=.)/g, "$& ")}
                </p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs">Valid</p>
                    <p className="font-s tracking-wider text-sm">{cardData.cardInfo.validFrom || "11/15"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs ">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">{cardData.cardInfo.expiry || "03/25"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">···</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button to generate card */}
          <div className="text-center mt-4">
            <button
              onClick={handleGenerateCard}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
