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
    uuid: new Fields.IdField({ blank: true, mock: 'random.uuid' }),
  }

  static actionComplete(record, configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.actions.save) throw new Error(`EntityActivity.actionComplete (${this.name}): "save" action is required in duck`);
    }

    return this.duck.actions.save(record, {
      action: 'complete',
      method: 'post',
      ...configs,
    });
  }

  static actionSubmit(record, configs = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.duck?.actions.save) throw new Error(`EntityActivity.actionSubmit (${this.name}): "save" action is required in duck`);
    }

    return this.duck.actions.save(record, {
      action: 'submit',
      method: 'post',
      ...configs,
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
      if (!record) throw new Error(`EntityActivity.isLate (${this.name}): "record" must be set.`);
    }

    return this.isOverdue(record) || (
      this.isCompleted(record)
      && record.get('due_date').isBefore(record.get('date_completed'), 'day')
    );
  }

  static isOverdue(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`EntityActivity.isOverdue (${this.name}): "record" must be set.`);
    }

    return !this.isCompleted(record)
      && record.get('due_date').isBefore(moment(), 'day');
  }
}
