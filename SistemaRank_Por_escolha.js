import ler from 'readline-sync';

// Loop principal para permitir consultas múltiplas



let continuarConsulta = true;

while (continuarConsulta) {
    
    let nomeHeroi = ler.question('Digite o nome do heroi: ');
    let xpHeroi = ler.questionInt('Digite a quantidade de experiencia (XP) do heroi: ');

    let vitorias = ler.questionInt(`Digite a quantidade de Vitorias do ${nomeHeroi}: `);

    let derrotas = ler.questionInt(`Digite a quantidade de Derrotas do ${nomeHeroi}: `);

    
   
    function calcularSaldoENivel(vitorias, derrotas) {
        let saldoVitorias = vitorias - derrotas;
        let nivel;
    
        if (vitorias < 10) {
            nivel = 'Ferro';
        } else if (vitorias >= 11 && vitorias <= 20) {
            nivel = 'Bronze';
        } else if (vitorias >= 21 && vitorias <= 50) {
            nivel = 'Prata';
        } else if (vitorias >= 51 && vitorias <= 80) {
            nivel = 'Ouro';
        } else if (vitorias >= 81 && vitorias <= 90) {
            nivel = 'Diamante';
        } else if (vitorias >= 91 && vitorias <= 100) {
            nivel = 'Lendário';
        } else {
            nivel = 'Imortal';
        }
    
        return { saldoVitorias, nivel };
    }

    

    function calcularXP(xpHeroi){
        let nivelHeroi;

        if (xpHeroi <= 1000) {
            nivelHeroi = 'Ferro';
        } else if (xpHeroi >= 1001 && xpHeroi <= 2000) {
            nivelHeroi = 'Bronze';
        } else if (xpHeroi >= 2001 && xpHeroi <= 5000) {
            nivelHeroi = 'Prata';
        } else if (xpHeroi >= 5001 && xpHeroi <= 7000) {
            nivelHeroi = 'Ouro';
        } else if (xpHeroi >= 7001 && xpHeroi <= 8000) {
            nivelHeroi = 'Platina';
        } else if (xpHeroi >= 8001 && xpHeroi <= 9000) {
            nivelHeroi = 'Ascendente';
        } else if (xpHeroi >= 9001 && xpHeroi <= 10000) {
            nivelHeroi = 'Imortal';
        } else {
            nivelHeroi = 'Radiante';
        }
    }

    // Exibir a mensagem com o nome do herói e seu nível

    let resultado = calcularSaldoENivel(vitorias, derrotas);
   

     console.log(`O Heroi de nome ${nomeHeroi} possui ${resultado.saldoVitorias} vitorias e seu rank é ${resultado.nivel}.`);

    // Perguntar ao usuário se deseja fazer outra consulta
    let opcao = ler.questionInt('Deseja fazer outra consulta? Digite 1 para sim, 0 para nao: ');

    // Atualizar a variável continuarConsulta com base na escolha do usuário
    if(opcao != 0 ){
        opcao = 1;
    }
    continuarConsulta = opcao === 1;
}

console.log('Programa encerrado.');