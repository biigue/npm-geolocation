const GeolocationInfos = require('../src/index');
const geolocation = new GeolocationInfos('https://webservice.jogga.com.br/api/load-info', 'america');

test('two plus two is four', () => {
	expect(2 + 2).toBe(4);
});