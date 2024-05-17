class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    // this.loadButton = document.getElementById("load-btn");
    this.carsContainer = document.getElementById("cars-container");
    this.editButton = document.getElementById("edit__button");
    this.searchButton = document.getElementById("search__button");
    this.form = document.forms["search_form"];
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
    this.form.onsubmit = this.run.bind(this);
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  run(event) {
    event.preventDefault();

    this.searchButton.hidden = true;
    this.editButton.hidden = false;

    const driverType = this.form["tipe_driver__form"].value;
    const timeSelect = this.form["pilih_tanggal__form"].value;
    const dateSelect = this.form["waktu_jemput__form"].value;
    const passengers = this.form["jumlah_penumpang__form"].value;

    const newDate = new Date(`${timeSelect}T${dateSelect}Z`);

    if (!this.validateForm(driverType, timeSelect, dateSelect)) {
      return;
    }

    this.clear();

    const filteredCar = Car.list.filter(
      (car) =>
        car.availableAt > newDate &&
        (passengers === "" ||
          parseInt(car.capacity) === parseInt(passengers)) &&
        car.available
    );

    if (!filteredCar.length) {
      alert("Tidak ada mobil yang tersedia");
      return;
    }

    filteredCar.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carsContainer.append(node);
    });
  }

  validateForm(driverType, timeSelect, dateSelect) {
    if (driverType === "") {
      alert("Mohon isi tipe driver");
      return false;
    } else if (timeSelect === "") {
      alert("Mohon isi tanggal");
      return false;
    } else if (dateSelect === "") {
      alert("Mohon isi waktu jemput");
      return false;
    }
    return true;
  }

  clear() {
    let child = this.carsContainer.firstElementChild;
    while (child) {
      child.remove();
      child = this.carsContainer.firstElementChild;
    }
  }
}
