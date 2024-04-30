class Battle {
    private turn: number;
    private queue: {id: string, player: boolean}[];

    constructor(turn: number = 0, queue: {id: string, player: boolean}[] = []) {
        this.turn = turn;
        this.queue = this.shuffleArray(queue);
    }

    public setQueue(queue: any[]) {
        this.queue = queue
    }

    public setTurn(turn: number) {
        this.turn = turn
    }

    public makeTurn() {
        this.turn++;
        if (this.turn >= this.queue.length) {
            this.turn = 0;
        }

        return this.turn
    }

    public get() {
        return {
            turn: this.turn,
            queue: this.queue
        }
    }

    public removeFromQueue(index: number) {
        this.queue = this.queue.filter((_, i) => i !== index);
        if (this.turn >= this.queue.length) {
            this.turn = 0;
        }
    }

    public addToQueue(id: string, player: boolean) {
        this.queue.push({id, player});
    }

    private shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array
    }

}

export default Battle;