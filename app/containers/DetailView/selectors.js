import { createSelector } from 'reselect';

/**
 * Direct selector to the detailView state domain
 */
const selectDetailViewDomain = (state) => state.get('detailView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DetailView
 */

const makeSelectDetailView = () => createSelector(
  selectDetailViewDomain,
  (substate) => substate.toJS()
);

export default makeSelectDetailView;
export {
  selectDetailViewDomain,
};
