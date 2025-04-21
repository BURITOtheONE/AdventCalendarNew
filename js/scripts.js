document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const cards = document.querySelectorAll('.card');
    const unlockAll = document.querySelectorAll('.admin-button'); 
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content-body');
    const closeModalButton = document.querySelector('.close-btn');
    let startButton = document.getElementById('startGame'); // Query after content is injected
    const player = document.getElementById('player');
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');
    const fireworkSound = new Audio();
    fireworkSound.src = 'C:/Users/denis/OneDrive/Documents/GitHub/AdventCalendar/assets/audio/background.mp3';
    fireworkSound.preload = 'auto';
    let strartedPlaying = false;
    let soundEnabled = false;


    // Define content for each day
    const challenges = {
        1: { 
            type: "quiz", 
            data: { 
                question: "What percentage of internantional students recieve engineering degrees in the US", 
                answer1: "20%", 
                answer2: "90%", 
                answer3: "50%",
                rightAnswer: "50%",
                question2: "How many tons of outdated computers and electronics are discarded every year in the US?",
                answer21: "100 million",
                answer22: "150 million",
                answer23: "220 million",
                rightAnswer2: "220 million",
                question3: "What percentage of internantional students recieve engineering degrees in the US", 
                answer31: "20%", 
                answer32: "90%", 
                answer33: "50%",
                rightAnswer3: "50%",
                progress: 0
            }
        },
        2: { 
            type: "fact", 
            data: {
                picture: "assets/img/fact1.png",
                text: "92% of boys and 97% of girls will lose interest in STEM if they are not immersed before 5th grade." 
            }
        },
        3: { 
            type: "project",
            data: { 
                picture: "assets/img/proj1.jpg",
                description: "Build a balloon-powered car from recycled materials in this fun activity. You can even grab a friend, build two cars, and race them against each other!",
                href: "https://youtu.be/RStgV8mA-gA?si=RxJxxZAeZptycVvr"
            }
        },
        4: { 
            type: "quiz", 
            data: { 
                question: "Why does Mars appear to be red?", 
                answer1: "it is coated in rust", 
                answer2: "the air contains toxic gases", 
                answer3: "there are red animals on the surface",
                rightAnswer: "it is coated in rust",
                question2: "How many of the world's researchers are women",
                answer21: "10,8%",
                answer22: "75,9%",
                answer23: "29,3%",
                rightAnswer2: "29,3%",
                question3: "Why does Mars appear to be red?", 
                answer31: "it is coated in rust", 
                answer32: "the air contains toxic gases", 
                answer33: "there are red animals on the surface",
                rightAnswer3: "it is coated in rust",
                progress: 0
            }
        },
        5: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact2.jpeg",
                text: "The Pigeon Post: Before email, Charles Darwin relied on a unique communication method: carrier pigeons! These feathered messengers helped him stay connected with fellow scientists across vast distances." 
            }
        },
        6: { 
            type: "project",
            data: { 
                title: "Catapult Use in XVII Century",
                picture: "assets/img/project2.jpeg",
                description: "Catapults were mighty handy for pirates in the golden age of piracy (during the 17th century). And medieval knights used them centuries earlier for taking down massive castle walls. Even Greeks and Romans used catapults about 2,000 years ago! These simple machines are quite handy, as long as you know how to aim them! In this science activity you will try your hand at catapult technology. Can you predict where your cotton ball will land?", 
                href: "https://youtu.be/aAuN5ZnL4yE?si=Ovysv-vtOggdiJVP"
            }
        },
        7: { 
            type: "quiz", 
            data: {
                question: "What is the most preffered major selected by STEM-interested students?", 
                answer1: "physics", 
                answer2: "mechanical engineering", 
                answer3: "biology",
                rightAnswer: "mechanical engineering",
                question2: "What is the second most preffered major selected by STEM-interested students?",
                answer21: "biology",
                answer22: "physics",
                answer23: "chemistry",
                rightAnswer2: "chemistry",
                question3: "What is the most preffered major selected by STEM-interested students?", 
                answer31: "physics", 
                answer32: "mechanical engineering", 
                answer33: "biology",
                rightAnswer3: "mechanical engineering",
                progress: 0
            }
        },
        8: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact3.jpg", 
                text: "In the United States, there are more employment opportunities for skilled scientists than there are applicants to fill them." 
            }
        },
        9: { 
            type: "project", 
            data: {
                description: 'With a few simple ingredients, you can create a "fire snake" that appears to grow out of nowhere in this fun experiment! Although it looks magical, no magic is involved—it is all because of a chemical reaction. Try it to find out how it works!',
                picture: "assets/img/project3.jpeg",
                href: "https://youtu.be/7xkbXPzBTHE?si=PR1PdiGBiZXZ_ool"
            }
        },
        10: { 
            type: "quiz", 
            data: {
                question: "How many faces can the human memmory hold?", 
                answer1: "5000", 
                answer2: "500", 
                answer3: "1000",
                rightAnswer: "5000",
                question2: "Who was the first computer programmer",
                answer21: "Steve Jobs",
                answer22: "Marie Curie",
                answer23: "Ada Lovelace",
                rightAnswer2: "Ada Lovelace",
                question3: "How many faces can the human memmory hold?", 
                answer31: "5000", 
                answer32: "500", 
                answer33: "1000",
                rightAnswer3: "5000",
                progress: 0
            }
        },
        11: { 
            type: "fact", 
            data: {
                picture: "assets/img/fact4.webp", 
                text: " A third of the world’s population has never used a phone." 
            }
        },
        12: { 
            type: "project", 
            data: { 
                description: "Have you ever wondered what a parachute and an open rain jacket have in common? They both trap air and slow you down when you move fast! In this activity, you design a parachute for a miniature action figure. Tissue paper or a plastic bag and a few strings is all it takes to make your figure into an expert skydiver.",
                picture: "assets/img/project4.jpeg",
                href: "https://youtu.be/6RA9x4wlnW8?si=Jmsl2AZFmrh1EEoF"
            }
        },
        13: { 
            type: "quiz", 
            data: { 
                question: "What is the smallest unit of life in the human body?", 
                answer1: "Atom", 
                answer2: "Cell", 
                answer3: "Tissue",
                rightAnswer: "Cell",
                question2: "Which programming language is primarily used for web development?",
                answer21: "JavaScript",
                answer22: "Python",
                answer23: "C++",
                rightAnswer2: "JavaScript",
                question3: "What is the smallest unit of life in the human body?", 
                answer31: "Atom", 
                answer32: "Cell", 
                answer33: "Tissue",
                rightAnswer3: "Cell",
                progress: 0 
            }
        },
        14: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact5.webp", 
                text: "Steve Wozniak and Steve Jobs, who co-founded Apple, originally achieved fame as teenagers by developing the video game named 'Breakout'" 
            }
        },
        15: { 
            type: "project", 
            data: { 
                description: "Ever wondered how DNA, the genetic blueprint of a life-form, can encode and pass on the information on how to grow and maintain that life-form? Just like a cookbook contains a complete recipe for a dish, DNA stores the recipe for the life of an organism. Although each human has a unique DNA sequence, the DNA in all of us is about 99.9% identical! In this activity, you will use pieces of candy to make a model for a short section of DNA—enough to get a sense of what DNA is like and how it encodes life.",
                picture: "assets/img/project5.jpeg",
                href: "https://youtu.be/dC9uuHoIgXk?si=Na8FPXWqhq-BJV1W"
            }
        },
        16: { 
            type: "quiz", 
            data: { 
                question: "What is the purpose of a suspension bridge cables?", 
                answer1: "To support the deck by distributing tension.", 
                answer2: "To anchor the bridge to the ground.", 
                answer3: "To reduce wind resistance.",
                rightAnswer: "To support the deck by distributing tension.",
                question2: "What is the value of π (pi) approximately?",
                answer21: "3.141",
                answer22: "2.718",
                answer23: "1.618",
                rightAnswer2: "3.141",
                question3: "What is the purpose of a suspension bridge cables?", 
                answer31: "To support the deck by distributing tension.", 
                answer32: "To anchor the bridge to the ground.", 
                answer33: "To reduce wind resistance.",
                rightAnswer3: "To support the deck by distributing tension.",
                progress: 0
            }
        },
        17: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact6.jpeg", 
                text: "Pluto was discovered in 1930, but its cycle around the Sun has not yet finished since a Plutonian year is 247.68 times longer than an Earth year." 
            }
        },
        18: { 
            type: "project", 
            data: { 
                description: "What do you need to make a motor? Not much! In this quick activity, you will make a simple motor using nothing but a battery, magnet, and a piece of wire.",
                picture: "assets/img/project6.jpeg",
                href: "https://youtu.be/0DwHz0zRIGM?si=mmyThZdWxEaOvFYe "
            }
        },
        19: { 
            type: "quiz", 
            data: { 
                question: "What kind of energy is stored in a stretched rubber band?", 
                answer1: "Kinetic Energy", 
                answer2: "Potential Energy", 
                answer3: "Thermal Energy",
                rightAnswer: "Potential Energy",
                question2: "Which molecule carries genetic information?",
                answer21: "RNA",
                answer22: "DNA",
                answer23: "Protein",
                rightAnswer2: "DNA",
                question3: "What kind of energy is stored in a stretched rubber band?", 
                answer31: "Kinetic Energy", 
                answer32: "Potential Energy", 
                answer33: "Thermal Energy",
                rightAnswer3: "Potential Energy",
                progress: 0 
            }
        },
        20: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact7.jpg", 
                text: "More than half of the world’s oxygen is produced by plankton, seaweed, and other photosynthesizers." 
            }
        },
        21: { 
            type: "project", 
            data: { 
                description: "Have you ever wondered how plants take up water from the soil? Water uptake in plants is quite complex and involves a process called osmosis. Osmosis makes the water from the soil move into the roots of the plant. But what drives the water from the soil into the plant cells? In this activity, you will do an experiment with potatoes to find out!",
                picture: "assets/img/project7.jpeg",
                href: "https://youtu.be/uOaV81WuHqA?si=hwKfA5UhtWJ7E23y"
            }
        },
        22: { 
            type: "quiz", 
            data: { 
                question: "What does the acronym AI stand for in computer science?", 
                answer1: "Artificial Imagination", 
                answer2: "Artificial Intelligence", 
                answer3: "Automated Interface",
                rightAnswer: "Artificial Intelligence",
                question2: "Which element is most abundant in Earth’s atmosphere?",
                answer21: "Oxygen",
                answer22: "Carbon Dioxide",
                answer23: "Nitrogen",
                rightAnswer2: "Nitrogen",
                question3: "What does the acronym AI stand for in computer science?", 
                answer31: "Artificial Imagination", 
                answer32: "Artificial Intelligence", 
                answer33: "Automated Interface",
                rightAnswer3: "Artificial Intelligence",
                progress: 0
            }
        },
        23: { 
            type: "fact", 
            data: { 
                picture: "assets/img/fact8.jpeg", 
                text: "The only number with the letter “a” in it from 0 to 1000 is “one thousand." 
            }
        },
        24: { 
            type: "project", 
            data: { 
                description: "We breathe a lot—roughly 12 to 16 times a minute for adults and even more for children! Have you ever wondered how the process of breathing works so smoothly? Our lungs allow us to inhale the oxygen our body needs, but they do much, much more. They also allow us to get rid of carbon dioxide, the waste product created in the body, and they play a vital role in singing, shouting and even giggling. In this activity you will make a model of a lung and use it to discover how air flows in and out of the lungs with ease.",
                picture: "assets/img/project8.jpeg",
                href: "https://youtu.be/WJ06mrNliC0?si=Pf2l25GPtwZDYn4a"
            }
        },
        25: { type: "final" },
    };

    // Function to generate quiz content
    function generateQuizContent(data) {
        return `
            <div id="quiz" style="user-select: none;">
                <h2 class="fw-bold">Day ${dey}</h2>
                <p class="h5 mt-3 mb-4">${data.question}</p>
                <button class="btn w-100 rounded-4 my-2 py-2 btn-light border-4 border-custom answer" data-answer="${data.answer1}">A. ${data.answer1}</button>
                <button class="btn w-100 rounded-4 my-2 py-2 btn-light border-4 border-custom answer" data-answer="${data.answer2}">B. ${data.answer2}</button>
                <button class="btn w-100 rounded-4 my-2 py-2 btn-light border-4 border-custom answer" data-answer="${data.answer3}">C. ${data.answer3}</button>
                <div class="progress mt-3 mb-2 w-75 mx-auto">
                    <div class="progress-bar progress-bar-animated" style="width:${data.progress}%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        `;
    }
    
    // Function to generate fact content
    function generateFactContent(data) {
        return `
            <div class="text-center py-3 px-2" style="user-select: none;">
                <h1 class="fw-bold mb-3">Day ${dey}</h1>
                <h3 class="my-3">${data.text}</h3>
                <img src="${data.picture}" alt="Fun Fact Image" class="img-fluid rounded-4 my-3">
            </div>
        `;
    }
       

    // Function to generate project content
    function generateProjectContent(data) {
        return `
            <div class="p-3" style="user-select: none">
                <h2 class="mb-3">Day ${dey}</h2>
                <h5>${data.description}</h5>
                <img src="${data.picture}" alt="Fun Fact Image" class="img-fluid rounded-4 my-3"> </br>
                <a href="${data.href}" target="_blank" rel="noopener noreferrer">Click Here For a Tutorial</a>
            </div>
        `;
    }

    const date = new Date();
    const tempdate = date.getDate();

    // Add event listener to the admin button
    let isunlocked = false;

    unlockAll.forEach(adminButton => {
        adminButton.addEventListener('click', () => {
            // Change the isunlocked to the other state
            isunlocked = !isunlocked;

            if (isunlocked) {
                adminButton.classList.add('btn-success');
                adminButton.classList.remove('btn-danger');
            } else {
                adminButton.classList.add('btn-danger');
                adminButton.classList.remove('btn-success');
            }
        });
    });

