import ler from 'readline-sync';

class ValidadorBandeiras {
    constructor() {
        this.bandeiras = {
            visa: {
                nome: 'Visa',
                prefixos: ['4'],
                tamanhos: [13, 16, 19],
                regex: /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/
            },
            mastercard: {
                nome: 'Mastercard',
                prefixos: ['51', '52', '53', '54', '55'],
                tamanhos: [16],
                regex: /^5[1-5][0-9]{14}$/
            },
            amex: {
                nome: 'American Express',
                prefixos: ['34', '37'],
                tamanhos: [15],
                regex: /^3[47][0-9]{13}$/
            },
            elo: {
                nome: 'Elo',
                prefixos: ['401178', '401179', '431274', '438935', '451416', '457393', '457631', '457632', '504175', '627780', '636297', '636368'],
                tamanhos: [16],
                regex: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/
            },
            hipercard: {
                nome: 'Hipercard',
                prefixos: ['606282'],
                tamanhos: [13, 16, 19],
                regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/
            },
            dinersclub: {
                nome: 'Diners Club',
                prefixos: ['300', '301', '302', '303', '304', '305', '36', '38'],
                tamanhos: [14],
                regex: /^3[0-5][0-9]{12}$|^36[0-9]{12}$|^38[0-9]{12}$/
            },
            discover: {
                nome: 'Discover',
                prefixos: ['6011', '622126', '622127', '622128', '622129', '62213', '62214', '62215', '62216', '62217', '62218', '62219', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '64', '65'],
                tamanhos: [16, 19],
                regex: /^6(?:011|5[0-9]{2}|4[4-9][0-9]|22[1-9][0-9])[0-9]{12}$/
            },
            enroute: {
                nome: 'enRoute',
                prefixos: ['2014', '2149'],
                tamanhos: [15],
                regex: /^(2014|2149)[0-9]{11}$/
            },
            jcb: {
                nome: 'JCB',
                prefixos: ['3528', '3529', '353', '354', '355', '356', '357', '358'],
                tamanhos: [16],
                regex: /^(?:2131|1800|35\d{3})\d{11}$/
            },
            voyager: {
                nome: 'Voyager',
                prefixos: ['8699'],
                tamanhos: [15],
                regex: /^8699[0-9]{11}$/
            },
            aura: {
                nome: 'Aura',
                prefixos: ['507860'],
                tamanhos: [16],
                regex: /^507860[0-9]{10}$/
            }
        };
    }

    // Remove espaços, hífens e outros caracteres não numéricos
    limparNumero(numero) {
        return numero.replace(/\D/g, '');
    }

    // Algoritmo de Luhn para validar se o número do cartão é válido
    validarLuhn(numero) {
        const numeroLimpo = this.limparNumero(numero);
        let soma = 0;
        let alternar = false;

        // Percorre o número de trás para frente
        for (let i = numeroLimpo.length - 1; i >= 0; i--) {
            let digito = parseInt(numeroLimpo.charAt(i));

            if (alternar) {
                digito *= 2;
                if (digito > 9) {
                    digito = (digito % 10) + 1;
                }
            }

            soma += digito;
            alternar = !alternar;
        }

        return (soma % 10) === 0;
    }

    // Identifica a bandeira do cartão
    identificarBandeira(numero) {
        const numeroLimpo = this.limparNumero(numero);

        for (const [chave, bandeira] of Object.entries(this.bandeiras)) {
            // Verifica se o tamanho está correto
            if (!bandeira.tamanhos.includes(numeroLimpo.length)) {
                continue;
            }

            // Verifica se corresponde ao regex da bandeira
            if (bandeira.regex.test(numeroLimpo)) {
                return bandeira;
            }

            // Verificação adicional por prefixos
            for (const prefixo of bandeira.prefixos) {
                if (numeroLimpo.startsWith(prefixo)) {
                    return bandeira;
                }
            }
        }

        return null;
    }

    // Função principal de validação
    validarCartao(numero) {
        const numeroLimpo = this.limparNumero(numero);
        
        // Validações básicas
        if (numeroLimpo.length < 13 || numeroLimpo.length > 19) {
            return {
                valido: false,
                motivo: 'Número de cartão deve ter entre 13 e 19 dígitos',
                bandeira: null
            };
        }

        // Validar usando algoritmo de Luhn
        const luhnValido = this.validarLuhn(numeroLimpo);
        
        // Identificar bandeira
        const bandeira = this.identificarBandeira(numeroLimpo);

        return {
            valido: luhnValido && bandeira !== null,
            numero: numeroLimpo,
            bandeira: bandeira ? bandeira.nome : 'Desconhecida',
            luhnValido: luhnValido,
            motivo: !luhnValido ? 'Número inválido (falha no algoritmo de Luhn)' : 
                   !bandeira ? 'Bandeira não reconhecida' : 'Cartão válido'
        };
    }

