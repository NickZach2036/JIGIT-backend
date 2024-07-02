const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 5000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

//1
app.get('/text', (req, res) => {
    res.send('Test text');                                                      
 });
//2
app.get('/query', (req,res) =>{
    var param = req.query.param;
    res.send(param);
});
//3
app.get('/sum', (req, res) => {
   var num1= req.query.num1;
   var num2 = req.query.num2;
   res.send('Sum: ' + (parseInt(num1)+parseInt(num2)));                                                      
});
//5
app.post('/post',(req, res) => {
    res.send("Post sucess");
});
//5
app.post('/post-body',(req,res) =>  {
    console.log(req.body);
    res.send('Got the body');
})
//6
app.post('/',(req,res) => {
    const { num1, num2 } = req.body;
    res.send('Sum: ' + (parseInt(num1)+parseInt(num2)));
})
//7
app.get('/file', (req, res) => {
    res.sendFile(__dirname + '\\' +'index.html');                                                       
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});