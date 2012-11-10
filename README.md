# CepFacil para Node.js - WIP

Wrapper JavaScript/Node.js para o serviço cepfacil.com.br

NOTA: essa biblioteca não está funcionando ainda. Esse documento no momento descreve somente como ela **deve** funcionar e não como ela de fato está funcionando.

## Instalação

`$ npm install cepfacil`

## Uso

```javascript

var CepFacil, token, cep, address;

CepFacil = require("cepfacil");

token = "xxxx-xxxx-xxxx-xxxx"; // Obtenha o seu http://cepfacil.com.br

cep = "53417-540";

address = new CepFacil(cep, token);

// acesse as propriedades do endereço

address.zipCode; //

address.addressType; //

address.state; //

address.city; //

address.neighborhood; //

address.street = opts.street; //

```

## Autor

* Rodrigo Alves Vieira - rodrigovieira1994@gmail.com - http://www.rodrigoalvesvieira.com

## TODO

* Recuperar dados do web service em formato XML assim é possível parsear o corpo da resposta sem essa quantidade absurda de variáveis.

## Licença

CepFacil é liberado sob a licença do MIT com atribuições a Rodrigo Alves Vieira http://www.rodrigoalvesvieira.com