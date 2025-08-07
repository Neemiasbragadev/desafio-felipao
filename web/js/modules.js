// Módulos do Desafio Felipão - Versão Web
// Implementação dos sistemas para funcionar na interface web

// ================================
// MÓDULO 1: SISTEMA DE HERÓIS
// ================================

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
            default:
                ataque = "ataque básico";
        }
        return `O ${this.tipo} ${this.nome} atacou usando ${ataque}`;
    }
}

// ================================
// MÓDULO 2: RANKING POR XP
// ================================

function classificarHeroiPorXP(xp) {
    let nivel;
    
    if (xp < 1000) {
        nivel = "Ferro";
    } else if (xp >= 1001 && xp <= 2000) {
        nivel = "Bronze";
    } else if (xp >= 2001 && xp <= 5000) {
        nivel = "Prata";
    } else if (xp >= 5001 && xp <= 7000) {
        nivel = "Ouro";
    } else if (xp >= 7001 && xp <= 8000) {
        nivel = "Platina";
    } else if (xp >= 8001 && xp <= 9000) {
        nivel = "Ascendente";
    } else if (xp >= 9001 && xp <= 10000) {
        nivel = "Imortal";
    } else if (xp >= 10001) {
        nivel = "Radiante";
    }
    
    return nivel;
}

// ================================
// MÓDULO 3: RANKING POR PARTIDAS
// ================================

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
    } else if (vitorias >= 101) {
        nivel = 'Imortal';
    }

    return { saldo: saldoVitorias, nivel: nivel };
}

// ================================
// MÓDULO 4: VALIDADOR DE BANDEIRAS
// ================================

class ValidadorBandeirasWeb {
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

    limparNumero(numero) {
        return numero.replace(/\D/g, '');
    }

