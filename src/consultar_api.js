
/* function Consultar_API(){
    
    vlan = document.getElementById('vlan_id').value;
    
    
    console.log('PPPoE:', vlan);
    
} */

// Função chamada pelo botão 'Consultar...'
function Consultar_API() {
    // 1. Capturar o valor do campo de input (o PPPoE)
    // USAMOS .value para capturar o que foi digitado no <input id="vlan_id">
    const pppoe_digitado = document.getElementById('vlan_id').value.trim();
    const loading = document.getElementById('carregando');
    const container_resultado = document.getElementById('vlan_container');

    // 2. Validação básica
    if (!pppoe_digitado) {
        container_resultado.textContent = 'ERRO: Por favor, informe o PPPoE.';
        return;
    }

    // 3. Montar a URL da sua API
    // Note que sua URL no Flask tem o PPPoE como parte do caminho (path parameter)
    //const url_api = `http://127.0.0.1:5000/api/vlan_por_pppoe/${pppoe_digitado}`;
    // Antigo Endpoint: https://ti.eteccresolve.com.br/api_vlan.php?token=etecc111426&pppoe=${pppoe_digitado}
    const url_api = `https://api.etecc.com.br/index.php?route=/api/v1/vlan&pppoe==${pppoe_digitado}&#34`;
    // 4. (OPCIONAL) Atualizar o status antes de consultar
    loading.classList.add('spinner-grow', 'spinner-grow-sm');
    
    container_resultado.textContent = ' Consultando, Aguarde...';
    container_resultado.parentElement.classList.remove('alert-danger'); // Limpa status de erro
    container_resultado.parentElement.classList.add('alert-info');    // Status de loading

    // 5. Fazer a requisição AJAX usando Fetch API
    fetch(url_api)
        .then(response => {
            // Se a resposta NÃO for bem-sucedida (404, 500), tratamos o erro
            if (!response.ok) {
                // Tentamos ler o JSON do erro para pegar a mensagem 'detail'
                return response.json().then(errorData => {
                    throw new Error(errorData.description || `Erro HTTP: ${response.status}`);
                });
            }
            // Se for 200 OK, retorna o JSON
            return response.json();
        })
        .then(data => {
            // 6. Atualizar o <span> com o resultado (a VLAN)
            loading.classList.remove('spinner-grow', 'spinner-grow-sm');

            container_resultado.textContent = data['data']['vlan'];
            container_resultado.parentElement.classList.remove('alert-info');
            container_resultado.parentElement.classList.add('alert-success'); // Sucesso
        })
        .catch(error => {
            // 7. Tratar e exibir o erro (de rede, 404, 500, etc.)
            console.error('Erro na consulta:', error);
            container_resultado.textContent = error.message;
            container_resultado.parentElement.classList.remove('alert-info');
            container_resultado.parentElement.classList.add('alert-danger'); // Erro
        });
}