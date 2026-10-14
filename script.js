const USE_BACKEND = false;

const BACKEND_URL = "https://vdf-games-kostak.onrender.com/chat";
const STUDENT_ID = "Kostak_Ladislav_4A";

const form = document.getElementById("question-form");
const textarea = document.getElementById("question");
const emailInput = document.getElementById("email");
const answerDiv = document.getElementById("answer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textarea.value.trim();
  const email = emailInput.value.trim();

  if (!text) {
    answerDiv.textContent = "Nejdřív napiš dotaz.";
    return;
  }

  answerDiv.textContent = "Zpracovávám dotaz…";
  form.querySelector("button").disabled = true;

  try {
    const payload = {
      message: text,
      student: STUDENT_ID,
      email: email || null
    };

    if (!USE_BACKEND) {
      answerDiv.textContent =
        `Demo odpověď (bez serveru)\n\n` +
        `Student: ${payload.student}\n` +
        `Dotaz: ${payload.message}`;
      return;
    }

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      answerDiv.textContent = "Server vrátil chybu: " + res.status;
      return;
    }

    const data = await res.json();

    if (data.reply) {
      answerDiv.textContent = data.reply;
    } else if (data.error) {
      answerDiv.textContent = "Chyba serveru: " + data.error;
    } else {
      answerDiv.textContent = "Server nevrátil žádnou odpověď.";
    }
  } catch (err) {
    console.error(err);
    answerDiv.textContent = "Nepodařilo se spojit se serverem.";
  } finally {
    form.querySelector("button").disabled = false;
    textarea.value = "";
  }
});
