import moment from 'moment';
import { EntityTitle, Fields } from '@entity/core';

import EntityPerson from 'apps/people/entities/Person';

export default class Activity extends EntityTitle {
  static fields = {
    completed_by: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
    }),
    date_activity: new Fields.DateField(),
    date_completed: new Fields.DateField(),
    date_due: new Fields.DateField(),
    date_submitted: new Fields.DateField(),
    description: new Fields.TextField(),
    is_archived: new Fields.BooleanField({ default: false }),
    is_completed: new Fields.BooleanField({ default: false }),
    is_draft: new Fields.BooleanField({ default: true }),
    order: new Fields.IntegerField(),
    person_responsible: new Fields.EntityField({
      blank: true,
      entity: EntityPerson,
    }),
    title: new Fields.CharField(),
    title_short: new Fields.CharField({ blank: true }),
    uuid: new Fields.IdField({ blank: true }),
  }

  static actionComplete(record, options = {}) {
    return this.duck?.save(record, {
      action: 'complete',
      method: 'post',
      ...options,
    });
  }

  static actionSubmit(record, options = {}) {
    return this.duck?.save(record, {
      action: 'submit',
      method: 'post',
      ...options,
    });
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
