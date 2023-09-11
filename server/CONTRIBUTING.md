# 💕 Contributing

Thanks for collaborating! 💖 Here's a few guidelines that should help you as you prepare your collaboration.

## 🧑‍💻 Development

To improve our development process, we've set up tooling and systems. SparkMate uses a client server architecture.

### ⚒️ Tooling :

      📌 VS Code as the preferred code editor.
      📌 NPM to manage packages and dependencies.
      📌 JEST for unit testing and integration testing.
      📌 ESLint & Prettier for code formatting. 

## Setup the Project

The following steps will get you up and running to contribute to SparkMate:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/Bismay5467/LOVE-AT-FIRST-SWIPE))

2. Clone your fork locally

```sh
git clone https://github.com/<your github username>/LOVE-AT-FIRST-SWIPE.git
```

3. Setup all the dependencies and packages by running `npm install`. This command will install all the global dependencies.

4. Run the following cmd in the terminal. This will disable the automatic conversion of end of line sequence (EOL) from LF to CRLF by git as we will be using LF as the default EOL through out our project.
   
```sh
git config --global core.autocrlf false
```

5. Change your directory to **`server`** by running the following cmd in the terminal.

```sh
cd server
```

6. Setup all the dependencies and packages inside **`server directory`** by running `npm install`. This command will install all the dependencies inside the server directory.

Now you are good to go!! Start collaborating to add more features! 🚀✨

## 🤖 Commands

</>**`npm install`**: bootstraps the entire backend, symlinks all dependencies.

🌐 **`npm run start`**: starts the development server.

🧪 **`npm run test:server`**: performs unit testing and integration testing.

⚙️ **`npm run lint:server`**: lists out all the linting errors and warnings in the codebase.

☘️ **`npm run lint:fix:server`**: fixes all the potentially fixable linting errors and warnings.