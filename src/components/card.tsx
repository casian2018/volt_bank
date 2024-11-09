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

  if (!cardData) return <p>Loading...</p>;

  return (
    <div >
      <div className=" mt-6 flex justify-center items-center shadow-lg">
        <div className="space-y-16">
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl ">
            <img
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/Zi6v09P.png"
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
                <p className="font-s tracking-more-wider ">{cardData.cardInfo[0].number.replace(/\d{4}(?=.)/g, "$& ")}</p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs">Valid</p>
                    <p className="font-s tracking-wider text-sm">{cardData.cardInfo[0].validFrom || "11/15"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs ">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">{cardData.cardInfo[0].expiry || "03/25"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">···</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
