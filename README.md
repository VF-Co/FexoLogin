List of commands to run the project
1. npm install
2. npx expo prebuild --clean
3. npx expo run:ios

If you are gonna run the project in expo
1. npm install
2. npm start

To connect to the endpoint in the main.go file, you need to use your IP address. Go to your Wi-Fi settings, and there you will find your IP. Use that IP in the Tripform file, specifically on line 82:
const url = 'http://<your computer’s IP>:8080/?api_key=Z1Y5yvAIwxfVOzHn444W4BO2bf8YIqmM-rsZUXGuCV8=';

If you are running main.go locally, you can use localhost instead of the IP:
const url = 'http://localhost:8080/?api_key=Z1Y5yvAIwxfVOzHn444W4BO2bf8YIqmM-rsZUXGuCV8=';
