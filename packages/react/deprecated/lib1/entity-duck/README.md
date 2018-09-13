# Duck-Entities

Entities are stored with identifier `${method}.${id}.${stringify(params)}` where method with relative of `get, list, options, save`. A special case where the entity will be store with `id` if method is `get` and the params is `undefined`.
