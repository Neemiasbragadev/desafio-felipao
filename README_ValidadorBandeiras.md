# 💳 Validador de Bandeiras de Cartão de Crédito

## 📖 Visão Geral do Sistema

O **Validador de Bandeiras** é um dos 5 módulos que compõem o **Desafio Felipão**, uma coleção de sistemas interativos desenvolvidos em Node.js. Este módulo específico demonstra validação avançada de dados, algoritmos de verificação e práticas de segurança no tratamento de informações sensíveis.

### 🔗 Integração com o Sistema Principal

Este validador faz parte de um ecossistema maior que inclui:
- 🦸 **Sistema de Heróis**: Classes e objetos
- 📊 **Ranking por XP**: Lógica de classificação  
- 🏆 **Ranking por Partidas**: Cálculos matemáticos
- 🎯 **Sistema Completo**: Integração de funcionalidades
- 💳 **Validador de Bandeiras**: Validação e segurança (este módulo)

Todos os módulos podem ser acessados através do menu principal (`npm start`) ou executados individualmente.

## 🎯 Funcionalidades

Este validador identifica e valida números de cartão de crédito de **11 bandeiras diferentes**, usando o algoritmo de Luhn e verificação de prefixos específicos.

## 🏦 Bandeiras Suportadas

| Bandeira | Prefixos | Tamanho | Exemplo |
|----------|----------|---------|---------|
| **Visa** | 4 | 13, 16, 19 | 4111111111111111 |
| **Mastercard** | 51-55 | 16 | 5555555555554444 |
| **American Express** | 34, 37 | 15 | 378282246310005 |
| **Elo** | 401178, 438935, 504175, etc. | 16 | 4011785978345612 |
| **Hipercard** | 606282 | 13, 16, 19 | 6062825624254001 |
| **Diners Club** | 300-305, 36, 38 | 14 | 30569309025904 |
| **Discover** | 6011, 622126-622925, 64, 65 | 16, 19 | 6011111111111117 |
| **enRoute** | 2014, 2149 | 15 | 201400000000009 |
| **JCB** | 3528-3589 | 16 | 3530111333300000 |
| **Voyager** | 8699 | 15 | 869940697287073 |
| **Aura** | 507860 | 16 | 5078601800000000 |

## 🔍 Validações Realizadas

1. **Algoritmo de Luhn**: Verifica a validade matemática do número
2. **Verificação de Prefixo**: Confirma se o número inicia com prefixo válido da bandeira
3. **Validação de Tamanho**: Verifica se o número tem o tamanho correto
4. **Regex Específica**: Aplica padrões específicos para cada bandeira

## 🚀 Como Usar

### Pelo Menu Principal
```bash
npm start
# Escolher opção 5
```

### Diretamente
```bash
npm run validador
```

### Opções do Validador
1. **Validar número específico**: Digite um número para validação
2. **Testar exemplos**: Executa testes com números pré-definidos
3. **Sair**: Encerra o programa

## 🧪 Números de Teste

O validador inclui números de teste para todas as bandeiras. Estes são números válidos matematicamente (passam no algoritmo de Luhn) mas são apenas para demonstração.

## 🔒 Recursos de Segurança

- **Mascaramento**: Números são exibidos com asteriscos (4111****1111)
- **Limpeza**: Remove automaticamente espaços, hífens e outros caracteres
- **Validação Rigorosa**: Múltiplas camadas de verificação

## 📊 Exemplo de Saída

```
============================================================
📋 RESULTADO DA VALIDAÇÃO
============================================================
✅ Status: VÁLIDO
💳 Bandeira: Visa
🔢 Número: 4111********1111
🔍 Luhn: Válido
============================================================
```

## ⚠️ Aviso Importante

**NUNCA use números de cartão reais para teste!** 
Todos os números incluídos são para demonstração e não representam cartões válidos para transações.

## 🛠️ Tecnologias

- **Node.js**: Runtime JavaScript
- **ES6 Modules**: Import/Export
- **readline-sync**: Interface de linha de comando
- **Regex**: Validação de padrões
- **Algoritmo de Luhn**: Validação matemática

## 🎓 Conceitos Técnicos Demonstrados

### Algoritmos e Matemática
- **Algoritmo de Luhn**: Implementação do algoritmo de verificação de dígitos
- **Operações Modulares**: Uso de matemática modular para validação
- **Manipulação de Arrays**: Processamento de dígitos individuais

### Programação Orientada a Objetos
- **Classes**: Estruturação do código em classe ValidadorBandeiras
- **Métodos**: Separação de responsabilidades em métodos específicos
- **Encapsulamento**: Dados e funcionalidades organizados logicamente

### Validação e Segurança
- **Regex Patterns**: Padrões complexos para cada bandeira de cartão
- **Sanitização de Dados**: Limpeza e normalização de entrada
- **Mascaramento**: Ocultação de dados sensíveis para exibição

### Interface e Experiência do Usuário
- **Menu Interativo**: Sistema de navegação intuitivo
- **Feedback Visual**: Uso de emojis e formatação para clareza
- **Tratamento de Erros**: Validação de entrada e mensagens informativas

## 🔍 Contribuição para o Projeto Geral

Este módulo complementa os outros sistemas do **Desafio Felipão** demonstrando:

1. **Validação Avançada**: Enquanto outros módulos usam validações simples, este implementa algoritmos complexos
2. **Segurança de Dados**: Introduz conceitos de tratamento seguro de informações sensíveis
3. **Padrões Industriais**: Implementa validações usadas em sistemas reais de pagamento
4. **Estruturas de Dados Complexas**: Manejo de objetos com múltiplas propriedades e validações

## 📈 Evolução do Aprendizado

Comparado aos outros módulos do sistema:

- **Heróis** → **Validador**: De classes básicas para algoritmos complexos
- **Rankings** → **Validador**: De lógica simples para validação rigorosa  
- **Sistema Completo** → **Validador**: De integração para especialização
- **Todos** → **Validador**: Culmina conceitos aprendidos em aplicação prática

## 🌟 Casos de Uso Educacionais

Este módulo é ideal para aprender:
- Como implementar algoritmos conhecidos (Luhn)
- Técnicas de validação de dados do mundo real
- Boas práticas de segurança em aplicações
- Estruturação de código para sistemas complexos
- Interface de usuário para aplicações sensíveis
