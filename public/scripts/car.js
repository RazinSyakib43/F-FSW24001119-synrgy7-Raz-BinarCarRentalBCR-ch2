class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
        <div class="cars-card card px-0">
          <img src="${this.image}" class="card-img-top object-fit-cover" alt="${this.manufacture}">
          <div class="cars__card-body card-body">
            <h5 class="cars__name">${this.manufacture}/${this.model}</h5>
            <h3 class="cars__price">Rp ${this.rentPerDay} / hari</h3>
            <p class="cars__description">${this.description}</p>
            <div class="car__spec">
              <section class="cars__spec d-flex align-self-center">
                <img class="cars__spec-icon" src="./assets/icons/cars/fi_users.png" alt="">
                <p class="car__spec-text">${this.capacity} orang</p>
              </section>
              <section class="cars__spec d-flex align-self-center">
                <img class="cars__spec-icon" src="./assets/icons/cars/fi_settings.png" alt="">
                <p class="car__spec-text">${this.transmission}</p>
              </section>
              <section class="cars__spec d-flex align-self-center">
                <img class="cars__spec-icon" src="./assets/icons/cars/fi_calendar.png" alt="">
                <p class="car__spec-text">Tahun ${this.year}</p>
              </section>
            </div>
          </div>
          <button class="btn cars__button">Pilih Mobil</button>
        </div>
    `;
  }
}
