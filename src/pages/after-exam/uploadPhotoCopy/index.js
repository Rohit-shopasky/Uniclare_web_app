import React from "react";
import { Card, Divider, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import { saveUploadedPhotocopy } from "../../../actions/after-exam/uploadPhotoCopy";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { Link } from "react-router-dom";
import { SPAPI } from "../../../apis/consts";

const uploadPhotoCopy = props => {
  const getUploadParams = ({ file, meta }) => {
    return { url: SPAPI + "/upload_pc.php" };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files, allFiles) => {
    console.log(files.map(f => f.meta));
    await props.saveUploadedPhotocopy(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  const validatefile = ({ file, meta }) => {
    // console.log(obj);
    // console.log(meta.name);
    const name = meta.name;
    const split_name = name.split("_");
    console.log(props.user.fcuruniv);
    if (
      split_name[0] !== props.user.fcuruniv ||
      split_name[1] != props.user.fyear ||
      split_name[2] != props.user.fexamtype
    ) {
      return "Invalid university code or year and type";
    }
    return false;
  };

  const renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>Upload Photo Copy Scripts</h4>
        <div className="ml-auto">
          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };
  var wheight = (window.innerHeight * 70) / 100;
  return (
    <>
      <Card fluid>
        <Card.Content>
          {renderHeader()}
          <Divider />
          <Card.Description
            style={{ height: `${wheight}px`, overflowY: "auto" }}
          >
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              validate={validatefile}
              accept="application/pdf"
              maxFiles={50}
              styles={{ dropzone: { minHeight: 200, maxHeight: wheight - 10 } }}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    saveUploadedPhotocopy
  }
)(uploadPhotoCopy);

// export default uploadPhotoCopy;
