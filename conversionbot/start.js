require('byteballcore/wallet.js');
require('date.js');
var dagdb = require('byteballcore/db.js');

var eventBus = require('byteballcore/event_bus.js');
var constants = require('byteballcore/constants.js');

var MAX_LIBERTARIOS = MAX_SATOSHIS = 2100000000000000;
var SATOSHIS_BTC = 1e8;
var BYTES_GBYTE = 1e9;
var BYTES_MBYTE = 1e6;
// TODO: Chequear estos valores
var BYTES_GBYTE = 1e9;
//var MAX_BYTES = 1000000 * BYTES_GBYTE;
var MAX_BYTES = constants.MAX_CAP;
// TODO: Chequear numero máximo de blackbytes
var MAX_BLACKBYTES = constants.MAX_CAP;

eventBus.on('text', function (from_address, text) {
    var device = require('byteballcore/device.js');
    switch (text) {
        case "lista":
            device.sendMessageToDevice(from_address, 'text', '[BTC] [XBT] [GBYTE] [MBYTE] [BYTE]');
            break;
        case "cotización":
            // TODO: EJEMPLO
            var res = cotizacionLibertario(1, "BTC", Date.now());
            device.sendMessageToDevice(from_address, 'text', res.value + " Libertarios por 1 BTC");
            break;
        default:
            device.sendMessageToDevice(from_address, 'text', 'No te entiendo');
            break;

    }
});

eventBus.on('paired', function (from_address) {
    var device = require('byteballcore/device.js');
    device.sendMessageToDevice(from_address, 'text', getMyWelcomeText());
});

function getMyWelcomeText() {
    return "Hola compañero, recuerda: Bitcoin es una burbuja. Prueba [cotización] o [lista] para ir abriendo boca."
}

function cotizacionLibertario(ncripto, idcripto, utcstamp) {
    var res = {
        value: -1
    }
    switch (idcripto) {
        case "XTC":
            return satoshi2libertario(ncripto * SATOSHIS_BTC);
            break;
        case "BTC":
            return satoshi2libertario(ncripto * SATOSHIS_BTC);
            break;
        case "GBYTE":
            return satoshi2libertario(byte2satoshi(ncripto * BYTES_GBYTE));
            break;
        case "MBYTE":
            return satoshi2libertario(byte2satoshi(ncripto * BYTES_MBYTE));
            break;
        // TODO: Más criptos
        // ...
        // ...
        default:
            var res = {
                value: -1,
                error: idcripto + " no definido, pruebe uno de las monedas soportadas [lista]"
            }
            return res;
            break;
    }
}

function byte2satoshi(nbytes) {
    // TODO: Sacar de configuración
    var diroraculo = "test";
    if (nbytes > MAX_SATOSHIS | nbytes <= 0) {
        var res = {
            value: -1,
            error: "Valor incorrecto. Máximo valor permitido: 0 < valor <=  " + MAX_SATOSHIS + ". Por favor pruebe con "
        }
        return res;
    } else {
        // TODO: Consultar oráculo
        var res = {
            value: 100 // TODO: TEST
        }
        return res;
    }
}

function satoshi2libertario(nsatoshis) {// TODO: Sacar de configuración
    var diroraculo = "test";
    if (nbytes > MAX_SATOSHIS | nbytes <= 0) {
        var res = {
            value: -1,
            error: "Valor incorrecto. Máximo valor permitido: 0 < valor <=  " + MAX_SATOSHIS + ". Por favor pruebe con "
        }
        return res;
    } else {
        // TODO: Consultar oráculo
        var res = {
            value: 100 // TODO: TEST
        }
        return res;
    }
}