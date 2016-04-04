//METEOR methods
Meteor.methods({
  addQuantity: function (site, material, type, quantity) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(site, material, type, quantity);

    Collection_Items.insert({
      site: site,
      material: material,
      type: type,
      quantity: quantity,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});
