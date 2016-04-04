Meteor.startup(function () {
  if (Materials.find().count() === 0) {
    var materials = [
      {
        'name': 'Material 1',
        'description': 'desc1'
      },
      {
        'name': 'Material 2',
        'description': 'desc2'
      },
      {
        'name': 'Material 3',
        'description': 'desc3'
      }
    ];

    for (var i = 0; i < materials.length; i++) {
      Materials.insert(materials[i]);
    }
  }
});
