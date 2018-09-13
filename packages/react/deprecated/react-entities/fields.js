import _flatten from 'lodash/flatten';
import { is } from 'immutable';

import Entity from './entity';
import Validators from './validators';

class Field {
  static defaultOptions = {
    valueWillChange: ({ nextValue }) => nextValue,
    defaultShouldComponentUpdate: ({ nextProps, props }) => !is(nextProps.value, props.value),
    validators: [],
    defaultWidget: 'input',
    defaultWidgetProps: {},
    defaultValidators: [],
    defaultValue: null,
    nullable: true,
  };

  constructor(options = {}) {
    Object.assign(
      this,
      Field.defaultOptions,
      this.constructor.defaultOptions,
      options.defaultWidget && { defaultWidgetProps: {} },
      options.noDefaultValidate && { defaultValidators: [] },
      options,
    );

    this.validators = this.defaultValidators.concat(this.validators);
    this.defaultValidators = undefined;

    if (process.env.NODE_ENV !== 'production') {
      if (this.defaultValue === undefined) {
        throw new Error(`A defaultValue of 'undefined is not allowed for Field class ${this.constructor.name}.`);
      }

      if (!this.nullable && this.defaultValue === null) {
        throw new Error(`A defaultValue must be provided to Field class ${this.constructor.name} if field is not nullable.`);
      }
    }
  }

  validate(args) {
    return _flatten(this.validators.map((validator) => {
      const validations = validator({ ...args, field: this });
      const validationArray = validations instanceof Array ? validations : [validations];
      return validationArray
        .filter(validation => !validation)
        .map((validation) => {
          if (typeof validation === 'string') return { id: validation };
          if (validations === true) return { id: 'errors.validators.unidentifiedError' };
          return validation;
        });
    }));
  }
}

class UuidField extends Field {
  static defaultOptions = {
    defaultWidgetProps: { maxLength: 255 },
    defaultValidators: [Validators.maxLength(255)],
    defaultValue: '',
    nullable: false,
  };
}

class BooleanField extends Field {
  static defaultOptions = {
    defaultWidgetProps: { type: 'checkbox' },
  };
}

class IntegerField extends Field {
  static defaultOptions = {
    defaultWidgetProps: { type: 'number' },
    defaultValidators: [Validators.integer()],
    defaultValue: 0,
    nullable: false,
  };
}

class CharField extends Field {
  static defaultOptions = {
    defaultWidgetProps: { maxLength: 255 },
    defaultValidators: [Validators.maxLength(255)],
    defaultValue: '',
    nullable: false,
  };
}

class TextField extends Field {
  static defaultOptions = {
    defaultWidget: 'textarea',
    defaultValue: '',
    nullable: false,
  };
}

class DateField extends Field {
  static defaultOptions = {
    defaultWidgetProps: {
      type: 'date',
    },
  };
}

class DateTimeField extends Field {
  static defaultOptions = {
    defaultWidgetProps: {
      type: 'datetime-local',
    },
  };
}

class EnumField extends Field {
  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!(options.options instanceof Array)) {
        throw new Error('options of type Array is required for EnumField');
      }

      if (options.options.length < 1) {
        throw new Error('options length must at least be 1 for EnumField');
      }
    }
  }
}

class EntityField extends Field {
  static defaultOptions = {
    // defaultValue: '', // TODO add function generating dataToRecords if field is not nullable, otherwise null,
  };

  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!(options.entity instanceof Entity)) {
        throw new Error('entity is required for EntityField');
      }
    }
  }
}

class EntityListField extends Field {
  constructor(options) {
    super(options);

    if (process.env.NODE_ENV !== 'production') {
      if (!(options.entity instanceof Entity)) {
        throw new Error('entity is required for EntityListField');
      }
    }
  }
}

class ComputedField extends Field {}

export default {
  Field,
  UuidField,
  BooleanField,
  IntegerField,
  CharField,
  TextField,
  EnumField,
  DateField,
  DateTimeField,
  EntityField,
  EntityListField,
  ComputedField,
};
