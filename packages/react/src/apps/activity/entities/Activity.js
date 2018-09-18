import moment from 'moment';

import { Entity, Fields, Validators } from '@gnowth/entity';

export default class Activity extends Entity {
  static paginated = true;

  static fields = {
    activity_date: new Fields.DateField({
      flags: { create: Validators.allowBlank },
    }),
    activity_due_date: new Fields.DateField(),
    activity_is_draft: new Fields.BooleanField({ default: false }),
  }

  static actionReset(record, { defaultValue } = {}) {
    return defaultValue || this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static actionSave(record) {
    return this.duck.save(record);
  }

  static actionSubmit(record, { action = 'submit', resolve } = {}) {
    return this.duck.save(record, { action, resolve });
  }

  static metaIsOverdue(record) {
    return record.get('activity_is_draft') && moment().isAfter(record.get('activity_due_date'), 'day');
  }
}
