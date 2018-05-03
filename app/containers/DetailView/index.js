/**
 *
 * DetailView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, ResponsiveEmbed } from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDetailView from './selectors';
import reducer from './reducer';
import saga from './saga';

export class DetailView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.component = null;
    this.state = {
      componentWidth: 300,
      componentHeight: 300,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth - 100,
      componentWidth: this.component.offsetWidth,
      componentHeight: this.component.offsetHeight,
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} ref={(ref) => { this.component = ref; }}>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            {this.props.details.Substance_Name}
          </Modal.Header>
          <Modal.Body>
            <ResponsiveEmbed a16by9>
              <embed src={`http://embed.molview.org/v1/?mode=vsw&smiles=${this.props.details.Structure_SMILES}`} />
            </ResponsiveEmbed>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

DetailView.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  details: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailview: makeSelectDetailView(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'detailView', reducer });
const withSaga = injectSaga({ key: 'detailView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DetailView);
