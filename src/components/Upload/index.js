import React, { Fragment, Component } from 'react';
import { Modal,Upload, Icon, message } from 'antd';

import { Bind } from 'lodash-decorators';
import { isFunction } from 'util';

export default class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      previewImage: '',
      previewVisible:false,
    }
  }

  // componentDidMount(){
  //   const { record } = this.props;
  //   this.setState({
  //     fileList:record.fileList
  //   })
  // }

  @Bind()
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

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

  /**
   * 图片预览
   * @param {*} file
   */
  @Bind()
  async handlePreview(file){
    console.log(file)
    const { preview } = this.props;
    if(preview){
      if(!file.url && !file.preview){
        file.preview = await this.getBase64(file.originFileObj);
      }
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      })
    }else{
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail);
    }
  }
    

  render() {
    const {
      accept,
      single,
      btnText,
      visible,
      fileList,
      onCancel,
      openModal,
    } = this.props;
    const{
      previewImage,
      previewVisible,
    } = this.state;

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
          onPreview={this.handlePreview}
          fileList={fileList}
          listType="picture-card"
          beforeUpload={this.beforeUpload}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          {single && fileList.length<1 && uploadButton}
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
        <Modal
          footer={null}
          closable={false}
          visible={previewVisible}
          onCancel={()=>this.setState({previewVisible:false})}
        >
          <img alt='' src={previewImage} style={{width:"100%"}}/>
        </Modal>
      </Fragment>
    )
  }
}