// Variables to track progress
let rightAnswers = 0;
let wrongAttempts = 0;

// Add event listeners to each answer button dynamically
modalContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('answer')) {
        const answer = event.target; // Get the clicked answer button
        const correctAnswer = modalContent.querySelector(`[data-answer="${challenges[dey].data.rightAnswer}"]`);
        const progressBar = document.querySelector('.progress-bar');
        const questionContainer = answer.closest('div'); // Get the parent container of the question

        // Create or reuse feedback message
        let feedbackMessage = questionContainer.querySelector('.feedback-message-wrong');
        if (!feedbackMessage) {
            feedbackMessage = document.createElement('div');
            feedbackMessage.className = 'feedback-message text-success text-center w-50 mt-2 fade-in-out';
            questionContainer.appendChild(feedbackMessage);
        }

        // Disable all buttons after an answer is selected
        const allAnswers = modalContent.querySelectorAll('.answer');
        allAnswers.forEach(button => (button.disabled = true));

        if (answer === correctAnswer) {
            rightAnswers++;
            answer.classList.remove('btn-light');
            answer.classList.add('btn-success'); // Right Answer

            if (rightAnswers > 1) {
                // Update progress bar to 100%
                setTimeout(() => {
                    progressBar.style.width = '100%';
                    progressBar.setAttribute('aria-valuenow', '100');
                }, 100);

                // Final feedback message
                feedbackMessage.textContent = `Congratulations! You finished this quiz with ${wrongAttempts} wrong attempts.`;
                feedbackMessage.className = 'feedback-message-right text-success text-center w-50 mt-2 fade-in-out';

                challenges[dey].data.question = challenges[dey].data.question3;
                challenges[dey].data.answer1 = challenges[dey].data.answer31;
                challenges[dey].data.answer2 = challenges[dey].data.answer32;
                challenges[dey].data.answer3 = challenges[dey].data.answer33;
                challenges[dey].data.rightAnswer = challenges[dey].data.rightAnswer3;
                challenges[dey].data.progress = 0;
                rightAnswers = 0;
                wrongAttempts = 0;

                setTimeout(() => { closeModal(); }, 3000)
            } else {
                // Update progress bar to 50%
                setTimeout(() => {
                    progressBar.style.width = '50%';
                    progressBar.setAttribute('aria-valuenow', '50');
                }, 100);

                // Load next question after delay
                setTimeout(() => {
                    challenges[dey].data.question = challenges[dey].data.question2;
                    challenges[dey].data.answer1 = challenges[dey].data.answer21;
                    challenges[dey].data.answer2 = challenges[dey].data.answer22;
                    challenges[dey].data.answer3 = challenges[dey].data.answer23;
                    challenges[dey].data.rightAnswer = challenges[dey].data.rightAnswer2;
                    challenges[dey].data.progress = 50;

                    // Update modal content
                    let content = generateQuizContent(challenges[dey].data);
                    modalContent.innerHTML = content;
                }, 2000);
            }
        } else {
            // Incorrect answer
            wrongAttempts++;
            answer.classList.remove('btn-light');
            answer.classList.add('btn-danger'); // Wrong Answer

            // Display feedback message
            feedbackMessage.textContent = 'Wrong Answer! Try again.';
            feedbackMessage.className = 'feedback-message-wrong text-danger text-center w-50 mt-2 fade-in-out';

            // Allow retry after delay
            setTimeout(() => {
                feedbackMessage.remove();
                allAnswers.forEach(button => (button.disabled = false));
                answer.classList.remove('btn-danger');
                answer.classList.add('btn-light');
            }, 2000);
        }
    }
});

