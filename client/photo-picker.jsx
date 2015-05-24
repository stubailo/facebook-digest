// @jsx React.DOM

SelectablePhotoSquare = ReactMeteor.createClass({
  onClick: function () {
    this.props.onSelectToggle();
  },
  render: function () {
    var self = this;

    var photo = self.props.photo;

    var styleObj = {
      background: "url(" + photo.source + ")"
    };

    var className = "photo-grid-item";

    if (this.props.selected) {
      className += " selected";
    }

    return <div className={className}
      style={styleObj}
      onClick={self.onClick}></div>
  }
});

SelectableFacebookPhotosGrid = ReactMeteor.createClass({
  // This many more are displayed when you
  // click "show more"
  photosPerPage: 12,
  getInitialState: function () {
    return {
      // Object of photo id to true
      selected: {},
      photos: [],
      numPhotosToDisplay: 12
    };
  },
  getMeteorState: function () {
    var user = Meteor.user();
    var photos = user && user.profile && user.profile.photos.data;

    if (photos && photos.length) {
      photos = _.first(photos, this.state.numPhotosToDisplay);
    }

    return {
      photos: photos
    };
  },
  toggleSelectPhoto: function (photo) {
    var alreadySelected = this.state.selected[photo.id];
    var selectedPhotos = _.clone(this.state.selected);

    if (alreadySelected) {
      delete selectedPhotos[photo.id];
    } else {
      selectedPhotos[photo.id] = true;
    }

    this.setState({
      selected: selectedPhotos
    });
  },
  showMore: function () {
    this.setState({
      numPhotosToDisplay: this.state.numPhotosToDisplay + this.photosPerPage
    });
  },
  render: function () {
    var self = this;

    var numSelected = _.size(self.state.selected);

    return <div>
      <h3>Select Photos ({numSelected} selected)</h3>

      <ul className="photo-grid">{
        self.state.photos && self.state.photos.map(function (photo) {
          return <SelectablePhotoSquare
            photo={photo}
            onSelectToggle={ self.toggleSelectPhoto.bind(self, photo) }
            selected={self.state.selected[photo.id]}/>;
        })
      }</ul>

      <button className="btn btn-primary" onClick={self.showMore}>Show more</button>
    </div>;
  }
});