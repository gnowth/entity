import Duck from '@burnsred/entity-duck';
import { List } from 'immutable';

export default class DjangoRestFramework extends Duck.Selectors {
  errors(state, meta = {}) {
    return this.getState(state).getIn([
      meta.id === undefined ? 'list_errors' : 'detail_errors',
      meta.id === undefined ? this.duck.getIdentifier(meta) : this.duck.getId(meta),
    ]);
  }

  hasPermissions(state, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!meta.permissions) throw new Error(`RestDuck.hasPermissions (${this.entity.name}): "permissions" option is required`);
      if (!meta.method) throw new Error(`RestDuck.hasPermission (${this.entity.name}): "method" option is required`);
    }

    const permissions = this.getState(state).getIn(
      [
        'options',
        this.duck.getIdentifier(meta),
        'permissions',
      ],
      List(),
    );

    const requiredPermissions = Array.isArray(meta.permissions)
      ? meta.permissions
      : [meta.permissions];

    return !!requiredPermissions.find(permission => permissions.includes(permission));
  }

  meta(state, meta = {}) {
    return this.getState(state).getIn([
      'options',
      this.duck.getIdentifier({ method: 'options', ...meta }),
    ]);
  }

  pagination(state, meta) {
    if (!this.entity.paginated) return undefined;

    const recordsMap = this.getState(state).getIn([
      'list',
      this.duck.getIdentifier(meta),
    ]);

    return recordsMap;
  }

  record(state, meta = {}) {
    const record = this.getState(state).getIn([
      `${meta.id === undefined ? 'list' : 'detail'}${meta.dirty ? '_dirty' : ''}`,
      meta.id === undefined || meta.action ? this.duck.getIdentifier(meta) : this.duck.getId(meta),
      ...(meta.id === undefined && this.entity.paginated ? ['results'] : []),
    ]);

    if (process.env.NODE_ENV !== 'production') {
      if (meta.id === undefined && record !== undefined && !List.isList(record)) throw new Error(`RestDuck.record (${this.entity.name}): record must be a list. Did you forget to set "paginated"?`);
    }

    return record;
  }

  status(state, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!meta.status) throw new Error(`RestDuck.status (${this.entity.name}): "status" option is required`);
      if (!meta.method) throw new Error(`RestDuck.status (${this.entity.name}): "method" option is required`);
    }

    return this.getState(state).getIn(
      [
        'status',
        meta.status,
        this.duck.getIdentifier(meta),
      ],
      false,
    );
  }
}
