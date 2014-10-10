Instructions for installation:
==============================

1. Install node and npm (install globally)
[Google -> Digitial Ocean or some other link]
2. Clone this repository.
[To use ssh, put your ssh key in your git.cse account]
3. Run npm install
[It will look in package.json and install all dependencies. This folder is added in gitignore, please do not remove from .gitignore. Install your copy of node_modules. npm install will do this]
4. Test your server with "node app.js". Open localhost:3000 [In app.js, I have mentioned 3000 as port. All of us should use same port, otherwise with every pull, we will have overwritten copy of app.js's port value locally] 