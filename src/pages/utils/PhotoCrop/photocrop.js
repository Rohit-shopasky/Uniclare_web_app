import React, { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import PhotocropModal from "./cropmodal";
import {
  // cropImage,
  savePhtoto,
  collegeWiseDegreeList,
  getStudentPhotosDegreeWise
} from "../../../actions/utils/cropimage";
import { getCollegeList } from "../../../actions/masters/allclglist";

import {
  Card,
  Button,
  Form,
  Dropdown,
  Table,
  Divider,
  Item,
  Radio,
  FormGroup
} from "semantic-ui-react";
var degreeWiseStudentListData = [];
var collegelist = [
  { value: "Active College List", text: "Active colleges" },
  { value: "Center College List", text: "Center List" },
  { value: "Center List With Tagged Colleges", text: "Tagged colleges" }
];
var degrelist = [{ value: "please wait", text: "please wait" }];

var imagedata = { f: "s", img64: "" };

class Photocrop extends Component {
  state = {
    path: "",
    clgdgerData: [],
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
    RangeTo: "zzzzz",
    RangeFrom: "0",
    Tabledata: false
  };
  _crop() {
    this.setState({ path: this.refs.cropper.getCroppedCanvas().toDataURL() });
  }

  getImageData = async () => {
    await this.props.getStudentPhotosDegreeWise(
      this.state.clgcode,
      this.state.deggrp,
      this.state.RangeFrom,
      this.state.RangeTo
    );
    degreeWiseStudentListData = this.props.degreeWiseStudentList;
    if (degreeWiseStudentListData.length > 0) {
      this.setState({ Tabledata: true });
    }
    // await this.props.cropImage(
    //   this.state.clgcode,

    //   this.state.withoutDegree,
    //   this.state.deggrp
    // );

    // imagedata = this.props.cropImagedata;

    if (imagedata.img64) {
      this.setState({ showCropImage: true });
    }
  };

  async componentDidMount() {
    // await this.props.cropImage(this.state.clgcode);
    await this.props.getCollegeList();
    // var data = this.props.cropImagedata;
    var clgdata = this.props.allclglist;

    collegelist = [];
    if (clgdata.length > 0) {
      this.setState({ showdrop: true });
    }

    clgdata.map(item => {
      collegelist.push({
        value: item.fcollcode,
        text: `${item.fcollcode}  ${item.fcollname} `
      });
    });
  }

  changeclg = async (e, { name, value }) => {
    await this.setState({ clgcode: value });
    await this.setState({ withoutDegree: true });
    await this.setState({ checkboxvalue: "Specific" });
    await this.props.collegeWiseDegreeList(this.state.clgcode);
  };

  handleSave = async () => {
    var apidata = {
      fregno: imagedata.fregno,
      img64: this.state.path
    };

    this.props.savePhtoto(apidata, this.state.clgcode);
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Crop image</h3>
      </Card.Header>
    );
  };

  render() {
    const wheight = wHeight();

    const degree = this.props.specificCollgeDregree;

    const degrelist = degree.map((el, i) => {
      return {
        value: el.fdegree,
        text: `${el.fdegree}  ${el.fdescpn} `
      };
    });
    return (
      <div>
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div className="col-md-12">
                <Form>
                  <FormGroup>
                    <Form.Field width={12}>
                      <label>Select College </label>
                      {this.state.showdrop && (
                        <Dropdown
                          placeholder="Select college"
                          name="reportType"
                          selection
                          search
                          options={collegelist}
                          onChange={this.changeclg}
                        />
                      )}
                    </Form.Field>
                  </FormGroup>

                  <FormGroup>
                    <Form.Field width={12}>
                      <label>Select Degree </label>

                      <Dropdown
                        placeholder="Select degree"
                        name="reportType"
                        selection
                        search
                        options={degrelist}
                        //show_degree_drop for drop down when select specific
                        onChange={async (e, { name, value }) => {
                          this.setState({ show_degree_drop: true });
                          await this.setState({ deggrp: value });
                        }}
                      />
                    </Form.Field>
                  </FormGroup>

                  <FormGroup>
                    <Form.Field width={6}>
                      <Form.Input
                        defaultValue={"0000"}
                        fluid
                        onChange={async e => {
                          await this.setState({
                            RangeFrom: e.target.value
                          });
                        }}
                        placeholder="Range From"
                        label="Reg. No. Range "
                      />
                    </Form.Field>
                    <Form.Field width={6}>
                      <br />
                      <Form.Input
                        defaultValue={"zzzz"}
                        onChange={async e => {
                          await this.setState({ RangeTo: e.target.value });
                        }}
                        fluid
                        placeholder="Range To"
                      />
                    </Form.Field>
                  </FormGroup>

                  <FormGroup>
                    <Button
                      style={{ margin: "5px" }}
                      color="green"
                      onClick={this.getImageData}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </div>
              <div className="col-md-12">
                {this.state.Tabledata && (
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          singleLine
                          textAlign="center"
                        >
                          Sl. No.
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          singleLine
                          textAlign="center"
                        >
                          Register No
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          textAlign="center"
                        >
                          Student Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          textAlign="center"
                        >
                          Photo
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          textAlign="center"
                        >
                          Crop Data
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {degreeWiseStudentListData.length > 0 &&
                        degreeWiseStudentListData.map((el, i) => {
                          return (
                            <Table.Row key={i}>
                              <Table.Cell textAlign="center">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell textAlign="center">
                                {el.fregno}
                              </Table.Cell>
                              <Table.Cell textAlign="center" singleLine>
                                {el.fname}
                              </Table.Cell>
                              <Table.Cell textAlign="center" singleLine>
                                <img
                                  src={el.fphotopath}
                                  style={{ height: "200px", width: "200px" }}
                                />
                              </Table.Cell>

                              <Table.Cell textAlign="center" singleLine>
                                <PhotocropModal
                                  item={el}
                                  collcode={this.state.clgcode}
                                  deggrp={this.state.deggrp}
                                />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                    </Table.Body>
                  </Table>
                )}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // cropImagedata: state.cropImage,
    allclglist: state.allcollegeList,
    specificCollgeDregree: state.collegeWiseDegreeList,
    degreeWiseStudentList: state.getStudentPhotosDegreeWise
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    // cropImage,
    getCollegeList,
    savePhtoto,
    collegeWiseDegreeList,
    getStudentPhotosDegreeWise
  }
)(Photocrop);
