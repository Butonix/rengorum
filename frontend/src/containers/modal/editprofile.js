import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProfile from '../../components/editprofile';
import Modal from '../../components/modal';
import {
  hideModal,
  editProfileReset,
  editProfile
} from '../../actions';

class EditProfileModal extends Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.handleClose();
    }
  }

  render() {
    const {
      isAuthenticated,
      isEditing,
      error,
      avatar,
      name,
      bio,
      status,
      editProfile,
      handleClose,
      success
    } = this.props;

    return !isAuthenticated ? null : (
      <Modal
        onClose={handleClose}
        dialogStyle={{ minWidth: '500px'}}
      >
        <EditProfile
          avatar={avatar}
          name={name}
          handleEdit={editProfile}
          isLoading={isEditing}
          error={error}
          success={success}
          bio={bio}
          status={status}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isEditing: state.auth.isEditing,
  error: state.auth.editError,
  avatar: state.auth.avatar,
  name: state.auth.name,
  bio: state.auth.bio,
  status: state.auth.status,
  success: state.auth.editSuccess
});

const mapDispatchToProps = (dispatch) => ({
  editProfile: (newProfile) => {
    dispatch(editProfile(newProfile));
  },
  handleClose: () => {
    dispatch(hideModal());
    dispatch(editProfileReset());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileModal);
