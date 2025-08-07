// Números de teste para validação de bandeiras de cartão
// ATENÇÃO: Estes são números de teste apenas para demonstração
// Não use números de cartão reais!

export const numerosTeste = {
    visa: [
        '4111111111111111',
        '4556454315728581',
        '4916592289993918'
    ],
    mastercard: [
        '5555555555554444',
        '5105105105105100',
        '5454545454545454'
    ],
    amex: [
        '378282246310005',
        '371449635398431',
        '343434343434343'
    ],
    elo: [
        '4011785978345612',
        '4389355478978934',
        '5041759834567890'
    ],
    hipercard: [
        '6062825624254001',
        '6062829999999992'
    ],
    dinersclub: [
        '30569309025904',
        '38520000023237',
        '36006666333344'
    ],
    discover: [
        '6011111111111117',
        '6011000990139424',
        '6011724094238406'
    ],
    enroute: [
        '201400000000009',
        '214900000000012'
    ],
    jcb: [
        '3530111333300000',
        '3566002020360505'
    ],
    voyager: [
        '869940697287073',
        '869912345678901'
    ],
    aura: [
        '5078601800000000',
        '5078602345678901'
    ]
};

// Função para obter um número aleatório de uma bandeira específica
export function obterNumeroTeste(bandeira) {
    const numeros = numerosTeste[bandeira.toLowerCase()];
    if (!numeros) return null;
    return numeros[Math.floor(Math.random() * numeros.length)];
}

// Função para obter todos os números de teste
export function obterTodosNumerosTeste() {
    const todos = [];
    Object.entries(numerosTeste).forEach(([bandeira, numeros]) => {
        numeros.forEach(numero => {
            todos.push({
                bandeira: bandeira.charAt(0).toUpperCase() + bandeira.slice(1),
                numero: numero
            });
        });
    });
    return todos;
}
