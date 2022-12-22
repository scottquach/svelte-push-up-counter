import { browser } from '$app/environment';

import beep from '../assets/beep.mp3';
let audio: HTMLAudioElement | null;
if (browser) {
	audio = new Audio(beep);
}

export default {
	playBeep() {
		try {
			if (audio) audio.play();
		} catch (e) {
			console.error(e);
		}
	}
};
