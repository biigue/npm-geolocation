export class GeolocationInfos {

  /**
   * 
   * @param {string} url 
   * @param {string} brand 
   */
  constructor(url, brand) {
    this.API_URL = url;
    this.BRAND = brand;
    this.getInfos();
  }

  get whatsapp() {
    return this.WHATSAPP;
  }

  get geolocation() {
    return this.GEOLOCATION;
  }

  get location() {
    return this.GEOLOCATION.location;
  }

  /**
   * 
   * @param {string} phone
   * @returns {string} phoneFormated
   */
  transform(phone) {
    let formated = '';

    if (phone) {
      formated = phone.length > 11 ? phone.slice(phone.length > 13 ? 4 : 2) : phone;
      formated = `(${formated.slice(0, 2)}) ${formated.slice(2, 6)}-${formated.slice(6)}`;
    }

    return formated;
  }

  /**
   * @returns {Promise<({latitude: string, longitude: string} | boolean)>} location
   */
  getLocation() {
    return new Promise(function (resolve) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const {
            latitude,
            longitude
          } = position.coords;
          resolve({
            lat: latitude,
            lng: longitude
          });
        });
      } else {
        resolve(false);
      }
    });
  }

  /**
   * 
   * @param {{phone: string, phone_track: string, whatsapp: string, geolocation: { lat: string, lng: string, location: string }}} infos 
   */
  setInfos(infos) {
    const {
      hash
    } = window.location;
    const campanha = hash.includes('utm');
    this.WHATSAPP = infos.whatsapp;
    this.LOCATION = infos.location;
    this.GEOLOCATION = infos.geolocation;
    this.PHONE = infos.phone;
    this.PHONE_TRACK = infos.phone_track;

    $('.formated_phone').text(this.transform(infos[campanha ? 'phone_track' : 'phone']));
    $('.link_phone').attr('href', 'tel:' + infos[campanha ? 'phone_track' : 'phone']);
  }

  getInfos() {
    this.getLocation().then(position => {
      const body = {
        ...position,
        brand: this.BRAND.toLowerCase()
      };

      fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(infos => this.setInfos(infos))
        .catch(function (err) {
          console.error(err);
        });
    });
  }
}