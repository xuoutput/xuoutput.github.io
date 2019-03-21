'use strict';

const constants = require('../util/constants');
const DATASET_STATUS = constants.DATASET_STATUS;

module.exports = app => {
  class MembershipService extends app.Service {
    /**
     * create membership
     * @param {Object} params - membership informations
     * @param {string} params.groupId - group id, need to be unique
     * @param {string} params.users - user ids, need to be unique
     * @return {Promise} promise represented created membership information
     */
    async create(params) {
      const { groupId, users } = params;

      const transaction = await this.ctx.model.transaction();

      try {
        const memberships = [];
        for (const user of users) {
          memberships.push({
            groupId,
            userId: user,
            userType: 0,
            status: 0
          });
        }

        const membership = await this.ctx.model.Membership.bulkCreate(
          memberships,
          {
            transaction
          }
        );

        await transaction.commit();
        return {
          id: membership.map(row => row.get({ plain: true }))[0].group_id
        };
      } catch (err) {
        this.logger.error(err);
        await transaction.rollback();

        throw err;
      }
    }

    /**
     * find all memberships
     * @param {Object} params - search conditions
     * @param {string} params.userName - search for users
     * @param {string} params.groupName - which users in this group
     * @param {string} params.auditStatus - memberships rows auditStatus
     * @param {boolean} params.hideDeleted - search for user which is deleted
     * @param {number} params.offset - memberships rows offset
     * @param {number} params.limit - how many memberships should be returned
     * @return {Promise} promise represented found memberships information
     */
    async findAll(params) {
      const {
        userName,
        groupName,
        auditStatus,
        userType,
        hideDeleted,
        limit,
        offset
      } = params;

      const transaction = await this.ctx.model.transaction();
      try {
        let rs = await this.ctx.model.query(
          `
          SELECT SQL_CALC_FOUND_ROWS
            Memberships.id,
            Memberships.group_id AS groupId,
            Memberships.user_id AS userId,
            Memberships.user_type AS userType,
            Memberships.status AS userStatus,
            Memberships.created_at AS createTime,
            Memberships.updated_at AS updateTime,
            Groups.name AS groupName,
            Users.email,
            Users.name AS userName
          FROM memberships AS Memberships
          LEFT JOIN groups AS Groups ON Groups.id = Memberships.group_id
          LEFT JOIN users AS Users ON Users.id = Memberships.user_id
          WHERE Memberships.id != -1
          ${userName ? `AND Users.email LIKE '%${userName}%'` : ''}
          ${groupName.length ? 'AND Groups.name IN ($groupName)' : ''}
          ${userType.length ? 'AND Memberships.user_type IN ($userType)' : ''}
          ${hideDeleted ? `AND Memberships.status = (${!hideDeleted})` : ''}
          LIMIT $offset, $limit
          `,
          {
            type: app.model.QueryTypes.SELECT,
            bind: {
              userName,
              groupName,
              auditStatus,
              userType,
              hideDeleted,
              offset: offset ? offset : 0,
              limit
            },
            transaction
          }
        );

        const totalRows = await this.ctx.model.query(
          'SELECT FOUND_ROWS() as total',
          {
            type: app.model.QueryTypes.SELECT,
            transaction
          }
        );

        rs = rs.map(item => {
          return {
            id: item.id,
            member: {
              id: item.userId,
              name: item.userName,
              email: item.email
            },
            groupName: item.groupName,
            auditStatus: '',
            userType: item.userType,
            userStatus: item.userStatus,
            taskType: '',
            createTime: item.createTime,
            updateTime: item.updateTime
          };
        });

        await transaction.commit();

        return {
          items: rs,
          total: totalRows[0].total
        };
      } catch (err) {
        await transaction.rollback();
        this.logger.error(err);
        throw err;
      }
    }
    /**
     * find all idle users
     * @param {Object} params - search conditions
     * @param {string} params.userName - search user
     * @return {Promise} promise represented found idle users information
     */
    async findAllIdle(params) {
      const { userName } = params;

      const transaction = await this.ctx.model.transaction();
      try {
        const rs = await this.ctx.model.query(
          `
          SELECT
            Users.id,
            Users.email,
            Users.name,
            Memberships.user_type AS userType
          FROM users AS Users
          LEFT JOIN memberships AS Memberships ON Users.id = Memberships.user_id
          WHERE Memberships.user_type IS NULL AND Users.email = $userName
          `,
          {
            type: app.model.QueryTypes.SELECT,
            bind: {
              userName
            },
            transaction
          }
        );

        await transaction.commit();

        return {
          items: rs,
          total: rs.length
        };
      } catch (err) {
        await transaction.rollback();
        this.logger.error(err);
        throw err;
      }
    }

    /**
     * find membership
     * @param {Object} conditions - conditions to match membership
     * @param {number} conditions.id - membership id
     * @return {Promise} promise represented found membership information
     */
    async findOne(conditions) {
      const { id } = conditions;

      const transaction = await this.ctx.model.transaction();
      try {
        let rs = await this.ctx.model.query(
          `
          SELECT
            Memberships.id,
            Memberships.group_id AS groupId,
            Memberships.user_id AS userId,
            Groups.name AS groupName,
            Users.email,
            Users.name AS userName
          FROM memberships AS Memberships
          LEFT JOIN groups AS Groups ON Groups.id = Memberships.group_id
          LEFT JOIN users AS Users ON Users.id = Memberships.user_id
          WHERE Memberships.id = $id
          `,
          {
            type: app.model.QueryTypes.SELECT,
            bind: {
              id
            },
            transaction
          }
        );

        rs = rs.map(item => {
          return {
            id: item.id,
            member: {
              id: item.userId,
              name: item.userName,
              email: item.email
            },
            group: {
              id: item.groupId,
              name: item.groupName
            }
          };
        });

        await transaction.commit();

        return rs;
      } catch (err) {
        await transaction.rollback();
        this.logger.error(err);
        throw err;
      }
    }

    /**
     * find membership datasets
     * @param {Object} conditions - conditions to match membership
     * @param {number} conditions.id - membership id
     * @param {string} query.startDate - start date
     * @param {string} query.endDate - end data
     * @param {Array} conditions.mimes - mime type
     * @param {string} conditions.sortField - search for user which is sorted by field
     * @param {string} conditions.sortOrder - search for user which is sorted order
     * @param {string} conditions.offset - pagination offset
     * @param {number} conditions.limit - limit number of every page
     * @return {Promise} promise represented found membership information
     */
    async findOneDatasets(conditions) {
      const {
        id,
        startDate,
        endDate,
        mimes,
        sortField,
        sortOrder,
        offset,
        limit
      } = conditions;

      const transaction = await this.ctx.model.transaction();
      try {
        const membershipInfo = await this.findOne({ id });

        const rs = await this.ctx.model.query(
          `
          SELECT SQL_CALC_FOUND_ROWS
            Datasets.id AS id,
            Datasets.title AS title,
            Datasets.data_package_id AS dataPackageId,
            DataPackages.name AS dataPackageName,
            DataPackages.pre_label AS dataPackagePreLabel,
            DataPackages.status AS dataPackageStatus,
            DataPackages.sand_ratio AS dataPackageSandRatio,
            DataPackages.data_length AS dataPackageDataLength,
            DataPackages.dataset_length AS dataPackageDatasetLength,
            DataPackages.finish_time AS dataPackageFinishTime,
            DataPackages.created_at AS dataPackageCreatedAt,
            DataPackages.updated_at AS dataPackageUpdatedAt,
            TaskTypes.id AS taskTypeId,
            TaskTypes.name AS taskTypeName,
            TaskTypes.type AS taskTypeType,
            TaskTypes.sub_type AS taskTypeSubType,
            TaskTypes.mime AS taskTypeMime,
            Datasets.ready AS ready,
            Assignments.updated_at AS assignmentTime,
            Datasets.updated_at AS finishTime
            FROM assignments AS Assignments
            LEFT JOIN datasets AS Datasets ON Assignments.dataset_id = Datasets.id
            LEFT JOIN data_packages AS DataPackages ON Datasets.data_package_id = DataPackages.id
            LEFT JOIN task_types AS TaskTypes ON DataPackages.task_type_id = TaskTypes.id
            WHERE Assignments.user_id = $userId
            AND Datasets.data_package_id IS NOT NULL
            AND Datasets.created_at >= $startDate AND Datasets.updated_at < $endDate
            ${mimes.length ? 'AND TaskTypes.mime IN ($mimes)' : ''}
            ORDER BY ${sortField === '' ? 'assignmentTime' : sortField} ${
            sortOrder === 'ascend' ? 'ASC' : 'DESC'
          }
            LIMIT $offset, $limit
          `,
          {
            type: app.model.QueryTypes.SELECT,
            bind: {
              userId: membershipInfo[0].member.id,
              startDate,
              endDate,
              mimes,
              sortField,
              sortOrder,
              offset,
              limit
            },
            transaction
          }
        );

        const totalRows = await this.ctx.model.query(
          'SELECT FOUND_ROWS() as total',
          {
            type: app.model.QueryTypes.SELECT,
            transaction
          }
        );

        const datasetIds = rs.map(item => item.id);

        let datasetCount = [];
        let datasetReviewPassCount = [];
        if (datasetIds.length) {
          const sqlCount = `
          SELECT count(d.id) AS count, d.id AS datasetId
          FROM datasets d
          LEFT JOIN assignments a ON a.dataset_id = d.id
          LEFT JOIN images i ON i.dataset_id = d.id
          WHERE d.id IN ($datasetIds)
          AND a.user_id = $userId
          GROUP BY d.id
          `;

          datasetCount = await this.app.model.query(sqlCount, {
            bind: {
              datasetIds,
              userId: membershipInfo[0].member.id
            },
            type: this.app.model.QueryTypes.SELECT
          });

          const sqlReviewPassCount = `
          SELECT count(d.id) AS count, d.id AS datasetId
          FROM datasets d
          LEFT JOIN assignments a ON a.dataset_id = d.id
          LEFT JOIN images i ON i.dataset_id = d.id
          LEFT JOIN classifications c ON c.image_id = i.id
          WHERE d.id IN ($datasetIds)
          AND a.user_id = $userId
          AND c.user_id = $userId
          AND d.ready = ${DATASET_STATUS.reviewed}
          AND c.option_id IS NOT NULL
          GROUP BY d.id
          `;

          datasetReviewPassCount = await this.app.model.query(
            sqlReviewPassCount,
            {
              bind: {
                datasetIds,
                userId: membershipInfo[0].member.id
              },
              type: this.app.model.QueryTypes.SELECT
            }
          );
        }

        await transaction.commit();

        const res = rs.map(item => {
          return {
            id: item.id,
            title: item.title,
            dataPackage: {
              id: item.dataPackageId,
              name: item.dataPackageName,
              preLabel: item.dataPackagePreLabel,
              status: item.dataPackageStatus,
              sandRatio: item.dataPackageSandRatio,
              dataLength: item.dataPackageDataLength,
              datasetLength: item.dataPackageDatasetLength,
              finishTime: item.dataPackageFinishTime,
              createTime: item.dataPackageCreatedAt,
              updateTime: item.dataPackageUpdatedAt,
              taskType: {
                id: item.taskTypeId,
                name: item.taskTypeName,
                type: item.taskTypeType,
                subType: item.taskTypeSubType,
                mime: item.taskTypeMime
              }
            },
            status: item.ready,
            count:
              datasetCount.find(elem => elem.datasetId === item.id) &&
              datasetCount.find(elem => elem.datasetId === item.id).count,
            reviewPassCount:
              datasetReviewPassCount.find(elem => elem.datasetId === item.id) &&
              datasetReviewPassCount.find(elem => elem.datasetId === item.id)
                .count,
            assignmentTime: item.assignmentTime,
            finishTime: item.finishTime
          };
        });

        return {
          total: totalRows[0].total,
          items: res
        };
      } catch (err) {
        await transaction.rollback();
        this.logger.error(err);
        throw err;
      }
    }

    /**
     * update membership
     * @param {Object} conditions - conditions to match membership
     * @param {number} conditions.id - membership id
     * @param {Object} info - updated membership information
     * @param {string} info.groupId - membership groupId, need to be unique
     */
    async update(conditions, info) {
      this.ctx.throw(400, info + '开发中');
    }

    /**
     * delete membership
     * @param {Obejct} conditions - conditions to match membership records
     * @param {number} conditions.id - membership id
     * @return {Promise} promise represent deleted information
     */
    async delete(conditions) {
      const { id } = conditions;

      if (!id) {
        this.ctx.throw(404, '标注人员不存在');
      }

      const transaction = await this.ctx.model.transaction();

      try {
        const rs = await this.ctx.model.Membership.update(
          {
            userType: 0,
            status: -1
          },
          {
            where: {
              id
            },
            transaction
          }
        );

        if (rs[0] === 0) {
          this.ctx.throw(404, '标注人员不存在');
        } else {
          await transaction.commit();
          return {
            id: rs
          };
        }
      } catch (err) {
        this.logger.error(
          'error occoured when mark membership as deleted: %j',
          err
        );
        await transaction.rollback();
        throw err;
      }
    }

    /**
     * remove all membership for unit test
     * @return {Promise} remove all membership
     */
    async removeAllMemberships() {
      const transaction = await this.ctx.model.transaction();

      try {
        const r = await this.app.model.Membership.destroy({
          where: {},
          cascade: true
        });

        await transaction.commit();
        return {
          r
        };
      } catch (err) {
        this.logger.error(
          'error occoured when remove all membership: %s',
          err.message
        );

        await transaction.rollback();

        throw err;
      }
    }
  }

  return MembershipService;
};
