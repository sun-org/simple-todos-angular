Meteor.startup(function () {
  if (Sites.find().count() === 0) {
    console.log("Site empty on server");
    var sites = [
      {
        'name': 'Site 1',
        'description': 'desc1'
      },
      {
        'name': 'Site2',
        'description': 'desc2'
      },
      {
        'name': 'Site3',
        'description': 'desc3'
      }
    ];

    for (var i = 0; i < sites.length; i++) {
      console.log("Site insert : "+i);
      Sites.insert(sites[i]);
    }
  }else {
    console.log("Site not empty on server");
  }
});
