const User = require("../models/User")
const Group = require("../models/Group")

export const addUsersToGroup = (groupId, userIds) => {
    let users = userIds.map(userId => userId)
    sequelize.transaction(function(t) {
        return Group.findByPk(groupId, {transaction: t}).then(function(group){ 
            return group.setProperties(users, {transaction : t});
        });
    });
}