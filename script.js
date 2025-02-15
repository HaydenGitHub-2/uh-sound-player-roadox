// Sound order mapping
const soundOrder = {
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
function playSounds() {
    let keys = Object.keys(soundOrder);
    let index = 0;

    function playNext() {
        if (index < keys.length) {
            let soundNumber = soundOrder[keys[index]];
            let audio = new Audio(`${soundNumber}.mp3`); // Directly in the main directory
            audio.play();

            audio.onended = () => {
                index++;
                playNext();
            };
        }
    }

    playNext();
}

// Play button event listener
document.getElementById("playButton").addEventListener("click", playSounds);
