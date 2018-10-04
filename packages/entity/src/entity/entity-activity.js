import moment from 'moment';

import EntityTitle from './entity-title';

import BooleanField from '../field/field-boolean';
import CharField from '../field/field-char';
import DateField from '../field/field-date';
import IdField from '../field/field-id';
import IntegerField from '../field/field-integer';

export default class Activity extends EntityTitle {
  static fields = {
    date_activity: new DateField(),
    date_completed: new DateField(),
    date_due: new DateField(),
    date_submitted: new DateField(),
    is_archived: new BooleanField({ default: false }),
    is_completed: new BooleanField({ default: false }),
    is_draft: new BooleanField({ default: true }),
    order: new IntegerField(),
    title: new CharField(),
    title_short: new CharField({ blank: true }),
    uuid: new IdField({ blank: true }),
  }

  static actionComplete(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'complete', method: 'post' },
      options,
    ));
  }

  static actionSubmit(record, options) {
    return this.duck?.save(record, Object.assign(
      { action: 'submit', method: 'post' },
      options,
    ));
  }

  static isCompleted(record) {
    return !!record && record.get('is_completed');
  }

  static isDraft(record) {
    return !record || record.get('is_draft');
  }

  static isLate(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`entity[${this.name}] (isLate): "record" must be set.`);
    }

    return this.isOverdue(record) || (
      this.isCompleted(record)
      && record.get('due_date').isBefore(record.get('date_completed'), 'day')
    );
  }

  static isOverdue(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`entity[${this.name}] (isOverdue): "record" must be set.`);
    }

    return !this.isCompleted(record)
      && record.get('due_date').isBefore(moment(), 'day');
  }
}