// Save the day number for purposes outside the card opening function
let dey = 0;

body.addEventListener('click', () => {
    soundEnabled = true;
})


// Add click event listener to each card
cards.forEach(card => {
    card.addEventListener('click', () => {
        const day = parseInt(card.querySelector('h1').textContent); // Get the day number
        // Save the day number for outside this function
        dey = day;

        if(isunlocked || day <= tempdate){
        const challenge = challenges[day]; // Get the challenge for the day
        if (challenge) {
            // Generate content based on challenge type
            let content = "";
            switch (challenge.type) {
                case "quiz":
                    content = generateQuizContent(challenge.data);
                    break;
                case "fact":
                    content = generateFactContent(challenge.data);
                    break;
                case "project":
                    content = generateProjectContent(challenge.data);
                    break;
                case "final":
                    window.location.href = "end.html";
                    break;
            }

            // Insert content into modal
            modalContent.innerHTML = content;

            // Check if the card is already opened
            if (!card.classList.contains('opened')) {
                card.classList.remove('christmas-spectrum'); // Remove initial class
                card.classList.add('opened'); // Mark the card as opened
            }

            // Show the modal overlay
            modalOverlay.style.display = 'flex';
        } else { console.warn(`No challenge found for day ${day}`); }
    } else { alert("Not available today"); }
    });
});

    function closeModal() { modalOverlay.style.display = 'none'; } // Hide the modal 

    // Close the modal from the exit button
    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    // Close the modal if the user clicks outside the modal content
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });


    setInterval (() => {
        if (soundEnabled && !strartedPlaying){
            strartedPlaying = true;
            fireworkSound.currentTime = 0; // Reset sound to the beginning
            fireworkSound.play().catch((err) => console.warn("Audio play error:", err));
      }}, 100);


