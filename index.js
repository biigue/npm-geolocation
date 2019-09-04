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

  setPhone(response) {
    const campanha = true; 
    $('.formated_phone').text(this.transform(response[campanha ? 'phone_track' : 'phone']));
    $('.link_phone').attr("href", 'tel:'+response[campanha ? 'phone_track' : 'phone']);
    //wpp
    this.WPP = response.whatsapp;
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
          .then(response => response.json())
          .then(data => this.setPhone(data))
          .catch(function(err) {
            console.error(err);
          }); // response status !== 200
      } catch (error) {
        console.log(error);
      }
    });
  }
}
