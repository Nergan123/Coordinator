import App from "./server/app";
import fs from "fs";
import path from "path";
import loadEnv from "./server/utils/loadEnv";

const dir = path.resolve(__dirname, 'logs');
loadEnv();

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const app: App = new App;
app.listen();
