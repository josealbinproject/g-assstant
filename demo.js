// using action console google assistant

// Imports dependencies and set up http server
const { default: Axios } = require('axios');
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'));

app.post('/webhook',function(req, res) {
	console.log('recived a post request');
	if(!req.body) return res.sendstatus(400);
	res.setHeader('Content-Type', 'application/json');
	console.log('here is the post request from google assistant');
	console.log(req.body);
	console.log('got  parameter from google assistant '+ req.body.session.params['EmployeeName']);
    var name = req.body.session.params['EmployeeName'];
    var scene = req.body.scene.name

    Axios.get(`http://omdbapi.com?t=${name}&apikey=${apikey}`)
      .then(result => {
        console.log(result.data.Year);
        let responseObj ={
            "prompt": {
                "override": false,
                "firstSimple": {
                  "speech": `this is from webhook. ${result.data.Year}`,
                  "text": "this is from webhook."
                }
            }
            /*,
            "scene": {
              "name": scene,
              "slots": {},
              "next": {
                "name": "actions.scene.END_CONVERSATION"
              }
            }*/
        }
        result = "";
	console.log('here is the reponse to google assistant');
    console.log(responseObj);
    return res.json(responseObj);
      })
      .catch(error => {
        console.error(error);
        let responseObj ={
            "prompt": {
                "override": false,
                "firstSimple": {
                  "speech": `this is from webhook.${error}`,
                  "text": "this is from webhook."
                }
            },
            "scene": {
              "name": scene,
              "slots": {},
              "next": {
                "name": "actions.scene.END_CONVERSATION"
              }
            }
        }
	console.log('here is the reponse to google assistant');
    console.log(responseObj);
    return res.json(responseObj);
      });
		
    

});



/********************************************* */