var request = require("request"),
    cep,
    cepUrl;

function Address(opts) {
    "use strict";
    this.zip_code     = opts.zipCode;
    this.addressType  = opts.addressType;
    this.state        = opts.state;
    this.city         = opts.city;
    this.neighborhood = opts.neighborhood;
    this.street       = opts.street;
}

function parseZipCode(zipCode) {
    "use strict";
    return zipCode.toString().replace(/[^0-9]/g, "");
}

var CepFacil = function (zipCode, token) {
    "use strict";

    cep = parseZipCode(zipCode);
    cepUrl = "http://www.cepfacil.com.br/service/?filiacao=" + token + "&cep=" + cep + "&formato=texto";

    return request(cepUrl, function (error, response, body) {
        var body = body.replace(/&/g, "=").split('=');

        if (!error && response.statusCode === 200) {
            address = new Address({
                zipCode:      body[3],
                addressType:  body[5],
                state:        body[7],
                city:         body[9],
                neighborhood: body[11],
                street:       body[13]
            });

            return address;
        }
    });
};

module.exports = CepFacil;
