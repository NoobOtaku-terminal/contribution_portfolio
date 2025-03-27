const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");

const git = simpleGit();

const makeCommit = (n) => {
  if (n === 0) {
    git.push(["-u", "origin", "main"], (err, result) => {
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed changes to remote repository");
      }
    });
    return;
  }

  const x = Math.floor(Math.random() * 52); // Weeks in 2023
  const y = Math.floor(Math.random() * 7);  // Days in a week

  const DATE = moment("2023-12-31") // Last day of 2023
    .subtract(x, "w")
    .subtract(y, "d")
    .format();

  const data = { date: DATE };
  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .push(["-u", "origin", "main"], (err, result) => {
        if (err) {
          console.error("Error pushing to remote:", err);
        } else {
          console.log("Pushed changes to remote repository");
          makeCommit(n - 1);
        }
      });
  });
};

makeCommit(2);
