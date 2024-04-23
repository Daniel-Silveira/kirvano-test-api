<h1>Teste Técnico Kirvano - Backend</h1>

<p>Este projeto foi criado com Node.js, Typescript, Express e MySQL.</p>

<h2>Configuração</h2>

<p>Antes de executar o projeto, certifique-se de configurar o arquivo <code>.env</code>. Existe um arquivo de exemplo chamado <code>.env.example</code> para ajudar na configuração. Execute o seguinte comando para carregar as variáveis de ambiente:</p>

<pre><code>source .env
</code></pre>

<p>Em seguida, instale as dependências com o comando:</p>

<pre><code>npm install
</code></pre>

<h2>Execução</h2>

<p>Para iniciar o servidor em modo de desenvolvimento, utilize o comando:</p>

<pre><code>npm run dev
</code></pre>

<p>Para executar os testes, utilize o seguinte comando:</p>

<pre><code>npm run test
</code></pre>

<h2>Acesso à Rota Privada</h2>

<p>Para acessar a rota privada, é necessário enviar o cabeçalho <code>Authorization</code> com o valor definido no seu arquivo de ambiente. Por exemplo:</p>

<pre><code>Authorization: Bearer ABCDE12345
</code></pre>

<h2>Endpoint</h2>

<p>O único endpoint disponível é <code>/payments</code>, que aceita requisições do tipo POST com o seguinte corpo:</p>

<pre><code>{
    "name": "Jhon Doe",
    "cvv": "123",
    "expirationDate": {
        "month": 10,
        "year": 2030
    },
    "cardNumber": "1234123412341232"
}
</code></pre>

<h3>Regras do <code>cardNumber</code></h3>

<ul>
<li>Se o número do cartão for <code>1234 1234 1234 1234</code>, o pagamento será recusado com a resposta: <code>Pagamento recusado, sem limite de crédito</code>.</li>
<li>Se o cartão estiver fora da validade, a resposta será: <code>Cartão Expirado</code>.</li>
<li>Se o número do cartão consistir apenas em dígitos repetidos, como <code>1111 1111 1111 1111</code> ou <code>2222 2222 2222 2222</code>, a resposta será: <code>Cartão inválido</code>.</li>
<li>Qualquer outro número de cartão será aceito para o pagamento.</li>
</ul>
