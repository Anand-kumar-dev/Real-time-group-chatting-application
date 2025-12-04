import { io } from 'socket.io-client';

const URL ='https://copyrights-agent-icq-holders.trycloudflare.com';

export const socket = io(URL);