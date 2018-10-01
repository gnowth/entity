import moment from 'moment';

import Entity from './entity';

export default class BaseEntity extends Entity {
  static actionArchive(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`'record' must be set when calling actionArchive on entity ${this.name}`);
    }

    return record.set('is_archived', true);
  }

  static actionArrayDeleteAtIndex(records, { index = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`'records' must be set when calling actionArrayDeleteAtIndex on entity ${this.name}`);
      if (index === null) throw new Error(`'index' option must be set when calling actionArrayDeleteAtIndex on entity ${this.name}`);
    }

    return records.delete(index);
  }

  static actionArrayDeleteAtIndexOrdered(records, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`Entity (actionArrayDeleteAtIndexOrdered): Entity ${this.name} must have a field order`);
    }

    return this.actionArrayDeleteAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionArrayMoveAtIndex(records, { index = null, indexTo = null } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!records) throw new Error(`'records' must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
      if (index === null) throw new Error(`'index' option must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
      if (indexTo === null) throw new Error(`'indexTo' option must be set when calling actionArrayMoveAtIndex on entity ${this.name}`);
    }

    return records.delete(index).insert(indexTo, records.get(index));
  }


  static actionArrayMoveAtIndexOrdered(records, options) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.fields.order) throw new Error(`Entity (actionArrayDeleteAtIndexOrdered): Entity ${this.name} must have a field order`);
    }

    return this.actionArrayMoveAtIndex(records, options)
      .map((record, i) => record.set('order', i));
  }

  static actionComplete(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionComplete): 'record' must be set. Ref: entity ${this.name}`);
      if (!this.fields.completed) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "completed"`);
    }

    return record.set('completed', true);
  }

  static actionReset(record) {
    return this.dataToRecord({
      [this.idField]: record.get(this.idField),
    });
  }

  static actionSave(record) {
    return this.duck.save(record, { invalidateList: true });
  }

  static actionSubmit(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionSubmit): 'record' must be set. Ref: entity ${this.name}`);
    }

    return record.set('is_draft', false);
  }

  static isOverdue(record) {
    if (process.env.NODE_ENV !== 'production') {
      if (!record) throw new Error(`BaseEntity (actionComplete): 'record' must be set. Ref: entity ${this.name}`);
      if (!this.fields.due_date) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "due_date"`);
      if (!this.fields.is_draft) throw new Error(`BaseEntity (actionComplete): entity ${this.name} must contain a field "is_draft"`);
    }

    return record.get('is_draft') && record.get('due_date').isBefore(moment(), 'day');
  }
}
