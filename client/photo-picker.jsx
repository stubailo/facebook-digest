// @jsx React.DOM

SelectableFacebookPhotosGrid = ReactMeteor.createClass({
  getMeteorState: function () {
    var user = Meteor.user();
    var photos = user && user.profile && user.profile.photos.data;

    if (photos && photos.length) {
      photos = _.first(photos, 12);
    }

    return {
      photos: photos
    };
  },
  render: function () {
    var self = this;

    return <div>
      <h3>Select Photos</h3>

      <ul className="photo-grid">{
        self.state.photos && self.state.photos.map(function (photo) {
          var styleObj = {
            background: "url(" + photo.source + ")"
          };

          return <div className="photo-grid-item" style={styleObj}></div>;
        })
      }</ul>
    </div>;
  }
});