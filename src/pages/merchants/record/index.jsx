import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  message, Table,
} from 'antd';
import React, {Component, Fragment} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;


const statusMap = {
  '0': 'default',
  '1': 'processing',
  '2': 'success',
  '3': 'success',
  '-2': 'error',
  '-3': 'error',
};
const label = {
  '0': 'pay',
  '1': 'sh',
  '2': 'qy',
  '3': 'result',
  '-2': 'sh',
}

/* eslint react/no-multi-comp:0 */
@connect(({merchantsAndRecord, loading}) => ({
  data: merchantsAndRecord.data,
  loading: loading.models.merchantsAndRecord,
}))
class TableList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  searchData = {};

  columns = [
    {
      title: '申请单号',
      dataIndex: 'business_code',
    },
    {
      title: '收款名称',
      dataIndex: 'account_name',
    },
    {
      title: '申请姓名',
      dataIndex: 'id_card_name',
    },

    {
      title: '费率',
      dataIndex: 'rate',
      needTotal: true,
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      render(val,r) {
        return  <span>{r.status !== "0" ? '已支付': '未支付'}</span>
      },
    },
    {
      title: '系统审核',
      render: (val, r) => <span>未通过</span>,
    },
    {
      title: '微信审核',
      render: (val, r) => <span>未通过</span>,
    },
    {
      title: '进度',
      render: (val, r) => <Badge status={statusMap[r.status+'']} text={r.status_string}/>,
    },
    {
      title: '状态',
      dataIndex: 'merchant_shortname',
    },
    {
      title: '申请时间',
      dataIndex: 'ctime',
      sorter: true,
      render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>详情</a>
          <br/>
          {
           record.status !== '-3' ? <a onClick={() => this.handleLook(record)}>查看申请状态</a> : null
          }

        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'merchantsAndRecord/fetchMerchantsList'});

  }
  handleLook = data => {
    console.log(data, label[data.status]);
    this.props.history.push('/merchants/apply?setup='+ label[data.status] +'&id=' + data.id);
  }
  handleStandardTableChange = pagination => {
    const {dispatch} = this.props;
    const params = {
      ...this.searchData,
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'merchantsAndRecord/fetchMerchantsList',
      payload: params,
    });
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'merchantsAndRecord/fetchMerchantsList',
        payload: {
          ...values,
          page: 1,
          pageSize: 10,
        },
      }).then(res => {
        this.searchData = JSON.parse(JSON.stringify(values));
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  renderSimpleForm() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="申请单号">
              {getFieldDecorator('business_code')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="申请手机号">
              {getFieldDecorator('contact_phone')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="申请单号">
              {getFieldDecorator('business_code')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="申请姓名">
              {getFieldDecorator('id_card_name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号码">
              {getFieldDecorator('contact_phone')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          {/*<Col md={8} sm={24}>*/}
          {/*  <FormItem label="更新日期">*/}
          {/*    {getFieldDecorator('date')(*/}
          {/*      <DatePicker*/}
          {/*        style={{*/}
          {/*          width: '100%',*/}
          {/*        }}*/}
          {/*        placeholder="请输入更新日期"*/}
          {/*      />,*/}
          {/*    )}*/}
          {/*  </FormItem>*/}
          {/*</Col>*/}
          <Col md={8} sm={24}>
            <FormItem label="系统审核">
              {getFieldDecorator('status3')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">不限</Option>
                  <Option value="1">未通过</Option>
                  <Option value="1">已通过</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="微信审核">
              {getFieldDecorator('status4')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">不限</Option>
                  <Option value="1">未通过</Option>
                  <Option value="1">已通过</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="申请进度">
              {getFieldDecorator('status5')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="收款名称">
              {getFieldDecorator('merchant_shortname')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              float: 'right',
              marginBottom: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              onClick={this.handleFormReset}
            >
              重置
            </Button>
            <a
              style={{
                marginLeft: 8,
              }}
              onClick={this.toggleForm}
            >
              收起 <Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {loading, data} = this.props;
    const {list, pagination} = data;
    const {selectedRows, modalVisible, updateModalVisible, stepFormValues} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              rowKey={'id'}
              dataSource={list}
              loading={loading}
              columns={this.columns}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(TableList);
