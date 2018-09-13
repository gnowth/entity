import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class UIModal extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.top = '0';
    this.container.style.right = '0';
    this.container.style.bottom = '0';
    this.container.style.left = '0';
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.container,
    );
  }
}

UIModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UIModal;
