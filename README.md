# LINE Bot Starter with Node.js and Express

A simple starter template for creating a LINE Messaging API bot using Node.js, Express, and the official `@line/bot-sdk`. This project sets up a basic echo bot that replies to any text message with the same text. It's designed for easy local development and testing using `ngrok`.

## Features

- **Simple Echo Bot:** A clean starting point that echoes user messages.
- **Node.js & Express:** Built on a standard, lightweight web server stack.
- **Official LINE SDK:** Uses `@line/bot-sdk` for easy integration with the Messaging API.
- **Environment-Ready:** Uses `dotenv` to manage your secret credentials safely.
- **Local Development with ngrok:** Includes instructions for exposing your local server to the internet for webhook testing.
- **Unit Testing with Jest:** Comes with a pre-configured test environment using Jest to ensure code quality.


---

## Getting Started

Follow these instructions to get your own copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js (which includes npm)
- ngrok - A tool to create a secure tunnel to your local machine.
- A LINE Account to create a developer channel.

### 1. Set Up Your LINE Developers Channel

1.  **Log in** to the LINE Developers Console.
2.  **Create a Provider** if you don't have one.
3.  **Create a new channel** within your provider.
    -   Select **Messaging API**.
    -   Fill in the required details.
4.  **Get Your Credentials:**
    -   Navigate to your new channel's **"Messaging API"** tab.
    -   Issue a **Channel access token (long-lived)**.
    -   Go to the **"Basic settings"** tab.
    -   You will need the **Channel secret** and the **Channel access token** for the next steps.

### 2. Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd linebot-nodejs-easy-starter-2025
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root of your project and copy the contents of `.env.example` (if you have one) or add the following variables.

    ```env
    # LINE Bot credentials
    CHANNEL_ACCESS_TOKEN=YourChannelAccessToken
    CHANNEL_SECRET=YourChannelSecret

    # Server port (optional, defaults to 3000)
    PORT=3000
    ```
    Replace `YourChannelAccessToken` and `YourChannelSecret` with the credentials you obtained from the LINE Developers Console.

---

## Running the Bot

1.  **Start the local server:**
    ```bash
    npm start
    ```
    Your server is now running locally on port 3000.

2.  **Expose your local server with ngrok:**
    Open a **new terminal window** and run the following command. This will create a public URL that forwards to your local server.
    ```bash
    ngrok http 3000
    ```
    `ngrok` will display a `Forwarding` URL (e.g., `https://random-string.ngrok-free.app`). Copy the `https` URL.

3.  **Configure the Webhook URL:**
    -   Go back to your channel in the **LINE Developers Console**.
    -   In the **"Messaging API"** tab, find the **Webhook settings**.
    -   Paste your `ngrok` HTTPS URL into the **Webhook URL** field and add `/webhook` to the end.
        -   Example: `https://random-string.ngrok-free.app/webhook`
    -   Click **Update**.
    -   **Enable "Use webhook"**.
    -   Click the **Verify** button to test the connection. You should see a "Success" message.

4.  **Test Your Bot!**
    -   In the "Messaging API" tab, you'll find a QR code for your bot.
    -   Scan it with your phone's LINE app to add the bot as a friend.
    -   Send it a message, and it will echo your message back to you!

---

## Testing

This project uses Jest for unit testing. The tests are set up to verify the core logic of the `handleEvent` function without needing to run a live server.

To run the tests, use the following command:

```bash
npm test
```

You will find the test files in the root directory with a `.test.js` extension.


## Project Structure

```
├── .gitignore       # Specifies files to be ignored by Git
├── index.js         # Main application file (Express server and bot logic)
├── package.json     # Project metadata and dependencies
├── .env             # Stores secret credentials (ignored by Git)
└── README.md        # This file
```

## License

This project is licensed under the MIT License.

