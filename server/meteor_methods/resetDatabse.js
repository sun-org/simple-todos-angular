//METEOR methods
Meteor.methods({
  resetDatabase: function () {
    console.log("inside meteor");
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    console.log("calling remove");
    Sites.remove({});
    Materials.remove({});
    Collection_Types.remove({});
    Collection_Items.remove({});
    console.log("calling insert");
    Sites.insert({name: "site1", description:"desc1", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
    Sites.insert({name: "site2", description:"desc2", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
    Sites.insert({name: "site3", description:"desc3", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
    Sites.insert({name: "site4", description:"desc4", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});

    Materials.insert({name: "Steel", description:"Steel", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
    Materials.insert({name: "Cement", description:"Steel", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});

    Collection_Types.insert({name: "90 deg. Angle", description:"Bent at 90 degrees", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
    Collection_Types.insert({name: "Rectangle", description:"Rectangle", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
  }
});
