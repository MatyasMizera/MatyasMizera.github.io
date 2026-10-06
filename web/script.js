let questions = [];

// Načtení JSON souboru
fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Nepodařilo se načíst data.json");
        }

        return response.json();
    })
    .then(data => {
        questions = data;
    })
    .catch(error => {
        console.error(error);
    });


// Odeslání dotazu
document.getElementById("questionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const input = document.getElementById("question");
    const userQuestion = input.value.trim().toLowerCase();

    const answerBox = document.getElementById("answer");
    const notFoundBox = document.getElementById("notFound");

    answerBox.classList.add("hidden");
    notFoundBox.classList.add("hidden");

    // Hledání otázky
    const result = questions.find(item => {
        return item.keywords.some(keyword =>
            userQuestion.includes(keyword.toLowerCase())
        );
    });

    if (result) {
        document.getElementById("answerText").textContent = result.answer;
        document.getElementById("employeeName").textContent = result.name;

        answerBox.classList.remove("hidden");
    } else {
        notFoundBox.classList.remove("hidden");
    }
});
