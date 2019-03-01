import { stringify } from 'query-string';

function logResponse(path, configs) {
  return function then(response) {
    console.log(`[mock] GET ${path} params:`, configs.params, 'response', response); // eslint-disable-line no-console

    return response;
  };
}

export default function (path, configs = {}) {
  if (configs.action.meta.id !== undefined) {
    if (configs.action.duck.entity.mock?.[configs.action.meta.id]) {
      return Promise.resolve({
        data: configs.action.duck.entity.mock?.[configs.action.meta.id],
      }).then(logResponse(path, configs));
    }

    const error = new Error('Not found');
    error.response = { status: 404 };

    return Promise.reject(error);
  }

  const dataList = Object.values(configs.action.duck.entity.mock || {});
  if (configs.action.duck.entity.paginated || configs.params.page_size) {
    const page = Number(configs.params.page || 1);
    const pageSize = Number(configs.params.page_size || 100);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return Promise.resolve({
      data: Object.assign(
        {
          count: dataList.length,
          results: dataList.slice(startIndex, endIndex),
        },
        page > 0 && {
          previous: `${path}${stringify({ ...configs.params, page: page - 1 })}`,
        },
        dataList.length > endIndex && {
          next: `${path}${stringify({ ...configs.params, page: page + 1 })}`,
        },
      ),
    }).then(logResponse(path, configs));
  }

  return Promise.resolve({ data: dataList }).then(logResponse(path, configs));
}
