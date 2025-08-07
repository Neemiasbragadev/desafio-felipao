// Dados dos módulos
const modulesData = {
    'heroi': {
        title: '🦸 Sistema de Heróis',
        description: 'Sistema de criação de heróis com classes e tipos diferentes',
        features: [
            'Criação de heróis com nome, idade e tipo',
            'Sistema de ataques baseado no tipo do herói',
            '4 tipos disponíveis: Mago, Guerreiro, Monge, Ninja',
            'Demonstração de programação orientada a objetos'
        ],
        technologies: ['Classes', 'Construtores', 'Métodos', 'Switch Case'],
        command: 'npm run heroi',
        file: 'Escolhendo_Heroi.js',
        example: `
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
            // ...
        }
        return \`O \${this.tipo} \${this.nome} atacou usando \${ataque}\`;
    }
}`
    },
    'rank-xp': {
        title: '📊 Ranking por XP',
        description: 'Sistema de classificação baseado em experiência',
        features: [
            'Classificação automática por níveis de XP',
            '10 níveis diferentes (Ferro a Radiante)',
            'Sistema de progressão de heróis',
            'Lógica condicional complexa'
        ],
        technologies: ['Condicionais', 'If/Else', 'Lógica de Negócio'],
        command: 'npm run rank-xp',
        file: 'Rank_Por_XP.js',
        example: `
function classificarHeroi(xp) {
    if (xp < 1000) {
        return "Ferro";
    } else if (xp <= 2000) {
        return "Bronze";
    } else if (xp <= 5000) {
        return "Prata";
    }
    // ... mais níveis
}`
    },
    'rank-partidas': {
        title: '🏆 Ranking por Partidas',
        description: 'Sistema de classificação por vitórias e derrotas',
        features: [
            'Cálculo de saldo de vitórias (vitórias - derrotas)',
            'Classificação baseada em número de vitórias',
            '8 níveis de classificação',
            'Operações matemáticas complexas'
        ],
        technologies: ['Operações Matemáticas', 'Cálculos', 'Rankings'],
        command: 'npm run rank-partidas',
        file: 'Rank_Por_Partidas.js',
        example: `
function calcularSaldoENivel(vitorias, derrotas) {
    let saldoVitorias = vitorias - derrotas;
    let nivel;
    
    if (vitorias < 10) {
        nivel = 'Ferro';
    } else if (vitorias >= 11 && vitorias <= 20) {
        nivel = 'Bronze';
    }
    // ... mais níveis
    
    return { saldo: saldoVitorias, nivel: nivel };
}`
    },
    'sistema-completo': {
        title: '🎯 Sistema Completo',
        description: 'Integração de múltiplas funcionalidades',
        features: [
            'Combinação dos sistemas de XP e partidas',
            'Interface interativa para múltiplas consultas',
            'Loop de execução contínua',
            'Validação de entrada robusta'
        ],
        technologies: ['Integração', 'Loops', 'Validação', 'Interface'],
        command: 'npm run sistema-completo',
        file: 'SistemaRank_Por_escolha.js',
        example: `
let continuarConsulta = true;

while (continuarConsulta) {
    let nomeHeroi = ler.question('Digite o nome do heroi: ');
    let xpHeroi = ler.questionInt('Digite a XP: ');
    let vitorias = ler.questionInt('Digite as vitórias: ');
    let derrotas = ler.questionInt('Digite as derrotas: ');
    
    // Processamento dos dados...
    
    let continuar = ler.question('Deseja continuar? (s/n): ');
    continuarConsulta = continuar.toLowerCase() === 's';
}`
    },
    'validador': {
        title: '💳 Validador de Bandeiras',
        description: 'Sistema avançado de validação de cartões de crédito',
        features: [
            'Suporte a 11 bandeiras diferentes',
            'Algoritmo de Luhn para validação matemática',
            'Verificação de prefixos e formatos específicos',
            'Sistema de mascaramento para segurança',
            'Interface interativa com múltiplas opções'
        ],
        technologies: ['Algoritmos', 'Regex', 'Validação', 'Segurança'],
        command: 'npm run validador',
        file: 'ValidadorBandeiras.js',
        example: `
// Algoritmo de Luhn para validação
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
}`,
        supportedBrands: [
            'Visa', 'Mastercard', 'American Express', 'Elo', 
            'Hipercard', 'Diners Club', 'Discover', 'enRoute', 
            'JCB', 'Voyager', 'Aura'
        ]
    }
};

// Funções de navegação
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Atualizar navegação ativa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
    }
}

