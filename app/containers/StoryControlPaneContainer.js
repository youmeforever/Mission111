import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showMenu } from '../actions/navActions';
import StoryControlPane from '../components/StoryControlPane';

function mapDispatchToProps(dispatch) {
  return {
    showMenu: () => dispatch(showMenu()),
  };
}

class StoryControlPaneContainer extends Component {
  render() {
    return (
      <StoryControlPane showMenu={this.props.showMenu} />
    );
  }
}

export default connect(undefined, mapDispatchToProps)(StoryControlPaneContainer);
