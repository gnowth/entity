import _ from 'lodash';
import { stringify } from 'query-string';

export default class Client {
  constructor(configs) {
    Object.assign(this, configs);
  }

  errors = {
    0: new Error('Unknown Error'),
    404: new Error('Not Found'),
  }

  mocking = true

  action(data) {
    return data;
  }

  action_submit(data, configs = {}) {
    return configs.id === undefined
      ? data
      : { ...data, is_draft: false };
  }

  delete(path, options = {}) {
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.getError(0);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  get(path, options = {}) {
    const action = this[`action_${options.action.meta.action}`] || this.action;
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.paginationIfNeeded(action(
      this.getFromStore(configs),
      configs,
    ), configs);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  getError(code) {
    const error = this.errors[code] || new Error('Unknown Error');
    error.response = { status: code };

    return error;
  }

  getFromStore(configs = {}) {
    if (!configs.entity.store) return this.getError(404);

    if (configs.id === null) {
      return _.flowRight(
        _.sample,
        Object.values,
      )(configs.entity.store) || this.getError(404);
    }

    if (configs.id === undefined) {
      const dataList = Object.values(configs.entity.store);

      if (configs.entity.paginated || configs.params.page_size) {
        const page = Number(configs.params.page || 1);
        const pageSize = Number(configs.params.page_size || 100);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return dataList.slice(startIndex, endIndex);
      }

      return dataList;
    }

    return configs.entity.store[configs.id] || this.getError(404);
  }

  head(path, options = {}) {
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.getError(0);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  options(path, options = {}) {
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.getError(0);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  paginationIfNeeded(data, configs) {
    const shouldPaginate = Array.isArray(data)
      && (
        configs.entity.paginated
        || configs.params.page_size
      );

    if (!shouldPaginate) return data;

    const dataList = Object.values(configs.entity.store);
    const page = Number(configs.params.page || 1);
    const pageSize = Number(configs.params.page_size || 100);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return Object.assign(
      {
        count: dataList.length,
        results: data,
      },

      page > 0 && {
        previous: `${configs.path}${stringify({ ...configs.params, page: page - 1 })}`,
      },

      dataList.length > endIndex && {
        next: `${configs.path}${stringify({ ...configs.params, page: page + 1 })}`,
      },
    );
  }

  post(path, value, options = {}) {
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.getError(0);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  put(path, value, options = {}) {
    const configs = {
      path,
      entity: options.action.duck.entity,
      id: options.action.meta.id,
      method: options.action.meta.method || options.action.name,
      params: options.params,
    };

    const data = this.getError(0);

    return data instanceof Error
      ? this.reject(data, configs)
      : this.resolve(data, configs);
  }

  reject(data, configs) {
    return new Promise((resolve, reject) => setTimeout(
      () => reject(data),
      this.delay || 0,
    )).catch((error) => {
      console.log(`[mock] ERROR ${error.response.status}: ${configs.method.toUpperCase()} ${configs.path} params:`, configs.params); // eslint-disable-line no-console
      throw error;
    });
  }

  resolve(data, configs) {
    return new Promise(resolve => setTimeout(
      () => resolve({ data }),
      this.delay || 0,
    )).then((response) => {
      console.log(`[mock] SUCCESS: ${configs.method.toUpperCase()} ${configs.path} params:`, configs.params, 'response', response); // eslint-disable-line no-console

      return response;
    });
  }
}