// Modal de detalhes dos módulos
function openModuleDetails(moduleKey) {
    const module = modulesData[moduleKey];
    if (!module) return;

    const modal = document.getElementById('moduleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = module.title;
    
    let supportedBrandsHtml = '';
    if (module.supportedBrands) {
        supportedBrandsHtml = `
            <div class="module-detail-section">
                <h4>🏦 Bandeiras Suportadas</h4>
                <div class="brand-list">
                    ${module.supportedBrands.map(brand => `<span class="brand-tag">${brand}</span>`).join('')}
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="module-details">
            <div class="module-detail-section">
                <h4>📋 Descrição</h4>
                <p>${module.description}</p>
            </div>

            <div class="module-detail-section">
                <h4>✨ Funcionalidades</h4>
                <ul>
                    ${module.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="module-detail-section">
                <h4>🛠️ Tecnologias</h4>
                <div class="tech-tags">
                    ${module.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            ${supportedBrandsHtml}

            <div class="module-detail-section">
                <h4>💻 Exemplo de Código</h4>
                <div class="code-example">
                    <pre><code>${module.example}</code></pre>
                </div>
            </div>

            <div class="module-detail-section">
                <h4>🚀 Como Executar</h4>
                <div class="execution-commands">
                    <div class="command-box">
                        <code>${module.command}</code>
                        <button onclick="copyCommand('${module.command}')" class="copy-btn">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <p class="execution-note">
                        <i class="fas fa-info-circle"></i>
                        Execute este comando no terminal na raiz do projeto
                    </p>
                </div>
            </div>

            <div class="module-actions-modal">
                <button class="btn btn-primary" onclick="runModule('${moduleKey}')">
                    <i class="fas fa-play"></i> Executar Módulo
                </button>
                <button class="btn btn-secondary" onclick="copyCommand('${module.command}')">
                    <i class="fas fa-copy"></i> Copiar Comando
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('moduleModal').classList.remove('active');
}

// Executar módulo (simula execução - na prática o usuário usaria o terminal)
function runModule(moduleKey) {
    const module = modulesData[moduleKey];
    if (!module) return;

    // Mostrar notificação
    showNotification(`Para executar o módulo "${module.title}", use o comando: ${module.command}`, 'info');
    
    // Fechar modal
    closeModal();
    
    // Rolar para seção do terminal
    scrollToSection('terminal');
}

// Copiar comando para clipboard
function copyCommand(command) {
    navigator.clipboard.writeText(command).then(() => {
        showNotification(`Comando "${command}" copiado para a área de transferência!`, 'success');
    }).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = command;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification(`Comando "${command}" copiado!`, 'success');
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Auto-remove após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar listeners para links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Fechar modal ao clicar fora
    document.getElementById('moduleModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Adicionar animações aos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards de módulos
    document.querySelectorAll('.module-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observar cards de documentação
    document.querySelectorAll('.doc-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Atualizar navegação baseada no scroll
window.addEventListener('scroll', function() {
    const sections = ['home', 'modules', 'docs', 'terminal'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// CSS adicional para notificações e modal (será injetado)
const additionalCSS = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1001;
    min-width: 300px;
    animation: slideIn 0.3s ease;
}

.notification-success {
    border-left: 4px solid var(--success-color);
}

.notification-info {
    border-left: 4px solid var(--primary-color);
}

.notification-error {
    border-left: 4px solid var(--error-color);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--gray-600);
    padding: 0.25rem;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.module-details {
    line-height: 1.6;
}

.module-detail-section {
    margin-bottom: 2rem;
}

.module-detail-section h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.module-detail-section ul {
    padding-left: 1.5rem;
}

.module-detail-section li {
    margin-bottom: 0.5rem;
    color: var(--gray-700);
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.brand-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.brand-tag {
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.code-example {
    background: var(--gray-900);
    color: var(--gray-300);
    border-radius: 8px;
    overflow: hidden;
}

.code-example pre {
    padding: 1.5rem;
    margin: 0;
    font-family: 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
}

.execution-commands {
    background: var(--gray-100);
    padding: 1.5rem;
    border-radius: 8px;
}

.command-box {
    display: flex;
    align-items: center;
    background: var(--gray-900);
    color: var(--accent-color);
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-family: 'Consolas', monospace;
}

.command-box code {
    flex: 1;
    font-size: 1rem;
}

.copy-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 1rem;
}

.execution-note {
    color: var(--gray-600);
    font-size: 0.9rem;
    margin: 0;
}

.module-actions-modal {
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--gray-200);
}
`;

// Injetar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
