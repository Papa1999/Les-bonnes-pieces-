// // Récupération des données 
// let pieces= window.localStorage.getItem("pieces")

    // Importation de nos données Json
    const reponse= await fetch("pieces-autos.json")
    const pieces= await reponse.json()


    // Stockage dans le localStorage
    // const valeurPieces= JSON.stringify(pieces)
    // window.localStorage.setItem("pieces", valeurPieces)
// }else{
//     pieces= JSON.parse(pieces)
// }



// Importation de fonctions 
import { ajoutListenerAvis, ajouterListenerEnvoyerAvis } from "./avis.js"


// Appel de la fonction ajouterListenerEnvoyerAvis
ajouterListenerEnvoyerAvis()


/*Création d'une fonction qui va ajouter tous les éléments à la page web*/
function addToPage(list){
    for(let i=0; i<list.length; i++){

        const imageArticle= document.createElement("img")
        imageArticle.src=list[i].image
    
        const nomArticle= document.createElement("h2")
        nomArticle.innerText= list[i].nom 
    
        const prixArticle= document.createElement("p")
        prixArticle.innerText= `Prix: ${list[i].prix} € (${list[i].prix <35 ? "€": "€€€"})`
    
        const categorieArticle= document.createElement("p")
        categorieArticle.innerText= list[i].categorie 
    
        const descriptionArticle= document.createElement("p")
        descriptionArticle.innerText= list[i].description ?? "Pas de description pour le moment"
    
        const boutonAvis= document.createElement("button")
        boutonAvis.dataset.id= list[i].id 
        boutonAvis.innerText= "Afficher les avis"
    
        const box= document.querySelector(".fiches")
        const ItemBox= document.createElement("div")
    
        ItemBox.appendChild(imageArticle)
        ItemBox.appendChild(nomArticle)
        ItemBox.appendChild(prixArticle)
        ItemBox.appendChild(categorieArticle)
        ItemBox.appendChild(descriptionArticle)
        ItemBox.appendChild(boutonAvis)
    
    
        box.appendChild(ItemBox)
    }

    ajoutListenerAvis()
}


/*Appel de la fonction addToPage pour rajouter tous les éléments */

addToPage(pieces)




                /* Triage et filtrage*/

// Triage par prix croissant 
const btnCroissant= document.querySelector(".trier-croissant")

btnCroissant.addEventListener("click", ()=>{

    const listeCroissant= Array.from(pieces)
    listeCroissant.sort((a, b) => a.prix -b.prix)

    // Mise à jour du contenu de la section fiche
    document.querySelector(".fiches").innerHTML=""
    addToPage(listeCroissant)
    
})


// Triage par prix décroissant 
const btnDecroissant= document.querySelector(".trier-decroissant")

btnDecroissant.addEventListener("click", ()=>{

    const listeDecroissant= Array.from(pieces)
    listeDecroissant.sort((a, b) => b.prix-a.prix)
    
    // Mise à jour du contenu de la section fiche
    document.querySelector(".fiches").innerHTML=""
    addToPage(listeDecroissant)
} )


// Filtrage des articles avec des prix élevés
const filtrerAbdordable= document.querySelector(".filtrer-abordable")

filtrerAbdordable.addEventListener("click", () => {
    const listeFiltrerAbordable= pieces.filter((piece) => piece.prix <=35)

    // Mise à jour du contenu de la section fiche
    document.querySelector(".fiches").innerHTML=""
    addToPage(listeFiltrerAbordable)
})


// Filtrage des articles sans description
const filtrerDescription= document.querySelector(".filtrer-description")

filtrerDescription.addEventListener("click", () => {
    const listeFiltrerDescription= pieces.filter((piece) => piece.description)
    
    // Mise à jour de la section fiche
    document.querySelector(".fiches").innerHTML=""
    addToPage(listeFiltrerDescription)
})


// Filtrage des pieces affichées en fonction du prix maximum
const rangeFilter= document.getElementById("prix")

rangeFilter.addEventListener("input", () => {
    const listeRangeFilter= pieces.filter(piece => piece.prix <= rangeFilter.value)

    // Mise à jour du contenu de la section fiche
    document.querySelector(".fiches").innerHTML=""
    addToPage(listeRangeFilter)
})



            /*Affichage de deux listes */
// Affichage d'une déscription des pieces disponibles
const nompiecesDipo= pieces.map(piece => piece.nom)

for(let i =pieces.length-1 ; i>=0; i--){
    if(pieces[i].disponibilité === "Non"){
        nompiecesDipo.splice(i, 1)
    }
}

const listePiecesDispo= document.createElement("ul")

for(let i=0; i<nompiecesDipo.length; i++){
    let listItem= document.createElement("li")
    listItem.innerText= `${nompiecesDipo[i]} - ${pieces[i].prix} € `
    listePiecesDispo.appendChild(listItem)
}

document.querySelector(".pieces_disponibles").appendChild(listePiecesDispo)

// Affichage d'une description des pieces abordables
const nompiecesAbord= pieces.map(piece => piece.nom)

for(let i =pieces.length-1 ; i>=0; i--){
    if(pieces[i].prix >= 35){
        nompiecesAbord.splice(i, 1)
    }
}

const listePiecesAbord= document.createElement("ul")

for(let i=0; i<nompiecesAbord.length; i++){
    let listItem= document.createElement("li")
    listItem.innerText= nompiecesAbord[i]
    listePiecesAbord.appendChild(listItem)
}

document.querySelector(".pieces_abordables").appendChild(listePiecesAbord)

// Mise à jour des pieces
let buttonMAJ= document.querySelector(".btn-maj")
buttonMAJ.addEventListener("click", ()=>{
    window.localStorage.removeItem("pieces")
})

