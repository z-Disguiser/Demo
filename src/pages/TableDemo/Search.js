import React, { Fragment, PureComponent } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';

// import Lov from '../../components/Lov/index'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
}

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({

    })
  }

  render() {
    const { form, queryList, deleteData, selectedRowKeys } = this.props;
    const { getFieldDecorator, setFieldsValue, resetFields } = form;
    return (
      <Fragment>
        <Form>
          <Row gutter={24} style={{}}>
            <Col span={18}>
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label='姓名'
                  >
                    {getFieldDecorator('name')(<Input onChange={e => setFieldsValue({ name: e.target.value })} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label='年龄'
                  >
                    {getFieldDecorator('age')(<Input />)
                    }
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label='籍贯'
                  >
                    {getFieldDecorator('nativePlace')(<Input />)
                    }
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label='工号'
                  >
                    {getFieldDecorator('workNumber')(<Input />)
                    }
                  </FormItem>
                  {/* <Lov

                  /> */}
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button onClick={()=>queryList(form)}>
                  查询
                </Button>
                <Button onClick={() => resetFields()}>
                  重置
                </Button>
                <Button onClick={() => deleteData(selectedRowKeys)}>
                  删除
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Fragment>
    )
  }
}

export default Search  = Form.create({})(Search)