/*  Deleted Idea for a Game for The Last Day

let hasStarted = false;

// Function to render the modal and attach the event listener

// Detect and handle collisions with gifts
setInterval(() => {
    const gifts = document.querySelectorAll('.gift'); // Get all active gifts
    gifts.forEach(gift => {
        // Function to detect collisions
        function checkCollision(gift) {
            const playerRect = player.getBoundingClientRect();
            const giftRect = gift.getBoundingClientRect();

            return !(
                playerRect.right < giftRect.left || // Player is left of the gift
                playerRect.left > giftRect.right || // Player is right of the gift
                playerRect.bottom < giftRect.top || // Player is above the gift
                playerRect.top > giftRect.bottom    // Player is below the gift
            );
        }

        if (checkCollision(player, gift)) {
            console.log('Collision detected!'); // Debugging: Log when a collision is detected

            // Increment score and update UI
            score++;
            scoreDisplay.textContent = score;

            // Remove the collected gift
            gift.remove();

            // Check if the required number of gifts is collected
            if (score >= challenges[25].data.giftsToCollect) {
                document.getElementById('certificate-container').style.display = 'block';
            }
        }
    });
}, 100);

// Function to spawn gifts
function spawnGift() {
    const gift = document.createElement('div');
    gift.className = 'gift';

    // Gift styles
    gift.style.width = '30px';
    gift.style.height = '30px';
    gift.style.backgroundColor = 'gold';
    gift.style.position = 'absolute';

    // Random position within the game area
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxLeft = gameAreaRect.width - 30;
    const maxTop = gameAreaRect.height - 30;
    gift.style.left = `${Math.random() * maxLeft}px`;
    gift.style.top = `${Math.random() * maxTop}px`;

    gameArea.appendChild(gift);

    // Debugging: Log when a gift is spawned
    console.log('Gift spawned at:', gift.style.left, gift.style.top);

    // Remove the gift after 5 seconds if not collected
    setTimeout(() => {
        if (gift.parentElement) gift.remove();
    }, 5000);
}

// Start game logic
startButton.addEventListener('click', () => {
    startGame();
});

function startGame() {
    // Initialize game variables
    let score = 0;
    const giftsToCollect = data.giftsToCollect;
    let gifts = document.querySelectorAll('.gift');
    const certificateContainer = document.getElementById('certificate-container');    
    
    // Reset score
    score = 0;
    scoreDisplay.textContent = score;

    // Show game area
    gameArea.style.display = 'block';

    // Spawn gifts every second
    const giftInterval = setInterval(spawnGift, 1000);

    // Stop spawning gifts after 30 seconds
    setTimeout(() => clearInterval(giftInterval), 30000);
}*/
});