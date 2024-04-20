import ytdl from 'ytdl-core';
import {Readable} from "node:stream";

class Audio {
    private url: string;

    constructor() {
        this.url = 'https://www.youtube.com/watch?v=w5CG9y3oivg';
    }

    public getStream(): Readable {
        return ytdl(this.url, { filter: 'audioonly' });
    }

    public setUrl(url: string): void {
        this.url = url;
    }
}

export default Audio;