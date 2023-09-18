import { server } from "./server.js";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	content.classList.add("placeholder");

	// Verificar se o link é de um short
	const videoURL = input.value;
	if (!videoURL.includes("shorts")) {
		return (content.textContent = "Esse video não parece ser um short.");
	}

	// Pegar o ID do shorts
	const [_, params] = videoURL.split("/shorts/");
	const [shortID] = params.split("?si");
	// console.log(shortID);

	content.textContent = "Obtendo o texto do audio...";

	const transcription = await server.get("/summary/" + shortID);

	content.textContent = "Realizando o Resumo ...";

	const summary = await server.post("/summary", {
		text: transcription.data.result,
	});

	content.textContent = summary.data.result;
	content.classList.remove("placeholder");
});
