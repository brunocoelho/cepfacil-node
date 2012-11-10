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
        if (!error && response.statusCode === 200) {
            var cep = body.split("&")[1],
                cepRef = cep.indexOf("=") + 1;

            cep = cep.substring(cepRef, cep.length);

            var addressType = body.split("&")[2],
                addressTypeRef = addressType.indexOf("=") + 1;

            addressType = addressType.substring(addressTypeRef, addressType.length);

            var state = body.split("&")[3],
                stateRef = state.indexOf("=") + 1;

            state = state.substring(stateRef, state.length);

            var city = body.split("&")[4],
                cityRef = city.indexOf("=") + 1;

            city = city.substring(cityRef, city.length);

            var neighborhood = body.split("&")[5],
                neighborhoodRef = neighborhood.indexOf("=") + 1;

            neighborhood = neighborhood.substring(neighborhoodRef, neighborhood.length);

            var street = body.split("&")[6],
                streetRef = street.indexOf("=") + 1;

            street = street.substring(streetRef, street.length);

            return new Address({
                zipCode: cep,
                addressType: addressType,
                state: state,
                city: city,
                neighborhood: neighborhood,
                street: street
            });
        }
    });
}

module.exports = CepFacil;
