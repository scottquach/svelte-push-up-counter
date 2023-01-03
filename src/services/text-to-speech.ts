import { TextToSpeech } from '@capacitor-community/text-to-speech';
let synthesis: SpeechSynthesis | null = null;
const langRegex = /^en(-[a-z]{2})?$/i;
let voices: any[] = [];

export const speak = (text: string) => {
	if ('speechSynthesis' in window) {
		if (!synthesis) {
			synthesis = window.speechSynthesis;
			voices = synthesis.getVoices().filter((voice) => langRegex.test(voice.lang));
		}
		// console.log('aaa speech synthesis in window');
		synthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = voices[3];
		synthesis.speak(utterance);
	} else {
		// console.log('aaa no speech synthesis in window');
		TextToSpeech.speak({
			text: text,
			lang: 'en-US',
			rate: 1.0,
			pitch: 1.0,
			volume: 1.0,
			category: 'ambient'
		});
	}
};
