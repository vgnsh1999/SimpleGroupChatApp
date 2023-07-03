const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/login',(req,res,next)=>{
    res.send(`
    <form action="/login" method="POST" onsubmit="login(event)">
    <input type="text" name="username" id="username">
    <button type="submit">Login</button>
    </form>
    <script>
    function login(event){
        localStorage.setItem('username',event.target.username.value);
    }
    </script>
    `);
});

app.post('/login',(req,res,next)=>{
    console.log(req.body.username);
    //fs.writeFile('message.txt',`${req.body.username}:`,{flag:'a'},err=>console.log(err));
    res.redirect('/');
});

app.get('/',(req,res,next)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err);
            data = 'No messages yet'
        }
        res.send(`${data}
        <form action="/" method="POST" onsubmit="send(event)">
        <input type="text" name="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button>
        </form>
        <script>
        function send(event){
            localStorage.setItem('message',event.target.message.value);
            document.getElementById('username').value = localStorage.getItem('username');
        }
        </script>
        `);
    });
});

app.post('/',(req,res,next)=>{
    console.log(req.body.message);
    fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},err=>
    err ? console.log(err) : res.redirect('/'));
});


//Yash Bhaiya code but it didn't worked
// app.get('/login',(req,res,next)=>{
//     res.send(`
//     <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
// 	<input id="username" type="text" name"username">
// 	<button type="submit">Login</button>
//     </form>`);
// });

// app.get('/',(req,res,next)=>{
//     fs.readFile('message.txt',(err,data)=>{
//         if(err){
//             console.log(err);
//             data = 'No messages';
//         }
//         res.send(`
//         ${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
//         <input id="username" type="hidden" name"username">
//         <input id="message" type="text" name="message">
//         <button type="submit">Send</button>
//         </form>
//         `);
//     });
// });

// app.post('/',(req,res,next)=>{
//     fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'}, err=> 
//     err ? console.log(err) : res.redirect('/')
//     );
// });

app.listen(4000);