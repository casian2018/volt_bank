// lib/transferLogic.js

import { User } from "./mongodb";  // Import the User model (adjust path as needed)

export async function transferFunds(senderEmail, recipientEmail, amount) {
  try {
    // Find the sender and recipient in the database
    const sender = await User.findOne({ email: senderEmail });
    const recipient = await User.findOne({ email: recipientEmail });

    // Check if both sender and recipient exist
    if (!sender) {
      return { success: false, message: "Sender not found" };
    }
    if (!recipient) {
      return { success: false, message: "Recipient not found" };
    }

    // Check if sender has enough balance
    if (sender.balance < amount) {
      return { success: false, message: "Insufficient funds" };
    }

    // Deduct the amount from the sender's balance and add it to the recipient's balance
    sender.balance -= amount;
    recipient.balance += amount;

    // Save the updated user data back to the database
    await sender.save();
    await recipient.save();

    // Log the transaction (You can also add more details to the transaction, like time)
    const transaction = {
      senderEmail,
      recipientEmail,
      amount,
      date: new Date(),
    };

    sender.transactions.push(transaction);
    recipient.transactions.push(transaction);

    // Save the transactions to both users
    await sender.save();
    await recipient.save();

    return { success: true, message: "Transfer successful" };
  } catch (error) {
    console.error("Error in transferFunds:", error);
    return { success: false, message: "Internal server error during transfer" };
  }
}
