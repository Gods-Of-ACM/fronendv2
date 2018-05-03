/**
 *
 * SearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Nav, NavItem, Panel, Col, Row, Button } from 'react-bootstrap';
import ItemTable from 'components/ItemTable';
import DetailView from 'containers/DetailView';
import FloatingButton from 'components/FloatingButton';
import OptionsModal from 'containers/OptionsModal';
import AdvancedQueryHelper from 'utils/advancedQuery';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchPage, { makeSelectSearchResults, makeSelectSearchType, makeSelectSearchedQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { basicSearch, advancedSearch } from './actions';

export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.tableNames = ['No Results for Current Query'];
    this.handleSelect = this.handleSelect.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    let query = props.location.search;
    if (query.length > 3) {
      query = query.slice(3);
      props.dispatch(basicSearch(query));
    }

    this.helper = new AdvancedQueryHelper('chemical');

    this.state = {
      currentTable: 0,
      details: {
        show: false,
        id: null,
      },
      options: {
        show: false,
      },
    };
  }

  handleSelect(table) {
    this.setState({ currentTable: table });
  }

  displayDetails(id) {
    this.setState({ details: { show: true, id } });
  }

  showOptions() {
    this.setState({ options: { show: true } });
  }

  closeModal() {
    this.setState({ options: { show: false } });
  }

  updateOptions() {
    this.props.dispatch(advancedSearch(this.tableNames[this.state.currentTable], this.helper.serialize()));
    this.setState({ options: { show: false } });
  }

  render() {
    // Results will be an array for advanced search
    // and an object for basic
    const needTabs = !Array.isArray(this.props.results);
    const isAdvanced = Array.isArray(this.props.results);
    const tabs = [];
    let itemTable = null;
    if (!needTabs) {
      tabs.push(
        <NavItem eventKey={0} key={1} active>
          {this.helper.modelName}
        </NavItem>
      );

      itemTable = (
        <ItemTable data={this.props.results} handleClick={this.displayDetails} />
      );
    } else {
      this.tableNames = Object.keys(this.props.results);
      this.tableNames.forEach((elm, idx) => {
        if (idx === this.state.currentTable) {
          tabs.push(
            <NavItem eventKey={idx} key={idx.toString()} active>
              {elm}
            </NavItem>
          );
        } else {
          tabs.push(
            <NavItem eventKey={idx} key={idx.toString()}>
              {elm}
            </NavItem>
          );
        }
      });

      if (this.tableNames.length !== 0 && this.props.results[this.tableNames[this.state.currentTable]].length !== 0) {
        itemTable = (
          <ItemTable data={this.props.results[this.tableNames[this.state.currentTable]]} handleClick={this.displayDetails} />
        );
      } else {
        itemTable = (
          <Row style={{ padding: '20px' }}>
            <Col md={6} mdOffset={3}>
              <Panel bsStyle="info">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    <FormattedMessage {...messages.noResults} />
                  </Panel.Title>
                </Panel.Heading>
              </Panel>
            </Col>
          </Row>
        );
      }
    }

    return (
      <div style={{ marginTop: '50px' }}>
        <Row>
          <Col xs={10} xsOffset={1}>
            <div style={{ marginBottom: '25px' }}>
              <Button onClick={this.showOptions}>Advanced Search</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Panel bsStyle="info">
              <Panel.Body>
                {`Showing results for search: ${this.props.searchedQuery}`}
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Helmet>
              <title>SearchPage</title>
              <meta name="description" content="Description of SearchPage" />
            </Helmet>
            {
              (tabs.length !== 0) ?
              (<Nav bsStyle="tabs" onSelect={(k) => this.handleSelect(k)}>
                {tabs}
              </Nav>) : ''
            }
            <Panel>
              {itemTable}
            </Panel>
            {
              (this.state.details.show && this.tableNames[this.state.currentTable] === 'chemical') ? (
                <DetailView show={this.state.details.show} onClose={this.closeModal} details={this.props.results[this.tableNames[this.state.currentTable]][this.state.details.id]} />
              ) :
              null
            }
          </Col>
        </Row>
        <OptionsModal model={this.tableNames[this.state.currentTable]} show={this.state.options.show} onHide={this.updateOptions} helper={this.helper} />
        <FloatingButton isAdvanced={isAdvanced} query={this.props.searchedQuery} />
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
  searchedQuery: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchpage: makeSelectSearchPage(),
  results: makeSelectSearchResults(),
  searchType: makeSelectSearchType(),
  searchedQuery: makeSelectSearchedQuery(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchPage', reducer });
const withSaga = injectSaga({ key: 'searchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
