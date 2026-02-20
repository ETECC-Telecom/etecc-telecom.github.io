export class EteccFooter extends HTMLElement{
    
	constructor(){
        
		super()
        
        const dataAtual = new Date();
        const anoCompleto = dataAtual.getFullYear();
		this.attachShadow({mode:"open"})
		this.shadowRoot.innerHTML=
        `

        <link href="/src/css/bootstrap.min.css" rel="stylesheet">
        <script src="/src/js/bootstrap.bundle.min.js"></script>

        <footer 
            class="mt-5 p-4 bg-dark text-white text-center"
            style="background-image: url('/static/pattern.webp'); background-repeat: repeat; background-position: center; background-size: 100px;"
        >
            <br>
            <p>© - Todos os direitos reservados a <b>ETECC Telecom</b> - ${anoCompleto}</p>
            <p><b>Autor: </b><a href="https://raphaelanjos27.github.io/Raphael-Page/" target="_blank">Raphael dos Anjos</a></p>
            <br><br>
            <pre> Versão 1.2.4 </pre>
        </footer>
		`
	}
}