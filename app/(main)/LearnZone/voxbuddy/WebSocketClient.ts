export class WebSocketClient implements AsyncIterable<any> {
    private socket: WebSocket | null = null;
    private messageQueue: any[] = [];
    private receiverQueue: [(value: IteratorResult<any>) => void, (reason?: any) => void][] = [];
    private isClosed = false;
  
    private onOpenCallback: (() => void) | null = null;
  
    constructor(url: string) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
        if (this.onOpenCallback) {
          this.onOpenCallback();
        }
      };
  
      this.socket.onmessage = (event) => {
        const message = event.data instanceof ArrayBuffer ? { type: 'binary', data: event.data } : { type: 'text', data: event.data };
        if (this.receiverQueue.length > 0) {
          const [resolve] = this.receiverQueue.shift()!;
          resolve({ value: message, done: false });
        } else {
          this.messageQueue.push(message);
        }
      };
  
      this.socket.onclose = () => {
        this.isClosed = true;
        while (this.receiverQueue.length > 0) {
          const [resolve] = this.receiverQueue.shift()!;
          resolve({ value: undefined, done: true });
        }
      };
    }
  
    async send(message: { type: 'text' | 'binary'; data: any }) {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(message.data);
      } else {
        throw new Error('WebSocket is not open');
      }
    }
  
    onOpen(callback: () => void) {
      this.onOpenCallback = callback;
    }
  
    [Symbol.asyncIterator](): AsyncIterator<any> {
      return {
        next: () => {
          if (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift()!;
            return Promise.resolve({ value: message, done: false });
          } else if (this.isClosed) {
            return Promise.resolve({ value: undefined, done: true });
          } else {
            return new Promise((resolve, reject) => {
              this.receiverQueue.push([resolve, reject]);
            });
          }
        },
      };
    }
  
    async close() {
      this.socket?.close();
      this.socket = null;
    }
  }
  