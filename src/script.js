var request = require('request');
var nodemailer = require('nodemailer');

var body_ = "";

var intervalID = setInterval(function peticion(){
    console.log("Entra en while")
    request('https://www.ticketea.com/organizers/elhormiguero/', function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        body = body.split("<!-- END Cards list -->");
        if(body[0] != body_){
            body_ = body[0];
    
            var transporter = nodemailer.createTransport('smtps://USUARIO_MAIL%40gmail.com:CONTRASEÑA@smtp.gmail.com');
      
            var mailOptions = {
                from: '"Pablo Motos" ',
                to: 'CORREO DE DESTINO', 
                subject: 'Entradas activas ✔',
                text: 'Hay nuevas entradas ', 
            };
      
            transporter.sendMail(mailOptions, function(error, info){
            if(error){
              return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            });
        }
        else{
            console.log("Nada nuevo");
        }  
    
    });

}, 5000);


