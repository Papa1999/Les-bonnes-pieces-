export function ajoutListenerAvis(){
    const piecesElements = document.querySelectorAll(".fiches div button")

    for(let i=0; i< piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function(event){

            // Envoie de requête pour la récupération des avis en fonction de la piece
            const id= event.target.dataset.id
            const reponse= await fetch("db.json")
            

            // Récupération des données envoyé par le serveur 
            const avis= await reponse.json()
            const lesAvis= avis.avis
            console.log(lesAvis)

            const parentElem= event.target.parentElement
            const paragrapheAvis= document.createElement("p")

            for(let i=0; i<lesAvis.length; i++){
                const objetAvis= lesAvis[i]
                 if( objetAvis.pieceId=== i+1 ){
                    paragrapheAvis.innerHTML+= `${objetAvis.utilisateur}: ${objetAvis.commentaire} </br> `
                 }    
            }
            parentElem.appendChild(paragrapheAvis)  

            // Desactivation du boutton afficher les avis
            event.target.disabled= true
        })
    }
    
}


export function ajouterListenerEnvoyerAvis(){

    const formulaire= document.querySelector(".formulaire-avis")

    formulaire.addEventListener("submit", function(event) {
        event.preventDefault()

        const avis= {
            nombreEtoile:parseInt(event.target.querySelector("[name=nbr_etoile]").value), 
            pieceId:parseInt(event.target.querySelector("[name=piece-id]").value), 
            utilisateur: event.target.querySelector("[name=utilisateur]").value, 
            commentaire:event.target.querySelector("[name=commentaire]").value
        }


        const charge_utile= JSON.stringify(avis)

        // fetch("http://localhost:8081/avis", {
        //     method: "Post",
        //     headers: {"Content-type" : "application/json"},
        //     body: charge_utile
        // })
    })
    
}