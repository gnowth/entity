import { stringify } from 'query-string';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormNestedEntity from 'lib/snippets/entities/FormNested';
import ValueContainer from 'lib/snippets/containers/Value';
import FormNested from './index';

class StoryFormNestedEntity extends FormNestedEntity {
  static actionReset(record, options) {
    options.event.preventDefault();
    action('form Reset')(options.event);

    return super.actionReset(record, options);
  }
}

const FormNestedStory = () => (
  <ValueContainer initialValue={StoryFormNestedEntity.dataToRecord({})}>
    { (value, onChange) => (
      <div>
        <FormNested
          value={value}
          onChange={onChange}
          field={StoryFormNestedEntity.toEntityField()}
        />

        <div>{ stringify(StoryFormNestedEntity.asParams(value).filterNot(v => !v).toJS()) }</div>
      </div>
    )}
  </ValueContainer>
);

storiesOf('SPForm', module)
  .add('Nested', FormNestedStory);
