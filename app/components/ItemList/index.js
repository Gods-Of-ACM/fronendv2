/**
*
* ItemList
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PropType from 'prop-types';
import NoImgFound from 'images/no_image_available.png';

class ItemList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props); // headervals len should = todisplay
    this.genList = this.genList.bind(this);
    this.genItem = this.genItem.bind(this);
    this.picKeys = [];
  }
  genList(dataArray, picKeys) {
    const toRender = [];
    for (let i = 0, len = dataArray.length; i < len; i += 1) {
      toRender.push(this.genItem(dataArray[i], picKeys));
    }
    return <tbody>{toRender}</tbody>;
  }
  genItem(obj, picKeys) {
    const keys = Object.keys(obj);
    let pic = null;
    const items = [];
    for (let i = 0, len = keys.length; i < len; i += 1) {
      const key = keys[i];
      if (obj[key] && obj[key].toString().slice(0, 4) === 'http') {
        pic = obj[key];
        picKeys.push(key);
      } else if (!picKeys.includes(key)) { // don't display keys proven to be pics
        items.push(
          <Table style={{ padding: 0, margin: 0 }}>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}><strong>{key}:</strong>{` ${obj[key]}` || ''}</td>
              </tr>
            </tbody>
          </Table>
        );
      }
    }

    return (
      <tr>
        <td style={{ width: '250px' }}>
          <img
            alt=""
            src={pic || NoImgFound}
            style={{
              width: '200px',
              height: 'auto',
              margin: 'auto',
              display: 'block' }}
          />
        </td>
        <td>{items || ''}</td>
      </tr>
    );
  }
  render() {
    console.log(this.props.data);
    const toDisplay = this.genList(this.props.data, this.picKeys);
    return (
      <Table striped bordered condensed hover style={{ maxWidth: '1200px', margin: 'auto' }}>
        {toDisplay}
      </Table>
    );
  }
}

ItemList.propTypes = {
  data: PropType.array,
};

export default ItemList;
