![CARRYBEE (1)](https://github.com/user-attachments/assets/3b412115-97e2-4597-84ef-9803460c0738)
# CARRYBEE

### Overview 👓
This project is a portfolio project for Holberton students. Our group has decided to build a courier app inspired by the popular application in Southeast Asia called Lalamove. This app allows users to have their parcels delivered within a day, with additional delivery options tailored to their needs. The app also enables anyone who owns a vehicle to become a driver and earn extra money. We aim to create a courier app that Australia has never seen before. The purpose of the project is for everyone to work together and build a full-stack application using a variety of tools.

This project lasts for 4 weeks, which includes planning, diagram drawing, Figma design, database development, and UX/UI design. We have divided into two teams: front-end and back-end.

### Technical Architecture 👩‍🏫
---------------------------------
# Structure 🏔

### Usage 🛠
## Set up the enviroment:

$ docker-compose up --build

Check that containers are running

$  docker ps -a 

Open new terminal to run Prisma migrations ( Database name: carry_bee)

$ docker exec -it backend npx prisma migrate dev --name init

Connect to PostgreSQL inside the db container:

$ docker exec -it db psql -U carry_bee

To check that the database is showing the information:

carry_bee-# \dt 

Open a new terminal:

$ npm install 

$ node index.js

check http://localhost:3000
or curl http://localhost:3000

### Test 🌊

--------------------------------
# Developed By: 🧑‍💻

Angela Enriquez Garcia

Mary Fletcher

Chutima Puthachon 

Xi Qern Egan Leong 

Volodymyr Gozhyi

Phon Soumpholphakdy
