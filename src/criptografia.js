let textoCriptografado = "texte"; // Variável para armazenar o texto criptografado

function getValues() {
    const mensagem = document.getElementById('mensagem').value;
    const chave = document.getElementById('chave').value;
    return { mensagem, chave };
}

function criptografar() {
    const { mensagem, chave } = getValues();

    if (!mensagem || !chave) {
        alert("Preencha a mensagem e a chave!");
        return;
    }

    // PASSO 2: Usar o algoritmo AES do CryptoJS para criptografar.
    const chave_cripto = CryptoJS.SHA256(chave).toString(CryptoJS.enc.Hex);

    const encrypted = CryptoJS.AES.encrypt(mensagem, chave_cripto).toString();


    textoCriptografado = encrypted;

    document.getElementById('outputCriptografado').textContent = encrypted;
    document.getElementById('outputDescriptografado').textContent = '...';
    console.log("Criptografado:", encrypted);
}

function descriptografar() {
    const chave = document.getElementById('chave').value;

    if (!textoCriptografado || !chave) {
        alert("Primeiro, criptografe a mensagem!");
        return;
    }
    
    // PASSO 3: Usar o algoritmo AES do CryptoJS para descriptografar.
    // O resultado é um WordArray que precisa ser convertido para string UTF-8.
    try {
        const bytes  = CryptoJS.AES.decrypt(textoCriptografado, chave);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        document.getElementById('outputDescriptografado').textContent = originalText;
        console.log("Descriptografado:", originalText);

    } catch (error) {
        document.getElementById('outputDescriptografado').textContent = 'ERRO na descriptografia (Chave incorreta?)';
        console.error("Erro de descriptografia:", error);
    }
}

function descriptografar_span(chave, data){
   
    try {
        const bytes  = CryptoJS.AES.decrypt(data, chave);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;

    } catch (error) {
        return '<kbd>Sensível</kbd>';
    }
}

function capturar_chave(){

}

function capturarChaveDaCache(chaveProcurada) {
    // 1. Verifica se o localStorage é suportado e está disponível
    if (typeof(Storage) === "undefined") {
        console.error("Desculpe! O Web Storage (localStorage) não é suportado neste navegador.");
        return null;
    }

    // 2. Tenta obter o valor da chave
    // O método .getItem() do localStorage retorna:
    // - O valor (como string) se a chave existir.
    // - null se a chave NÃO existir.
    const valorArmazenado = localStorage.getItem("CHAVE");

    // 3. Verifica se a chave existe (o valor não é null)
    if (valorArmazenado !== null) {
        console.log(`✅ Chave '${chaveProcurada}' encontrada!`);
        console.log(`🔑 Valor capturado: ${valorArmazenado}`);
        
        // Se o valor armazenado for um objeto (salvo como string JSON),
        // você precisará de JSON.parse(valorArmazenado)
        
        return valorArmazenado;
    } else {
        console.warn(`❌ Chave '${chaveProcurada}' NÃO existe no localStorage.`);
        return null;
    }
}

window.addEventListener('load', function() {
    // Este código será executado APÓS a página e TODOS
    // os seus recursos (imagens, vídeos, etc.) estarem carregados.
    console.log("A página e todos os seus recursos estão totalmente carregados!");
    // Você pode chamar sua função aqui
    const DATA = this.document.getElementsByClassName('criptografado')

    const Chave = capturarChaveDaCache();


    for(i in DATA){
        let valor = DATA[i].getAttribute('value')

        let descriptografado = descriptografar_span(Chave, valor)
        
        console.log('')
        if (descriptografado != ''){
            DATA[i].innerHTML = descriptografado
        }
        console.log(DATA[i], valor, descriptografado);
    }
});
