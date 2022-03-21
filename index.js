const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/testing/getsavedscript', (req, res) => {
  try {
    const userid = req.query.userid
    const script = JSON.parse(fs.readFileSync(`userid/${userid}.json`).toString())
    if (script["Whitelisted"] == "Yes") {
      if (script["Executed"] == "False") {
        script["Executed"] = "True"
        fs.writeFileSync(`userid/${userid}.json`, JSON.stringify(script, null, 2))
        return res.send(script)
      } else if (script["Executed"] == "True") {
        return res.send("Script has already been executed!")
      } else {
        return res.send("Uhhhh idk wtf you have in your json file lol")
      }
    } else {
      return res.send("Wowwww imagine not being wled :skull:")
    }
  }
  catch (error) {
    console.log(error)
    return res.send(
      {
        "Error": "stop lol"
      })
  }
});
app.get('/testing/savescript', (req, res) => {
  try {
    const userid = req.query.userid
    const script = JSON.parse(fs.readFileSync(`userid/${userid}.json`).toString())
    const stop = req.query.script
    if (script["Whitelisted"] === "No") {
      return res.send("Fuck off faggot")
    }
    if (script["Whitelisted"] === "Yes") {
      const newstop = stop.replace(/"/g, `'`);
      script["Script"] = newstop
      fs.writeFileSync(`userid/${userid}.json`, JSON.stringify(script, null, 2))
      return res.send("Script saved (I think)");
    }
    return res.send("lmao skid")
  }
  catch (error) {
    console.log(error)
    return res.send(
      {
        "Error": "stop lol"
      })
  }
});
app.get('/testing/checkwl', (req, res) => {
  try {
    const blacklistmessages = {
      0: "I dont think you understand but I was Gr99med by agent",
      1: "Ratted by the 7 little negers",
      2: "Imagine being blacklisted on a retarded ss :skull:"
    }
    const whitelistmessages = {
      0: "Its pronouned yeah-sir not ha-kr >:(",
      1: "Http executor, real...",
      2: "Stop hacing..."
    }
    const userid = req.query.userid;
    const fs = require('fs')
    const user = JSON.parse(fs.readFileSync(`userid/${userid}.json`).toString())
    if (typeof userid === 'undefined') {
      return res.send(
        {
          'Status': "Username not provided",
        });
    }
    else if (user.hasOwnProperty("Whitelisted") && user["Whitelisted"] === "Yes") {
      return res.send(
        {
          'Status': "Whitelisted",
          'Username': userid,
          'WelcomeMessage': whitelistmessages[Math.floor(Math.random() * 3)],
        });
    }
    else if (user.hasOwnProperty("Whitelisted") && user["Whitelisted"] === "No") {
      return res.send(
        {
          'Status': "Blacklisted",
          'Username': userid,
          'KickMessage': blacklistmessages[Math.floor(Math.random() * 3)],
          'PCWallpaper': "obama.png",
          'OS': "*To confirm that you are not trying to dox a bled user goto pornhub.com and do the steps there*",
          'Ratted': "Has been ratted",
        });
    }
    else {
      return res.send(
        {
          'Status': "Not Whitelisted",
        });
    }
  }
  catch (error) {
    return res.send(
      {
        "Error": "stop lol"
      })
  }
});
app.get('/*', (req, res) => {
  res.status(404)
  res.sendFile(__dirname + "/404.html")
})
app.listen(3000, () => {
  console.log('Its actually working :)')
})