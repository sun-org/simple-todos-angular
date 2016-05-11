Meteor.publish('tasks', function (options) {
  let selector = {
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  };
  Counts.publish(this, 'numberOfParties', Tasks.find(selector), {noReady: true});
  return Tasks.find(selector, options);
});

Meteor.publish('sites', function () {
  return Sites.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

Meteor.publish('materials', function () {
  return Materials.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

Meteor.publish('types', function () {
  return Collection_Types.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

Meteor.publish('items', function () {
  return Collection_Items.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});
