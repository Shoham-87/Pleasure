const socket=io('http://localhost');
const form=document.querySelector('#msg-box');
const msginput=document.querySelector('#msg-input');
const container=document.querySelector('#container');
const member=document.querySelector('#chatmember');
const name=prompt("Enter your Name","Guest");
let namepompt=name;
let chatting=(msg,pos)=>{
    msgelement=document.createElement('div');
    msgelement.innerHTML=msg;
    msgelement.classList.add('chat');
    msgelement.classList.add(pos);
    container.append(msgelement);
}
let joined=(username)=>{
    let newdiv=document.createElement('div');
    newdiv.classList.add('user-joined');
    newdiv.innerHTML=`<p>${username} Joined</p>`;
    container.append(newdiv);
}
let left=(username)=>{
    let newdiv=document.createElement('div');
    newdiv.classList.add('user-joined');
    newdiv.innerHTML=`<p>${username} left</p>`;
    container.append(newdiv);
}
let members=(username)=>{
    newuser=document.createElement('div');
    newuser.classList.add('member');
    newuser.innerHTML=`<img src="images/user.png" alt="User">
                            <h1>${username}</h1>`;
    member.append(newuser);
}
let memberslive=(username)=>{
    newuser=document.createElement('div');
    newuser.classList.add('member');
    newuser.innerHTML=`<img src="images/myuser.png" alt="User">
                            <h1>${username}</h1>`;
    member.append(newuser);
}
socket.emit('new-user',name);
socket.on('user',names=>
{
    console.log(names);
    for (const key in names) {
        if(names[key]!=null)
        {
        if(names[key] !=namepompt){
            members(names[key]);
            console.log(names[key],namepompt);
        }
        else
        memberslive(names[key]);
    }
    }
})

socket.on('user-tag',name=>{
    joined(name);
    members(name);
})
form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    msg=msginput.value;
    chatting(`You: ${msg}`,'right');
    socket.emit('send',msg);
    msginput.value="";
});
socket.on('receive',data=>
{
    console.log(data.name,data.content);
    chatting(`${data.name}: ${data.content}`,'left');
});
socket.on('leave',user=>
{
    if(user!=null)
    left(user);
})