import React, { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import { cropImage, savePhtoto } from "../../../actions/utils/cropimage";

import { Button, Header, Card, Image, Modal } from "semantic-ui-react";
var imagedata = {};
class PhotocropModal extends Component {
  state = {
    path: "",
    checkboxvalue: "ALL",
    show_degree_drop: false,
    clgcode: "",
    showCropImage: false,
    showdrop: false,
    showSubmitButton: false,
    withoutDegree: false,
    currentindex: 0,
    last: false,
    deggrp: "ALL",
    show: false,
    arraystuddata: [],
    RangeTo: "",
    RangeFrom: "",
    Tabledata: false,
    modalContent: false,
    showimg: false
  };
  _crop() {
    this.setState({ path: this.refs.cropper.getCroppedCanvas().toDataURL() });
  }

  handleSave = async () => {
    var apidata = {
      fregno: imagedata.fregno,
      img64: this.state.path
    };

    this.props.savePhtoto(apidata, this.props.collcode);
  };
  showdata = async () => {
    await this.props.cropImage(
      this.props.collcode,

      this.props.deggrp,
      this.props.item.fregno
    );

    imagedata = await this.props.cropImagedata;
    console.log("imagedata", imagedata, "lenthhh", imagedata.length);
    if (imagedata.fregno.length > 0) {
      await this.setState({ showimg: true });
    }
    console.log("iamsajhsauhsajn", imagedata.fregno, this.state.showimg);
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <div className="ml-auto">
          <Button
            basic
            color="green"
            icon="file"
            onClick={this.handleSave}
            content="save"
          />
        </div>
      </Card.Header>
    );
  };
  render() {
    return (
      <div>
        <Modal
          style={{ width: "90%" }}
          trigger={<Button onClick={this.showdata}>Select Image</Button>}
        >
          {this.state.showimg && (
            <>
              <Modal.Header>
                <div className="row">
                  <div className="col-lg-6">Select area to crop</div>
                  <div className="col-lg-6">{this.renderHeader()} </div>
                </div>
              </Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Header>
                    <b style={{ margin: "0px 5px" }}>Student Name:</b>
                    {this.props.item.fname} <br />
                    <b>Student Register Number :</b>
                    {this.props.item.fregno}
                  </Header>
                  <div className="row">
                    <div className="col-lg-6">
                      <Cropper
                        ref="cropper"
                        src={imagedata.img64}
                        style={{ height: 400, width: "100%" }}
                        // Cropper.js options

                        guides={false}
                        crop={this._crop.bind(this)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <img
                        src={this.state.path}
                        style={{ height: "400px", width: "400px" }}
                      />
                    </div>
                  </div>
                </Modal.Description>
              </Modal.Content>
            </>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cropImagedata: state.cropImage
  };
};

export default connect(
  mapStateToProps,
  {
    cropImage,
    savePhtoto
  }
)(PhotocropModal);
