import beep from '../assets/beep.mp3';
const audio = new Audio(beep);

export default {
	playBeep() {
		try {
			audio.play();
		} catch (e) {
			console.error(e);
		}
	}
};
