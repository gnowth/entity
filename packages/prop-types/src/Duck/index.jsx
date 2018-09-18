import Duck from '../../../entity-duck/src/duck';
import PropTypesEntity from '../Entity';
import PropTypesPlus from '../Plus';

const hasDuck = (props, propName, componentName) => (
  !props[propName].duck
  || !(props[propName].duck instanceof Duck)
) && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Entity "${props[propName].name}" must contain a field 'duck' which is an instance of 'Duck'.`);

const entityFieldHasDuck = (props, propName, componentName) => (
  !props[propName].entity.duck
  || !(props[propName].entity.duck instanceof Duck)
) && new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Entity "${props[propName].entity.name}" must contain a field 'duck' which is an instance of 'Duck'.`);

export default {
  entity: PropTypesPlus.allOfType([
    PropTypesEntity.entity,
    PropTypesPlus.withRequired(hasDuck),
  ]),
  entityField: PropTypesPlus.allOfType([
    PropTypesEntity.entityField,
    PropTypesPlus.withRequired(entityFieldHasDuck),
  ]),
};
