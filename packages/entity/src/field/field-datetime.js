export default class DateTimeField extends DateField {
  constructor(options) {
    const newOptions = Object.assign(
      {
        dateFormat: 'YYYY-MM-DD HH:mm',
        allowTime: true,
      },
      options,
    );

    super(newOptions);
  }
}
