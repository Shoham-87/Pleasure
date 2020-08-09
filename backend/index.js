const io=require('socket.io')(80);
const userlist={};
var names={};
let c=0;
io.on('connection',socket=>
{
    socket.on('new-user',name=>
    {
        userlist[socket.id]=name;
        names[c++]=name;
        socket.emit('user',names);
        socket.broadcast.emit('user-tag',name);
    })
    socket.on('send',msg=>
    {
        socket.broadcast.emit('receive',{content:msg,name:userlist[socket.id]});
    })
    socket.on('disconnect',msg=>
    {
        socket.broadcast.emit('leave',userlist[socket.id]);
    })
});