class BookingOptionReferenceData {

  constructor(duration, label) {
    this.duration = duration;
    this.label = label;
  }
}

const bookingOptions = [
  new BookingOptionReferenceData(15, '15 minutes'),
  new BookingOptionReferenceData(30, '30 minutes'),
  new BookingOptionReferenceData(45, '45 minutes'),
  new BookingOptionReferenceData(60, '1 hour'),
  new BookingOptionReferenceData(90, '1 hour 30 minutes'),
];

export default bookingOptions;
