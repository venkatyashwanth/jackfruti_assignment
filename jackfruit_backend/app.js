const express = require('express');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");
const databasePath = path.join(__dirname, "userInfo.db");
const app = express();


app.use(cors())
app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database, 
    });
    app.listen(3200, () =>
      console.log("Server Running at http://localhost:3200/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


app.post("/adddata/", async (request, response) => {
    const {userDetails} = request.body;
    const {Bas,LTA,HRA,FA,Inv,Rent,cityType,Med,Tax} = userDetails;
    console.log(userDetails);
    const postUserQuery = `
    INSERT INTO
      user(Bas, LTA, HRA, FA, Inv, Rent, CityType, Med, TAxInc)
    VALUES
      ('${Bas}', '${LTA}', '${HRA}','${FA}','${Inv}','${Rent}','${cityType}','${Med}','${Tax}');`;
    const player = await database.run(postUserQuery);
    response.send("Player Added to Team");
  });