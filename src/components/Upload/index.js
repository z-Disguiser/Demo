import React, { Fragment, Component } from 'react';
import { Modal,Upload, Icon, message } from 'antd';

import { Bind } from 'lodash-decorators';
import { isFunction } from 'util';

export default class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  // componentDidMount(){
  //   const { record } = this.props;
  //   this.setState({
  //     fileList:record.fileList
  //   })
  // }

  @Bind()
  beforeUpload(file){
    const { fileType, fileSize= 10 * 1024 * 1024, beforeUpload } = this.props;
    if(fileType && fileType.indexOf(file.type)===-1){
      file.status = 'error';
      message.error(`上传类型必须为${fileType}`)
      return false;
    }
    if(fileSize<file.size){
      file.status = 'error';
      message.error(`上传文件大小不能超过: ${fileSize / (1024 * 1024)} MB`)
      return false;
    }
    if(beforeUpload){
      beforeUpload();
    }
    return true
  }

  @Bind()
  onChange({fileList}){
    const { onChange } = this.props;
    if(onChange && isFunction(onChange)){
      onChange(fileList)
    }
  }

  render() {
    const {
      accept,
      btnText,
      visible,
      fileList,
      onCancel,
      openModal,
    } = this.props;
    // const{
    // } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );

    const modalContent = (
      <Fragment>
        <Upload
          onChange={this.onChange}
          accept={accept}
          name="avatar"
          fileList={fileList}
          listType="picture-card"
          beforeUpload={this.beforeUpload}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          {uploadButton}
        </Upload>
      </Fragment>
    )

    return (
      <Fragment>
        <a
          onClick = {openModal}
        >
          {btnText}
        </a>
        <Modal
          footer={null}
          visible={visible}
          onCancel={onCancel}
          maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          {modalContent}
        </Modal>
      </Fragment>
    )
  }
}