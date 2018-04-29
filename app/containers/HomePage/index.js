/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
// import ItemTable from 'components/ItemTable';
import Description from 'components/Description';

import messages from './messages';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    this.data = [{ str: 'hi', num: 1234, bool: 'true', wild: 'bye' },
                { str: 'aahsadpfajwepoifjawoipjfawjef', num: null, bool: 'false', wild: 420 },
                { str: 'aah', num: null, bool: null, wild: null }];
    this.thing = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. /n/nCurabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.';
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Description text={{ long: this.thing }} />
        <Description text={{ short: 'Hi, mom!' }} />
        <Description text={{ short: 'Hi, mom!', long: this.thing }} />
        <Description text={{ short: 'Hi, mom!', long: this.thing, header: 'What is CheMOA?' }} />
      </div>
    );
  }
}