    validarLuhn(numero) {
        const numeroLimpo = this.limparNumero(numero);
        let soma = 0;
        let alternar = false;

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

    identificarBandeira(numero) {
        const numeroLimpo = this.limparNumero(numero);

        for (const [chave, bandeira] of Object.entries(this.bandeiras)) {
            if (!bandeira.tamanhos.includes(numeroLimpo.length)) {
                continue;
            }

            if (bandeira.regex.test(numeroLimpo)) {
                return bandeira;
            }

            for (const prefixo of bandeira.prefixos) {
                if (numeroLimpo.startsWith(prefixo)) {
                    return bandeira;
                }
            }
        }

        return null;
    }

    validarCartao(numero) {
        const numeroLimpo = this.limparNumero(numero);
        
        if (numeroLimpo.length < 13 || numeroLimpo.length > 19) {
            return {
                valido: false,
                motivo: 'Número de cartão deve ter entre 13 e 19 dígitos',
                bandeira: null,
                numero: numeroLimpo
            };
        }

        const luhnValido = this.validarLuhn(numeroLimpo);
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

    mascararNumero(numero) {
        const numeroLimpo = this.limparNumero(numero);
        if (numeroLimpo.length < 4) return numeroLimpo;
        
        const primeiros4 = numeroLimpo.slice(0, 4);
        const ultimos4 = numeroLimpo.slice(-4);
        const meio = '*'.repeat(numeroLimpo.length - 8);
        
        return `${primeiros4}${meio}${ultimos4}`;
    }
}

// ================================
// GERENCIADOR DE MÓDULOS WEB
// ================================

class DesafioFelipaoWeb {
    constructor() {
        this.validador = new ValidadorBandeirasWeb();
        this.historico = [];
    }

    // Executar módulo de heróis
    executarModuloHeroi(nome, idade, tipo) {
        try {
            const heroi = new Heroi(nome, parseInt(idade), tipo.toLowerCase());
            const resultado = heroi.atacar();
            
            const dadosHeroi = {
                nome: heroi.nome,
                idade: heroi.idade,
                tipo: heroi.tipo,
                ataque: resultado,
                timestamp: new Date().toLocaleString()
            };

            this.adicionarHistorico('heroi', dadosHeroi);
            return { sucesso: true, resultado: dadosHeroi };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Executar módulo de ranking por XP
    executarModuloRankXP(nome, xp) {
        try {
            const nivel = classificarHeroiPorXP(parseInt(xp));
            
            const resultado = {
                nome: nome,
                xp: parseInt(xp),
                nivel: nivel,
                timestamp: new Date().toLocaleString()
            };

            this.adicionarHistorico('rank-xp', resultado);
            return { sucesso: true, resultado: resultado };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Executar módulo de ranking por partidas
    executarModuloRankPartidas(nome, vitorias, derrotas) {
        try {
            const dadosRanking = calcularSaldoENivel(parseInt(vitorias), parseInt(derrotas));
            
            const resultado = {
                nome: nome,
                vitorias: parseInt(vitorias),
                derrotas: parseInt(derrotas),
                saldo: dadosRanking.saldo,
                nivel: dadosRanking.nivel,
                timestamp: new Date().toLocaleString()
            };

            this.adicionarHistorico('rank-partidas', resultado);
            return { sucesso: true, resultado: resultado };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Executar módulo completo (combinado)
    executarModuloCompleto(nome, idade, tipo, xp, vitorias, derrotas) {
        try {
            const resultadoHeroi = this.executarModuloHeroi(nome, idade, tipo);
            const resultadoXP = this.executarModuloRankXP(nome, xp);
            const resultadoPartidas = this.executarModuloRankPartidas(nome, vitorias, derrotas);

            if (resultadoHeroi.sucesso && resultadoXP.sucesso && resultadoPartidas.sucesso) {
                const resultado = {
                    heroi: resultadoHeroi.resultado,
                    rankingXP: resultadoXP.resultado,
                    rankingPartidas: resultadoPartidas.resultado,
                    timestamp: new Date().toLocaleString()
                };

                this.adicionarHistorico('sistema-completo', resultado);
                return { sucesso: true, resultado: resultado };
            } else {
                return { sucesso: false, erro: 'Erro ao processar alguns módulos' };
            }
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Executar validador de bandeiras
    executarModuloValidador(numeroCartao) {
        try {
            const resultado = this.validador.validarCartao(numeroCartao);
            resultado.numeroMascarado = this.validador.mascararNumero(numeroCartao);
            resultado.timestamp = new Date().toLocaleString();

            this.adicionarHistorico('validador', resultado);
            return { sucesso: true, resultado: resultado };
        } catch (error) {
            return { sucesso: false, erro: error.message };
        }
    }

    // Gerenciar histórico
    adicionarHistorico(modulo, dados) {
        this.historico.unshift({
            modulo: modulo,
            dados: dados,
            id: Date.now()
        });

        // Manter apenas os últimos 50 registros
        if (this.historico.length > 50) {
            this.historico = this.historico.slice(0, 50);
        }

        // Salvar no localStorage se disponível
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('desafio-felipao-historico', JSON.stringify(this.historico));
        }
    }

    obterHistorico() {
        return this.historico;
    }

    limparHistorico() {
        this.historico = [];
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('desafio-felipao-historico');
        }
    }

    // Carregar histórico do localStorage
    carregarHistorico() {
        if (typeof localStorage !== 'undefined') {
            const historicoSalvo = localStorage.getItem('desafio-felipao-historico');
            if (historicoSalvo) {
                try {
                    this.historico = JSON.parse(historicoSalvo);
                } catch (error) {
                    console.error('Erro ao carregar histórico:', error);
                    this.historico = [];
                }
            }
        }
    }
}

// Instância global para uso na interface web
window.desafioFelipao = new DesafioFelipaoWeb();

// Carregar histórico ao inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.desafioFelipao.carregarHistorico();
});

// Exportar para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Heroi,
        classificarHeroiPorXP,
        calcularSaldoENivel,
        ValidadorBandeirasWeb,
        DesafioFelipaoWeb
    };
}
