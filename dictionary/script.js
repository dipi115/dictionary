const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const loading = document.getElementById("loading");
const themeToggle = document.getElementById("theme-toggle");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    loading.classList.remove("hidden");
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            loading.classList.add("hidden");
            
            let audioSrc = "";
            for (let phonetic of data[0].phonetics) {
                if (phonetic.audio) {
                    audioSrc = phonetic.audio;
                    break;
                }
            }

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || "No phonetic available"}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch(() => {
            loading.classList.add("hidden");
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        alert("No pronunciation available for this word.");
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
