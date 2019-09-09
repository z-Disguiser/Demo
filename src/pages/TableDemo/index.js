import React, { Fragment, useState } from 'react';
import { connect } from 'dva';
import { Table, Divider, Modal } from 'antd';

import Search from './Search'
import UploadButton from '../../components/Upload/index'

function TableDemo({ tableDemo, dispatch }) {
  const { dataSource,file } = tableDemo;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [workNumber, setWorkNumber] = useState(null);

  const selections = [
    {
      key: 'zhang',
      text: '张姓',
      onSelect:()=>{
        let newSelectedRowkeys = [];
        dataSource.forEach(item=>{
          if(item.name[0]==='张'){
            newSelectedRowkeys.push(item.workNumber)
          }
        })
        if(newSelectedRowkeys.sort().join()===selectedRowKeys.sort().join()){
          setSelectedRowKeys([]);
        }else{
          setSelectedRowKeys(newSelectedRowkeys)
        }
      }
    },
    {
      key: 'li',
      text: '李姓',
      onSelect:()=>{
        let newSelectedRowkeys = [];
        dataSource.forEach(item=>{
          if(item.name[0]==='李'){
            newSelectedRowkeys.push(item.workNumber)
          }
        })
        if(newSelectedRowkeys.sort().join()===selectedRowKeys.sort().join()){
          setSelectedRowKeys([]);
        }else{
          setSelectedRowKeys(newSelectedRowkeys)
        }
      }
    }
  ]

  /**
   * 处理表单查询参数
   * @param {Object} payload 表单查询参数 
   */
  const getTableData = (payload)=>{
    for(const key in payload){
      if(!payload[key]){
        delete payload[key]
      }
    }
    return payload;
  };

  /**
   *
   * 获取model数据
   */
  const queryList=({getFieldsValue})=>{
    dispatch({
      type: 'tableDemo/queryList',
      payload: getTableData(getFieldsValue()),
    })
  }

  /**
   * 选中行的onChange
   * @param {Array} selectedRowKeys 选中行的key
   * @param {Array} selectedRows 选中行的数据
   */
  const selectRowsChange=(selectedRowKeys,selectedRows)=>{
    setSelectedRowKeys(selectedRowKeys)
  }

  /**
   * 删除
   * @param {Array} deleteKeys 删除数据的唯一key
   */
  const deleteData=(deleteKeys)=>{
    Modal.confirm({
      title: '确定删除?',
      cancelText: '取消',
      okText: '确定',
      maskClosable:true,
      destroyOnClose:true,
      onOk:()=>{
        dispatch({
          type: 'tableDemo/delete',
          payload: deleteKeys
        })
      }
    })
  }

  /**
   * 上传Modal
   * @param {Boolean} status 上传modal状态
   */
  const changeModal = (status,record)=>{
    setVisible(status);
    if(record && record.workNumber){
      const fileList = file.find(item=>item.workNumber===record.workNumber).fileList
      setFileList(fileList || [])
      setWorkNumber(record.workNumber);
    }
  }

  /**
   * 附件onChange
   * @param {Array} fileList 展示的文件列表
   */
  const onChange=( fileList)=>{
    const newFile = {
      workNumber,
      fileList
    };
    dispatch({
      type: 'tableDemo/upload',
      payload: newFile,
    });
    setFileList(fileList || [])
  }

  const edit=(_,record)=>{

  }

  
  const getColumns = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '居住地',
        dataIndex: 'nativePlace',
      },
      {
        title: '工号',
        dataIndex: 'workNumber',
      },
      {
        title: '工作经验',
        dataIndex: 'workExperience',
      },
      {
        title: '可操作项',
        dataIndex: '1',
        render:((value,record)=>{
          return (
            <Fragment>
              <a onClick={edit}>编辑</a>
              <Divider type="vertical"></Divider>
              <a onClick={()=>deleteData([record.workNumber])}>删除</a>
              <Divider type="vertical"></Divider>
              <UploadButton 
                btnText='上传'
                visible={visible}
                accept='.png'
                fileList={fileList}
                onChange={onChange}
                previewType={true}
                fileType='image/png'
                onCancel={()=>changeModal(false)}
                openModal={()=>changeModal(true,record)}
              />
            </Fragment>
          )
        })
      }
    ];
    return columns;
  }

  return (
    <Fragment>
      <Search
        queryList={queryList}
        deleteData={deleteData}
        selectedRowKeys={selectedRowKeys}
      />
      <Table
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange:selectRowsChange,
          selections
        }}
        dataSource={dataSource}
        columns={getColumns()}
        rowKey='workNumber'
      ></Table>
    </Fragment>
  )
}


export default connect(({ tableDemo = {} }) => ({
  tableDemo
}))(TableDemo);

