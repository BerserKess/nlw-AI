import ytdl from "ytdl-core";
import fs from "fs";

// Realizar o download
export const download = (videoId) =>
	new Promise((resolve, reject) => {
		const videoURL = `https://www.youtube.com/shorts/${videoId}`;
		console.log(`Realizando o donwload do vídeo: ${videoId}`);

		ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
			.on("info", (info) => {
				const seconds = info.formats[0].approxDurationMs / 1000;
				if (seconds > 60) {
					throw new Error(
						"A duração desse video é maior que 60 segundos"
					);
				}
			})
			.on("end", () => {
				console.log("Donwload Finalizado");
				resolve();
			})
			.on("error", (error) => {
				console.log(
					`Não foi possivel realizar o download do video. Detalhes do erro:${error}`
				);
				reject(error);
			})
			.pipe(fs.createWriteStream("./tmp/audio.mp4"));
	});
