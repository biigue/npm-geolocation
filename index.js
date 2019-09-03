class GeolocationPhone {
  API_URL = "";
  BRAND = "";
  WPP = "";


  constructor(url, brand) {
    this.API_URL = url;
    this.BRAND = brand;
  }

  getLocation() {
    return new Promise(function(resolve) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        });
      } else {
        resolve(false);
      }
    });
  }

  transform(phone) {
    let formated = '';
    if (phone) {
      formated = phone.length > 11 ? phone.slice(phone.length > 13 ? 4 : 2) : phone;
      formated = `(${formated.slice(0, 2)}) ${formated.slice(2, 6)}-${formated.slice(6)}`;
    }
    return formated;
  }

  // @TODO criar algo
  setPhone(response) {
    const campanha = true; 
    //header
    $('.header__phone').text(response[campanha ? transform(phone_track) : transform(phone)]); //phone transform
    $('.header__phone').attr("href", 'tel:'+response[campanha ? transform(phone_track) : transform(phone)]); //ptl
    //wpp
    this.WPP = responde.whatsapp;

  }
  getWhats(){
    return this.wpp;
  }

  getPhones() {
    this.getLocation().then(position => {
      const body = { ...position, brand: this.BRAND };
      try {
        fetch(this.API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(this.setPhone)
          .catch(function(err) {
            console.error(err);
          }); // response status !== 200
      } catch (error) {
        console.log(error);
      }
    });
  }
}
