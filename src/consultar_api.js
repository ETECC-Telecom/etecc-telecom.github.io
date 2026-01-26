
/* function Consultar_API(){
    
    vlan = document.getElementById('vlan_id').value;
    
    
    console.log('PPPoE:', vlan);
    
} */

// Função chamada pelo botão 'Consultar...'
function Consultar_API() {

    const CHAVE = capturarChaveDaCache("chave")
    // 1. Capturar o valor do campo de input (o PPPoE)
    // USAMOS .value para capturar o que foi digitado no <input id="vlan_id">
    const pppoe_digitado = document.getElementById('vlan_id').value.trim();
    const loading = document.getElementById('carregando');
    const container_resultado = document.getElementById('vlan_container');

    if (CHAVE == 'baa24903bc04c746598b66a4d455a22b43125feb52746938af0435440bed3f9f'){
        
        // 2. Validação básica
        if (!pppoe_digitado) {
            container_resultado.textContent = 'ERRO: Por favor, informe o PPPoE.';
            return;
        }

        // 3. Montar a URL da sua API
        // Note que sua URL no Flask tem o PPPoE como parte do caminho (path parameter)
        //const url_api = `http://127.0.0.1:5000/api/vlan_por_pppoe/${pppoe_digitado}`;
        // Antigo Endpoint: https://ti.eteccresolve.com.br/api_vlan.php?token=etecc111426&pppoe=${pppoe_digitado}
        const url_api = `https://api.etecc.com.br/index.php?route=/api/v1/vlan&pppoe=${pppoe_digitado}`;
        const apiKey = '54a61b6ac2d8daf6e7089dc7f7af31f4';

        // 4. (OPCIONAL) Atualizar o status antes de consultar
        loading.classList.add('spinner-grow', 'spinner-grow-sm');
        
        container_resultado.textContent = ' Consultando, Aguarde...';
        container_resultado.parentElement.classList.remove('alert-danger'); // Limpa status de erro
        container_resultado.parentElement.classList.add('alert-info');    // Status de loading
        
        // 5. Fazer a requisição AJAX usando Fetch API

        // fetch(url_api, {
        //     method: 'GET',
        //     headers: {
        //         'x-api-key': apiKey,
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Erro na requisição: ' + response.status);
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Dados recebidos:', data);
        // })
        // .catch(error => {
        //     console.error('Houve um problema:', error);
        // });


        fetch(url_api,{
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
        }
        })
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

    }else{
        container_resultado.textContent = "Usuário não cadastrado!";
        container_resultado.parentElement.classList.remove('alert-dark');
        container_resultado.parentElement.classList.add('alert-danger'); // Erro
    }
    
}