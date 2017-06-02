var saveButton = document.getElementById("save"),
    textArea = document.getElementById("text"),
    charRemaining = document.getElementById("charsRemaining");

saveButton.addEventListener("click", function () {
    console.log(textArea.value);
    var txt = textArea.value;

    sendToServer(txt);
    window.open('/test.txt');
});

textArea.addEventListener('keyup', function(){
   var chars = $("#text").val().length;
    charRemaining.innerHTML = 50 - chars;
    if(chars > 50){
        textArea.style.color = 'red';
        textArea.style.fontSize = '1.2em';
    }
    else {
        textArea.style.color = 'black';
        textArea.style.fontSize = '1em';}
    //jquery jest git
});

function sendToServer(input) {
    socket.emit('sendText', {content: input});
}