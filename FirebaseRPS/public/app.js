document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();

    const recordRef = db.collection('playerRecord');

    const query = recordRef.where('played', '>=', 0);
    query.get()
        .then(records => {
            records.forEach(doc => {
                console.log("got record");
                data = doc.data();
                // document.write(`${data.wins} - ${data.ties} - ${data.losses} <br>`);
                document.getElementById("recordHeader").innerHTML = `${data.wins} - ${data.ties} - ${data.losses}`;
            })
        })

    // console.log(app);
});

function playRock(){
    const computerChoice = Math.floor(Math.random()*3);
    determineWinner(0, computerChoice);
}

function playPaper(){
    const computerChoice = Math.floor(Math.random()*3);
    determineWinner(1, computerChoice);
}

function playScissors(){
    const computerChoice = Math.floor(Math.random()*3);
    determineWinner(2, computerChoice);
}

function determineWinner(playerChoice, cpuChoice){
    const recordRef = firebase.firestore().collection("playerRecord").doc("record");
    const newPlayed = recordRef.data().played + 1;

    if(playerChoice === cpuChoice){
        recordRef.update({
            played: newPlayed,
            ties: recordRef.data().ties + 1
        })
            .then(function(){
                console.log("Document successfully updated");
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            })
    }
}