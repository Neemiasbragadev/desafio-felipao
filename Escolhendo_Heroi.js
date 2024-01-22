import ler from 'readline-sync';

class Heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
    }

    atacar() {
        let ataque;
        switch (this.tipo) {
            case "mago":
                ataque = "magia";
                break;
            case "guerreiro":
                ataque = "espada";
                break;
            case "monge":
                ataque = "artes marciais";
                break;
            case "ninja":
                ataque = "shuriken";
                break;
        }

        return `O ${this.tipo} ${this.nome} atacou usando ${ataque}`;
    }
}


let nomeHeroi = ler.question('Digite o nome do heroi: ');
let idade = ler.question('Digite a idade do heroi: ');
console.log("Agora escolha o tipo do Heroi \n"
+"1- mago \n"
+"2- guerreiro \n"
+"3- monge \n"
+"4- ninja \n"
);
let tipo = ler.question('Digite o tipo do heroi: ');



if(tipo == 1){
 tipo = "mago";
}else if(tipo == 2){
    tipo = "guerreiro"; 
}else if(tipo == 3){
    tipo = "monge"; 
}else if(tipo == 4){
    tipo = "ninja"; 
}else{
    tipo = "guerreiro";
   
}

let newHero = new Heroi(nomeHeroi,idade,tipo)

console.log(newHero.atacar());

