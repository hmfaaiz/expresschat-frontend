import io from "socket.io-client";
import { BaseUrl } from "../baseUrl";

const socketConnection = io(BaseUrl);

export default socketConnection;