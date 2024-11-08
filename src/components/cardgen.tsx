import { useState } from "react";

export default function CardRandom() {
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cvvNumber, setCvvNumber] = useState<string>(''); 
    const [pinNumber, setPinNumber] = useState<string>(''); 

    async function generateAndRegisterCard() {
        // Generate Card Number
        let number = '4';
        for (let i = 1; i < 16; i++) {
            number += Math.floor(Math.random() * 10);
        }
        setCardNumber(number);

        // Generate CVV
        let cvv = '';
        for (let j = 0; j < 3; j++) { 
            cvv += Math.floor(Math.random() * 10);
        }
        setCvvNumber(cvv);

        // Generate PIN
        let pin = '';
        for (let h = 0; h < 4; h++) {
            pin += Math.floor(Math.random() * 10);
        }
        setPinNumber(pin);

        // Log the generated values to check they are correct
        console.log('Generated Card Info:', { cardNumber: number, cvvNumber: cvv, pinNumber: pin });

        // Send card details to backend as part of user registration
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: "merg@gmail.com",  // Replace with dynamic user input as needed
                    password: "12345",        // Replace with dynamic user input
                    age: '0005-02-04',
                    address: "Rua Inexistente, 2000",
                    phone: '3121286800',
                    firstName: "João",
                    lastName: "Souza Silva",
                    city: "Belo Horizonte",
                    country: "Brazil",
                    cardNumber: number,      // Make sure this is passed correctly
                    cvvNumber: cvv,         // Make sure this is passed correctly
                    pinNumber: pin,         // Make sure this is passed correctly
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save card information');
            }
            console.log('Card information saved successfully');
        } catch (error) {
            console.error('Error saving card information:', error);
        }
    }

    return (
        <>
            <h1 className="text-3xl">Card cu numere random</h1><br/>
            <button className="mb-4 bg-red-600 p-2" onClick={generateAndRegisterCard}>Generează și Înregistrează</button><br/>
            <h2>Numărul cardului este: {cardNumber}</h2>
            <h2>CVV : {cvvNumber}</h2>
            <h2>Pinul cardului este : {pinNumber}</h2>
        </>
    );
}
