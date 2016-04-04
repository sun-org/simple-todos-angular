Meteor.startup(function () {
  if (Collection_Types.find().count() === 0) {
    var types = [
      {
        'name': 'Type 1',
        'description': 'desc1'
      },
      {
        'name': 'Type 2',
        'description': 'desc2'
      },
      {
        'name': 'Type 3',
        'description': 'desc3'
      }
    ];

    for (var i = 0; i < types.length; i++) {
      Collection_Types.insert(types[i]);
    }
  }
});
