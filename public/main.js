var socket = io()

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
      <div class="message" >
        <strong>${message.nickname}:</strong>
        <p>${message.text}</p>

        <p>${message.archivo}</p>


        
      </div>
      `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
        archivo: document.getElementById("archivo").value


        //archivo: document.getElementById("archivo").files[0].name
    };

    document.getElementById('nickname').style.display = 'none';
    document.getElementById('archivo').value = "";
    document.getElementById('text').value = "";

    socket.emit('add-message', message);

    return false;
}