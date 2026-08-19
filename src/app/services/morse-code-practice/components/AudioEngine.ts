class MorseAudioEngine {
    private ctx: AudioContext | null = null;
    private oscillator: OscillatorNode | null = null;
    private gainNode: GainNode | null = null;
    private isPlaying: boolean = false;
    private frequency: number = 650; // classic telegraph frequency

    public init() {
        // Only init if we are in browser
        if (typeof window === 'undefined') return;

        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

            this.gainNode = this.ctx.createGain();
            this.gainNode.connect(this.ctx.destination);
            this.gainNode.gain.value = 0;
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public startTone() {
        if (this.isPlaying || !this.ctx || !this.gainNode) return;

        // Recreate oscillator on every press (they are one-time use in Web Audio)
        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = this.frequency;

        this.oscillator.connect(this.gainNode);
        this.oscillator.start();

        // Smooth attack and release to avoid clicking popping noises
        this.gainNode.gain.setTargetAtTime(0.5, this.ctx.currentTime, 0.015);
        this.isPlaying = true;
    }

    public stopTone() {
        if (!this.isPlaying || !this.ctx || !this.gainNode || !this.oscillator) return;

        this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);

        // Keep it alive safely just a tiny bit to finish the fade
        this.oscillator.stop(this.ctx.currentTime + 0.1);
        this.oscillator.disconnect();
        this.oscillator = null;
        this.isPlaying = false;
    }
}

export const audioEngine = new MorseAudioEngine();
