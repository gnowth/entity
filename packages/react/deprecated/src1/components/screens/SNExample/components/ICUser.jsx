import React from 'react';
import PropTypes from 'prop-types';
import PropTypesImmutable from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { compose } from 'redux';

import { User as UserEntity } from 'entities';

class ICUser extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.listUsers();
    this.props.getUserOptions();
  }

  render() {
    return (
      <div>
        <div>
          User:
          <div>{`id: ${this.props.user.get('id')}`}</div>
          <div>{`username: ${this.props.user.get('username')}`}</div>
        </div>

        <br />
        <div>
          <div>User List</div>

          <div>
            { this.props.users.map(user => (
              <div key={user.get('id')}>
                <div>{`id: ${user.get('id')}`}</div>
                <div>{`username: ${user.get('username')}`}</div>
              </div>
            ))}
          </div>
        </div>

        <br />
        <div>
          <div>Actions:</div>
          { this.props.userOptions.get('actions', Map()).keySeq().map(value => (
            <div key={value}>{value}</div>
          )).toList()}
        </div>

        <br />
      </div>
    );
  }
}

ICUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypesImmutable.map.isRequired,
  listUsers: PropTypes.func.isRequired,
  users: PropTypesImmutable.list.isRequired,
  getUserOptions: PropTypes.func.isRequired,
  userOptions: PropTypesImmutable.map.isRequired,
};

export default compose(
  UserEntity.duck.connectActions({
    getUser: ({ actions }) => actions.get({ id: 34 }),
    listUsers: ({ actions }) => actions.list(),
    getUserOptions: ({ actions }) => actions.options(),
  }),
  UserEntity.duck.connectSelectors({
    user: ({ selectors }) => selectors.record({ id: 34 }),
    users: ({ selectors }) => selectors.records(),
    userOptions: ({ selectors }) => selectors.options(),
  }),
)(ICUser);
