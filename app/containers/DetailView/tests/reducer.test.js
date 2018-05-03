
import { fromJS } from 'immutable';
import detailViewReducer from '../reducer';

describe('detailViewReducer', () => {
  it('returns the initial state', () => {
    expect(detailViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
