/**
 *
 * OptionsModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal,
         Row,
         Button,
         Col,
         FormGroup,
         ControlLabel,
         FormControl,
       } from 'react-bootstrap';
import AdvancedOption from 'components/AdvancedOption';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOptionsModal, { makeSelectModelDetails } from './selectors';
import { modelDetails } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  STRING_TYPE,
} from './constants';

export class OptionsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.helper = this.props.helper;
    this.dispatch = this.props.dispatch;
    this.state = this.unwindHelper(this.props.model || 'chemical');
    this.valueChange = this.valueChange.bind(this);
    this.fieldChange = this.fieldChange.bind(this);
    this.compareChange = this.compareChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
    this.props.dispatch(modelDetails((this.props.model || 'chemical')));
  }

  unwindHelper(model) {
    return { data: { ...this.helper.currentQuery }, model };
  }

  fieldType(field) {
    const fieldInfo = this.props.details[this.state.model].filter((detail) => (
      detail.name === field
    ));
    if (fieldInfo.length > 0) {
      return fieldInfo[0].type;
    }
    return false;
  }

  defaultObj(field) {
    let compareType;
    if (this.fieldType(field) === STRING_TYPE) {
      compareType = this.helper.compareType.contains;
    } else {
      compareType = this.helper.compareType.lessThan;
    }
    return { compareType, data: '', logicalOperator: this.helper.logical.and };
  }

  handleModelChange(e) {
    const modelName = e.target.value;
    this.props.dispatch(modelDetails(modelName));
    this.helper.modelName = modelName;
    this.setState({ data: {}, model: modelName });
  }

  valueChange(e, id, index) {
    const isArray = Array.isArray(this.state.data[id].data);
    const data = { ...this.state.data };
    let newData = isArray ? [...data[id].data] : data[id].data;
    if (isArray) {
      newData[index] = e.target.value;
    } else {
      newData = e.target.value;
    }
    data[id] = { ...data[id], data: newData };
    this.setState({ data });
  }

  fieldChange(e, id) {
    const field = e.target.value;
    const data = { ...this.state.data };
    if (this.fieldType(field) !== this.fieldType(id)) {
      data[field] = this.defaultObj(field);
      delete data[id];
    } else {
      data[field] = { ...data[id] };
      delete data[id];
    }
    this.setState({ data });
  }

  compareChange(e, id) {
    const newCompare = e.target.value;
    let initialData;
    if (newCompare === this.helper.compareType.between) {
      initialData = [];
    } else {
      initialData = '';
    }
    const data = { ...this.state.data };
    data[id] = { ...data[id], data: initialData, compareType: newCompare };
    this.setState({ data });
  }

  handleAddOption() {
    const data = { ...this.state.data, newOption: null };
    this.setState({ data });
  }

  saveOptions() {
    this.helper.currentQuery = this.state.data;
    this.helper.modelName = this.state.model;
  }

  render() {
    const model = this.state.model;
    const details = this.props.details[model];
    let data = null;

    // if the details are available then populate the field options
    if (details && details.length > 0) {
      const fieldOptions = [];
      for (let i = 0; i < details.length; i += 1) {
        const detail = details[i];
        // only grabbing default values
        if (detail.isDefault) {
          fieldOptions.push({ value: detail.name, text: detail.name, type: detail.type });
        }
      }
      // the actual form data for each one
      data = Object.keys(this.state.data).map((key) => (
        <AdvancedOption
          key={key}
          id={key}
          dataFields={fieldOptions}
          data={this.state.data[key]}
          handleCompareChange={this.compareChange}
          handleValueChange={this.valueChange}
          handleFieldChange={this.fieldChange}
        />
        )
      );
    }
    return (
      <Modal
        show={this.props.show}
        onHide={() => { this.saveOptions(); this.props.onHide(); }}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <FormattedMessage {...messages.header} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={5} smOffset={1}>
              <Button bsStyle="success" onClick={this.handleAddOption}>Add Search Option</Button>
            </Col>
            <Col sm={3} smOffset={3} >
              <Button bsStyle="primary" onClick={this.saveOptions}>Save Options</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4} smOffset={4}>
              <FormGroup controlId={'formControlAdvancedOptionmodel'} >
                <ControlLabel>
                  <FormattedMessage id={'app/containers/OptionsModal/ModelLabel'} defaultMessage={'Which model would you like to search?'} />
                </ControlLabel>
                <FormControl componentClass="select" placeholder="ModelName" onChange={this.handleModelChange} value={this.state.model} >
                  <option default value="select">Select...</option>
                  <option value="chemical">Chemical</option>
                  <option value="target">Target</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          { data }
        </Modal.Body>
      </Modal>
    );
  }
}

OptionsModal.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  helper: PropTypes.object.isRequired,
  details: PropTypes.object,
  model: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  optionsmodal: makeSelectOptionsModal(),
  details: makeSelectModelDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'optionsModal', reducer });
const withSaga = injectSaga({ key: 'optionsModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OptionsModal);
