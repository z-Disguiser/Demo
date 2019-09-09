import React, { Fragment, Component } from 'react'
import { Input, Button, Icon } from 'antd';

import styles from './index.less'

export default class Lov extends Component {
  constructor(props) {
    super(props);
    this.state = ({

    })
  };

  render() {
    const {
      isButtom
    } = this.props;
    const suffix = (
      <Fragment>
        <Icon
          type="close-circle"
          className={styles['close-circle']}
        />
      </Fragment>
    );
    return (
      <Fragment>
        {
          isButtom ? ( <Button></Button> ) :
          (<Input
            suffix= {suffix}
          />)
        }
      </Fragment>
    )
  }
}