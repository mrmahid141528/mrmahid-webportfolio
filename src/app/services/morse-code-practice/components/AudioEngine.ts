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

            // Set initial volume to 0 (silent) securely immediately
            this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

            // Create and start the oscillator ONCE. It runs continuously in the background silently.
            this.oscillator = this.ctx.createOscillator();
            this.oscillator.type = 'sine';
            this.oscillator.frequency.value = this.frequency;
            this.oscillator.connect(this.gainNode);
            this.oscillator.start();
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public startTone() {
        if (this.isPlaying || !this.ctx || !this.gainNode) return;

        // Ensure the context wakes up instantly on iOS if it was suspended automatically
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Extremely fast attack to eliminate latency, but a tiny 5ms slope to prevent audio 'clicks'
        this.gainNode.gain.setTargetAtTime(0.5, this.ctx.currentTime, 0.005);
        this.isPlaying = true;
    }

    public stopTone() {
        if (!this.isPlaying || !this.ctx || !this.gainNode) return;

        // Extremely fast release
        this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.005);
        this.isPlaying = false;
    }
}

export const audioEngine = new MorseAudioEngine();
