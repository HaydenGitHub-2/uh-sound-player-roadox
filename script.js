// Sound table (maps number to file names)
const sounds = {
    1: "10",
    2: "1",
    3: "2",
    4: "4",
    5: "6",
    6: "2",
    7: "4",
    8: "9",
    9: "2"
};

// Function to play sounds in order
function playSounds(soundTable) {
    let keys = Object.keys(soundTable);
    let index = 0;

    function playNext() {
        if (index >= keys.length) return; // Stop when all sounds are played

        let soundKey = keys[index];
        let soundFile = `sounds/${soundTable[soundKey]}.mp3`; // Path to the sound file
        let audio = new Audio(soundFile);

        audio.play();
        index++;

        // Play the next sound after the current one finishes
        audio.onended = playNext;
    }

    playNext(); // Start playing the first sound
}

// Attach play function to the button
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playButton").addEventListener("click", () => playSounds(sounds));
});
