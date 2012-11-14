var request = require("request"),
    cep,
    cepUrl;

function Address(opts) {
    "use strict";
    this.zip_code = opts.zipCode;
    this.addressType = opts.addressType;
    this.state = opts.state;
    this.city = opts.city;
    this.neighborhood = opts.neighborhood;
    this.street = opts.street;
}

CepFacil = (function() {
    function CepFacil(zipCode, token) {
        "use strict";
        return new CepFacil.fetch(zipCode, token);
    }

    return CepFacil;
})();

CepFacil.parseZipCode = function (zipCode) {
    "use strict";
    return zipCode.toString().replace(/[^0-9]/g, "");
};

CepFacil.fetch = function (zipCode, token) {
    "use strict";

    cep = CepFacil.parseZipCode(zipCode);
    cepUrl = "http://www.cepfacil.com.br/service/?filiacao=" + token + "&cep=" + cep + "&formato=texto";

    request(cepUrl, function (error, response, body) {
        "use strict";
        var body = body.replace(/&/g, "=").split('=');
        if (!error && response.statusCode === 200) {
            return new Address({
                zipCode:      body[3],
                addressType:  body[5],
                state:        body[7],
                city:         body[9],
                neighborhood: body[11],
                street:       body[13]
            });
        }
    });
}

module.exports = CepFacil;
