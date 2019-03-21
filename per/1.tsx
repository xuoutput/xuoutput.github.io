import * as React from 'react';
import * as cl from 'classnames';
import * as _ from 'lodash';
import { observable, action, runInAction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as moment from 'moment';

import { Icon, Button, Input, Tooltip } from 'antd';
import Col from 'react-icecream/lib/col';

import Table from 'react-icecream/lib/table';
import EmptyTableText from 'components/Common/EmptyTableText';

import Link from 'portal-base/common/components/Router/Link';
import Lightbox from 'react-icecream/lib/lightbox';
import Form from 'react-icecream/lib/form';

import AddMembershipModel from '../Add';
import EditMembershipModel from '../Edit';

const Search = Input.Search;
const FormItem = Form.Item;

import { IProcessedMembershipInfo } from 'api/memberships';
import { listMembershipStore, addMembershipStore, editMembershipStore } from 'stores/memberships';
import { sessionStore } from 'stores/session-v2';

import { messageToast } from 'utils/index-v2';

import './style.less';

@observer
export default class MembershipTable extends React.Component<{}, {}> {
  @observable showAddModel: boolean = false;
  @observable showDeleteModel: boolean = false;
  @observable showEditModel: boolean = false;
  @observable currentMembershipId: number = undefined;
  @observable current: number = 1;

  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    // 过滤条件
    if (sessionStore.isAdmin) {
      await addMembershipStore.getGroupNameList();
      await listMembershipStore.reset();
      await listMembershipStore.getMembershipList({});
    } else {
      await listMembershipStore.reset();
      // 从user得到groupName, 然后得到当前group的所有用户
      await listMembershipStore.getMembershipList({
        userName: toJS(sessionStore.user.email)
      });
      runInAction(() => {
        const groupId = toJS(listMembershipStore.membershipResults.items.length)
          ? listMembershipStore.membershipResults.items[0].id
          : undefined;
        listMembershipStore.userGroup.id = groupId;

        const groupName = toJS(listMembershipStore.membershipResults.items.length)
          ? listMembershipStore.membershipResults.items[0].groupName
          : '';
        listMembershipStore.userGroup.name = groupName;
      });
      await listMembershipStore.getMembershipList({
        groupName: [toJS(listMembershipStore.userGroup.name)]
      });
    }
  };

  componentWillUnmount() {
    addMembershipStore.reset();
    listMembershipStore.reset();
  }

  @action
  toggleAddModel(b: boolean) {
    this.showAddModel = b;
  }

  @action
  toggleDeleteModel(b: boolean) {
    this.showDeleteModel = b;
  }

  @action
  toggleEditModel(b: boolean) {
    this.showEditModel = b;
  }

  deleteMembership = async () => {
    try {
      await listMembershipStore.deleteMembership(this.currentMembershipId);
      messageToast('success', '删除成功');
      sessionStore.isAdmin
        ? await listMembershipStore.getMembershipList({})
        : await listMembershipStore.getMembershipList({
            groupName: [toJS(listMembershipStore.userGroup.name)]
          });
    } catch (err) {
      messageToast('error', err.message);
    } finally {
      this.toggleDeleteModel(false);
    }
  };

  renderAddModel() {
    return this.showAddModel ? <AddMembershipModel onCancel={() => this.toggleAddModel(false)} /> : null;
  }

  renderDeleteMembershipModel() {
    return (
      <Lightbox
        title='是否删除标注单位的用户'
        centerTitle
        className='admin-model'
        visible={this.showDeleteModel}
        onCancel={() => this.toggleDeleteModel(false)}
        footer={null}
        width={693}
      >
        <Form>
          <FormItem>
            <Col span={10} offset={14}>
              <Button type='ghost' className='form-cancel-btn' onClick={() => this.toggleDeleteModel(false)}>
                取消
              </Button>
              <Button
                type='primary'
                className='form-confirm-btn'
                loading={listMembershipStore.loadState === 'loading'}
                onClick={this.deleteMembership}
              >
                确认
              </Button>
            </Col>
          </FormItem>
        </Form>
      </Lightbox>
    );
  }

  renderEditModel() {
    return this.showEditModel ? <EditMembershipModel onCancel={() => this.toggleEditModel(false)} /> : null;
  }

  getColumns() {
    return [
      {
        title: '账号',
        key: 'member.email',
        dataIndex: 'member.email',
        render: (text, record) => (
          <Link to={`/admin/staff/membership/${record.id}/view`} className='email'>
            {text}
          </Link>
        )
      },
      {
        title: '用户名',
        key: 'member.name',
        dataIndex: 'member.name',
        render: (text, record: IProcessedMembershipInfo) => (
          <span
            className={cl({
              deleted: record.userStatus === -1
            })}
          >
            {text}
          </span>
        )
      },
      {
        title: '所属单位名称',
        key: 'groupName',
        dataIndex: 'groupName',
        filteredValue: sessionStore.isAdmin ? toJS(listMembershipStore.tableFilters.groupName) : null,
        filters: sessionStore.isAdmin ? listMembershipStore.groupNameFilters : null,
        onFilter: (value, record) => record.groupName === value,
        render: (text, record: IProcessedMembershipInfo) => (
          <span
            className={cl({
              deleted: record.userStatus === -1
            })}
          >
            {text}
          </span>
        )
      },
      {
        title: '用户类型',
        key: 'userType',
        dataIndex: 'userType',
        filteredValue: toJS(listMembershipStore.tableFilters.userType),
        filters: [{ text: '管理员', value: 'manager' }, { text: '打标人员', value: 'false' }],
        onFilter: (value, record: IProcessedMembershipInfo) => record.userType === value,
        render: (text, record: IProcessedMembershipInfo) => (
          <span
            className={cl({
              deleted: record.userStatus === -1
            })}
          >
            {text === 'manager' ? '管理员' : '打标人员'}
          </span>
        )
      },
      {
        title: '注册日期',
        className: 'time-columns',
        key: 'createTime',
        dataIndex: 'createTime',
        sortOrder: 'descend' as 'descend',
        sorter: (a, b) => {
          return moment(a.createTime).unix() - moment(b.createTime).unix();
        },
        render: (time, record: IProcessedMembershipInfo) => (
          <span
            className={cl({
              deleted: record.userStatus === -1
            })}
          >
            {moment(time).format('YYYY.MM.DD HH:mm:ss')}
          </span>
        )
      },
      {
        title: '操作',
        key: 'op',
        dataIndex: 'op',
        render: (index, record: IProcessedMembershipInfo) => {
          return (
            <div className='table-op'>
              {!(record.userStatus === -1) ? (
                <div>
                  <Icon
                    type='delete'
                    className='operate-icon on-delete'
                    onClick={() => {
                      this.currentMembershipId = record.id;
                      this.toggleDeleteModel(true);
                    }}
                  />
                  <span className='spanner' />
                  {sessionStore.isAdmin ? (
                    <Icon
                      type='edit'
                      className='operate-icon on-edit'
                      onClick={() => {
                        const membership = {
                          id: record.id,
                          member: record.member,
                          groupName: record.groupName,
                          auditStatus: record.auditStatus,
                          userType: record.userType === 'manager' ? 1 : 0,
                          userStatus: record.userStatus,
                          taskType: record.taskType,
                          createTime: record.createTime,
                          updateTime: record.updateTime
                        };
                        runInAction(() => {
                          editMembershipStore.membership = membership;
                        });
                        this.toggleEditModel(true);
                      }}
                    />
                  ) : null}
                </div>
              ) : (
                <span
                  className={cl({
                    deleted: record.userStatus === -1
                  })}
                >
                  已删除
                </span>
              )}
            </div>
          );
        }
      }
    ];
  }

  renderEmptyText() {
    const data = {
      title: '还没有添加单位, 请点击新建单位'
    };
    if (!listMembershipStore.isLoading) {
      return <EmptyTableText {...data} />;
    }
  }

  renderTable() {
    const paginationProps = {
      total: listMembershipStore.membershipResults.total,
      current: this.current,
      pageSize: 12,
      onChange: async (page, pageSize) => {
        runInAction(() => {
          this.current = page;
        });
      }
    };
    return (
      <div className='content-table'>
        <div className='content-table-toolbar'>
          <Button className='admin-btn ad˝min-btn-primary' onClick={() => this.toggleAddModel(true)}>
            添加用户
          </Button>
          <Search
            className='search'
            placeholder='输入账号或用户名搜索'
            onSearch={async (value: string) => {
              listMembershipStore.updateSearchValue(value);
              runInAction(() => {
                this.current = 1;
              });
              await listMembershipStore.getMembershipList({
                groupName: !sessionStore.isAdmin ? [toJS(listMembershipStore.userGroup.name)] : [],
                userName: value
              });
            }}
          />
        </div>
        <Table
          rowKey='id'
          className='admin-table membership-table'
          loading={addMembershipStore.isLoading || listMembershipStore.isLoading}
          dataSource={listMembershipStore.processedMemberships}
          columns={this.getColumns()}
          pagination={paginationProps}
          onChange={async (pagination: any, filters: any, sorter) => {
            listMembershipStore.updateFilters({
              groupName: sessionStore.isAdmin ? filters.groupName : [toJS(listMembershipStore.userGroup.name)],
              auditStatus: [],
              userType: filters.userType
            });
            await listMembershipStore.getMembershipList({
              limit: 12,
              offset: 12 * (this.current - 1)
            });
          }}
          locale={{ emptyText: this.renderEmptyText() }}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTable()}
        {this.renderAddModel()}
        {this.renderDeleteMembershipModel()}
        {this.renderEditModel()}
      </div>
    );
  }
}
