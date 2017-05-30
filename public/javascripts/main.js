var saveButton = document.getElementById("save");
var textArea = document.getElementById("text");
var txt = "";

socket.on('receive', function (message) {
    console.log('otrzymano %s', message);
});

saveButton.addEventListener("click", function () {
    //1 send txt to node
    //2 create file.txt on server using nodejs fs
    //3 send to client, download file.txt

    console.log(textArea.value);
    txt = textArea.value;

    sendToServer(txt);
});

function sendToServer(input) {
    console.log('przesyłanie %s do serwera', input);
    socket.emit('sendText', {message: input});
}