    // Mascarar número do cartão para exibição
    mascararNumero(numero) {
        const numeroLimpo = this.limparNumero(numero);
        if (numeroLimpo.length < 4) return numeroLimpo;
        
        const primeiros4 = numeroLimpo.slice(0, 4);
        const ultimos4 = numeroLimpo.slice(-4);
        const meio = '*'.repeat(numeroLimpo.length - 8);
        
        return `${primeiros4}${meio}${ultimos4}`;
    }

    // Exibir resultado da validação
    exibirResultado(resultado) {
        console.log('\n' + '='.repeat(60));
        console.log('📋 RESULTADO DA VALIDAÇÃO');
        console.log('='.repeat(60));
        
        if (resultado.valido) {
            console.log('✅ Status: VÁLIDO');
            console.log(`💳 Bandeira: ${resultado.bandeira}`);
            console.log(`🔢 Número: ${this.mascararNumero(resultado.numero)}`);
        } else {
            console.log('❌ Status: INVÁLIDO');
            console.log(`📝 Motivo: ${resultado.motivo}`);
            if (resultado.bandeira && resultado.bandeira !== 'Desconhecida') {
                console.log(`💳 Bandeira detectada: ${resultado.bandeira}`);
            }
        }
        
        console.log(`🔍 Luhn: ${resultado.luhnValido ? 'Válido' : 'Inválido'}`);
        console.log('='.repeat(60));
    }

    // Função para testar números de exemplo
    testarExemplos() {
        const exemplos = [
            { numero: '4111111111111111', descricao: 'Visa teste' },
            { numero: '5555555555554444', descricao: 'Mastercard teste' },
            { numero: '378282246310005', descricao: 'American Express teste' },
            { numero: '6062825624254001', descricao: 'Hipercard teste' },
            { numero: '30569309025904', descricao: 'Diners Club teste' },
            { numero: '6011111111111117', descricao: 'Discover teste' },
            { numero: '201400000000009', descricao: 'enRoute teste' },
            { numero: '3530111333300000', descricao: 'JCB teste' },
            { numero: '869940697287073', descricao: 'Voyager teste' },
            { numero: '5078601800000000', descricao: 'Aura teste' },
            { numero: '1234567890123456', descricao: 'Número inválido' }
        ];

        console.log('\n🧪 TESTANDO NÚMEROS DE EXEMPLO:\n');
        
        exemplos.forEach((exemplo, index) => {
            console.log(`${index + 1}. ${exemplo.descricao}: ${exemplo.numero}`);
            const resultado = this.validarCartao(exemplo.numero);
            this.exibirResultado(resultado);
            console.log('\n');
        });
    }

    // Loop principal do programa
    executar() {
        console.log('='.repeat(70));
        console.log('💳 VALIDADOR DE BANDEIRAS DE CARTÃO DE CRÉDITO 💳');
        console.log('='.repeat(70));
        console.log('Bandeiras suportadas: Visa, Mastercard, American Express, Elo, Hipercard,');
        console.log('Diners Club, Discover, enRoute, JCB, Voyager, Aura');
        console.log('='.repeat(70));

        while (true) {
            console.log('\nOpções:');
            console.log('1. Validar um número de cartão');
            console.log('2. Testar números de exemplo');
            console.log('3. Sair');

            const opcao = ler.questionInt('\nEscolha uma opção (1-3): ');

            switch (opcao) {
                case 1:
                    const numero = ler.question('\n💳 Digite o número do cartão (pode conter espaços ou hífens): ');
                    if (numero.trim() === '') {
                        console.log('❌ Número não pode estar vazio!');
                        break;
                    }
                    
                    const resultado = this.validarCartao(numero);
                    this.exibirResultado(resultado);
                    break;

                case 2:
                    this.testarExemplos();
                    break;

                case 3:
                    console.log('\n👋 Obrigado por usar o Validador de Bandeiras!');
                    return;

                default:
                    console.log('❌ Opção inválida! Escolha entre 1 e 3.');
            }

            console.log('\n' + '-'.repeat(50));
        }
    }
}

// Executar o validador
const validador = new ValidadorBandeiras();
validador.executar();
