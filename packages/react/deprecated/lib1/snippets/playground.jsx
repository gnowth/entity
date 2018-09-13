/* eslint-disable */
import React from 'react';

const Screen = props => (
  <Screen {...props} entity={ScreenEntity}>
    <Widget
      name="filters"
      component={Form}
    />

    <View
      name="filters"
      component={View}
    />

    <ContainerAPI
      id={someId}
      component={Form}
      entity={FormEntity}
    />
  </Screen>
);

const Form = props => (
  <Form {...props}>
    <Input name="id" component={Widget} />
    <Control name="submit" component={component} />
    <View name="name" component={View} />
    <Context name="df" />
  </Form>
);

