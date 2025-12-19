export class NavBar extends HTMLElement {
    constructor() {
        super();
        // Não use o Shadow DOM para este componente
        // this.attachShadow({ mode: "open" }); // LINHA REMOVIDA

        this.innerHTML = `
            <link href="/src/css/bootstrap.min.css" rel="stylesheet">
            
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="/static/Logo.svg" alt="Logo" style="width:40px;">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/configuracaorouter.html">Configuração de Router</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/pontoadicional.html">Ponto Adicional</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/quedas.html">Quedas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/logins.html">Logins</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/scripts.html">Scripts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/ipseconsumo.html">IP's e Consumo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/comandoscmd.html">Comandos CMD</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/hierarquiaos.html">Hierarquia de OS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/Troubleshooting.html">Troubleshooting</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/paginas/consulta_vlan.html">Consultar VLAN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Não se esqueça de registrar seu componente
