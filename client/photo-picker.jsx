// @jsx React.DOM

SelectablePhotoSquare = React.createClass({
  onClick() {
    this.props.onSelectToggle();
  },
  render() {
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

SelectableFacebookPhotosGrid = React.createClass({
  mixins: [ReactMeteorData],
  // This many more are displayed when you
  // click "show more"
  photosPerPage: 12,

  componentDidMount() {
    // TODO(angela): change this to the time of the last letter
    Meteor.call("getFacebookPhotosSince", new Date(2015, 4, 1), this.photosPerPage, (error, result) => {
      if (!error) {
        this.nextUrl = result;
      }
    });
  },

  getMeteorData() {
    var user = Meteor.user();
    var photos = user && user.profile && user.profile.photos;

    return {
      photos: photos
    };
  },
  toggleSelectPhoto(photo) {
    var alreadySelected = this.photoIsSelected(photo.id);

    if (alreadySelected) {
      Meteor.call("/letters/removePhoto", this.props.letter._id, photo.id);
    } else {
      Meteor.call("/letters/addPhoto", this.props.letter._id, photo.id);
    }
  },
  showMore() {
    Meteor.call('getFacebookPhotosNext', this.nextUrl, this.photosPerPage, (error, result) => {
      if (!error) {
        var nextUrl = result;
        this.nextUrl = nextUrl;
      }
    });
  },
  photoIsSelected(photoId) {
    return _.include(this.props.letter.photos, photoId);
  },
  render() {
    var self = this;

    var numSelected = self.props.letter.photos.length;

    return <div>
      <h3>Select Photos ({numSelected} selected)</h3>

      <ul className="photo-grid">{
        self.data.photos && self.data.photos.map(function (photo) {
          return <SelectablePhotoSquare
            key={photo.id}
            photo={photo}
            onSelectToggle={ self.toggleSelectPhoto.bind(self, photo) }
            selected={self.photoIsSelected(photo.id)}/>;
        })
      }</ul>

      <button className="btn btn-primary" onClick={self.showMore}>Show more</button>
    </div>;
  }
});