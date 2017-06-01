var saveButton = document.getElementById("save"),
    textArea = document.getElementById("text"),
    charRemaining = document.getElementById("charRemaining");

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
    socket.emit('sendText', {content: input});
}