import ler from 'readline-sync';

console.log('='.repeat(50));
console.log('🎮 DESAFIO FELIPÃO - ESCOLHA SUA AVENTURA 🎮');
console.log('='.repeat(50));

const opcoes = [
    { nome: 'Escolhendo Herói', arquivo: 'Escolhendo_Heroi.js', descricao: 'Crie um herói e teste seus ataques' },
    { nome: 'Rank por XP', arquivo: 'Rank_Por_XP.js', descricao: 'Sistema de classificação baseado em experiência' },
    { nome: 'Rank por Partidas', arquivo: 'Rank_Por_Partidas.js', descricao: 'Sistema de classificação baseado em vitórias/derrotas' },
    { nome: 'Sistema Completo', arquivo: 'SistemaRank_Por_escolha.js', descricao: 'Sistema completo com múltiplas funcionalidades' },
    { nome: 'Validador de Bandeiras', arquivo: 'ValidadorBandeiras.js', descricao: 'Valide cartões: Visa, Mastercard, Amex, Elo, Hipercard, Diners, Discover, JCB e mais' }
];

console.log('\nEscolha qual desafio você quer executar:\n');

opcoes.forEach((opcao, index) => {
    console.log(`${index + 1}. ${opcao.nome}`);
    console.log(`   📝 ${opcao.descricao}\n`);
});

const escolha = ler.questionInt('Digite o número da sua escolha (1-5): ');

if (escolha >= 1 && escolha <= 5) {
    const arquivoEscolhido = opcoes[escolha - 1];
    console.log(`\n🚀 Iniciando: ${arquivoEscolhido.nome}...\n`);
    
    // Importar e executar o arquivo escolhido
    import(`./${arquivoEscolhido.arquivo}`)
        .then(() => {
            console.log('\n✅ Execução concluída!');
        })
        .catch((error) => {
            console.error('❌ Erro ao executar o arquivo:', error);
        });
} else {
    console.log('❌ Opção inválida! Por favor, escolha um número entre 1 e 5.');
}
