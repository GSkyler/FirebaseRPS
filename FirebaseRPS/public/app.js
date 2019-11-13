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
                document.getElementById("recordHeader").innerHTML = `Record: ${data.wins} - ${data.ties} - ${data.losses}`;
            })
        });

    const pRecordRef = recordRef.doc("record");
    pRecordRef
        .onSnapshot(function (doc) {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            document.getElementById("recordHeader").innerHTML = `Record: ${doc.data().wins} - ${doc.data().ties} - ${doc.data().losses}`;
        });

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
    const db = firebase.firestore();
    const recordRef = db.collection("playerRecord").doc("record");
    recordRef.get().then(function(doc){
        if(doc.exists){
            if(playerChoice === cpuChoice){
                recordRef.update({
                    played: doc.data().played + 1,
                    ties: doc.data().ties + 1
                })
                    .then(function(){
                        console.log("Document successfully updated");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                document.getElementById("playResult").innerHTML = "You Tied";
            }
            else if(playerChoice-cpuChoice === 1 || playerChoice === 0 && cpuChoice === 2){
                recordRef.update({
                    played: doc.data().played + 1,
                    wins: doc.data().wins + 1
                })
                    .then(function(){
                        console.log("Document successfully updated");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                document.getElementById("playResult").innerHTML = "You Win";
            }
            else{
                recordRef.update({
                    played: doc.data().played + 1,
                    losses: doc.data().losses + 1
                })
                    .then(function(){
                        console.log("Document successfully updated");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                document.getElementById("playResult").innerHTML = "You Lose";
            }
        }
        else{
            console.log("No document found");
        }
    }).catch(function (error) {
        console.log("Error gettting document: ", error);
    });

}

// function updateRecord(){
//     const db = firebase.firestore();
//     const recrdRef = db.collection("playerRecord").doc("record");
//     recordRef.get().then(function(doc){
//         if(doc.exists){
//             document.getElementById("recordHeader").innerHTML = `${doc.data().wins} - ${doc.data().ties} - ${doc.data().losses}`;
//         }
//         else{
//             console.log("No document found");
//         }
//     }).catch(function (error) {
//         console.log("Error gettting document: ", error);
//     });
// }
