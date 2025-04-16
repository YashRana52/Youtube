const indianNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Kavya', 'Arjun', 'Ananya', 'Rahul', 'Siya',
    'Aman', 'Neha', 'Krishna', 'Riddhima', 'Arya', 'Jay', 'Tanishka', 'Shivam',
    'Muskan', 'Saurabh', 'Diya', 'Priya', 'Ankit', 'Nikita', 'Vedant', 'Pooja',
    'Manu', 'Swati', 'Rajat', 'Kirti', 'Arpit', 'Naina'
];

export const generateRandomName = () => {
    return indianNames[Math.floor(Math.random() * indianNames.length)];
};
const hindiMessages = [
    'How are you?', 'Awesome!', 'Superb!', 'That was fun!', 'Wow, amazing!',
    'Jai Hind 🇮🇳', 'Let’s get started', 'That’s insane', 'Life is sorted!',
    'OP bro OP 🔥', 'Absolutely right!', 'You got it right!', 'Who’s live here?',
    'Tell me too!', 'Where are you from?', 'Cool video', 'Love you bro',
    'Was waiting eagerly', 'Speak slowly please', 'Read my comment bro',
    'You’re really good', 'Today’s on fire!', 'Who else is watching now?',
    'Best channel ever', 'Liked it already', 'Shared it!'
];

export const generateRandomMessage = () => {
    return hindiMessages[Math.floor(Math.random() * hindiMessages.length)];
};

