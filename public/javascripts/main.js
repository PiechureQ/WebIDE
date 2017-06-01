var saveButton = document.getElementById("save");
var textArea = document.getElementById("text");
var charRemaining = document.getElementById("charRemaining");

socket.on('receiveDownload', function (message) {
    console.log('zapisano w pliku %s', message);
});

saveButton.addEventListener("click", function () {
    console.log(textArea.value);
    var txt = textArea.value;

    sendToServer(txt);
});

textArea.addEventListener('keyup', function(){
    charRemaining.innerHTML = $("#text").val().length;
    //jquery jest git
});

function sendToServer(input) {
    console.log('przesyłanie %s do serwera', input);
    socket.emit('sendText', {content: input});
}