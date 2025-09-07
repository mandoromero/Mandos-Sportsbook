import { database } from "../firebase.js";
import { ref, set } from "firebase/database";

export async function writeUserData(userId, firstName, lastName, email, month, day, year) {
    try {
        const userRef = ref(database, `users/${userId}`);
        await  set(userRef, {
            userFirstName: firstName,
            userLastName: lastName, 
            email: email,
            month: month, 
            day: day,
            year: year
        });
        console.log(`User datra for ${userId} saved successfully!`);
    } catch {
        console.error(`Error saving user data for ${userId}: `, error);
        throw error;
    }
}