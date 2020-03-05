import React, { Component } from "react";
import {
  Divider,
  Select,
  Form,
  Table,
  Image,
  Header,
  Radio
} from "semantic-ui-react";
import { wHeight } from "../parms";
import { connect } from "react-redux";
import { showError } from "../../actions";
import { getFacultyDegree, changePgetDet } from "../../actions/utils/pget";
import { getCategory } from "../../actions/finance/fee-str";

class PGETEditApp extends Component {
  state = { editDet: {} };

  componentDidMount = () => {
    this.props.getFacultyDegree();
    this.props.getCategory();
  };

  // componentDidUpdate(prevProps) {
  //   if (this.props.pgetEditApp !== prevProps.pgetEditApp) {
  //     this.setState({ editDet: this.props.pgetEditApp });
  //   }
  // }

  handleChange = (e, { name, value }) => {
    this.props.changePgetDet(name, value);
    // this.setState({editDet:{...this.state.editDet,[name]:value}})
    console.log(name, value);
  };

  handleChangeCheck = (e, { name, checked }) => {
    const value = checked ? "Yes" : "No";
    this.props.changePgetDet(name, value);
  };

  render() {
    const wheight = wHeight();

    var degreeOpt = this.props.degrees.map((el, i) => {
      return { key: i, value: el.int_code, text: `${el.val}` };
    });

    var categoryOpt = this.props.category.map((el, i) => {
      return { key: i, value: el.fcategory, text: `${el.fdescpn}` };
    });
    const NationalityOpt = [
      { key: "Indian", value: "Indian", text: "Indian" },
      { key: "Foreigner", value: "Foreigner", text: "Foreigner" },
      { key: "Expatriate", value: "Expatriate", text: "Expatriate" }
    ];

    var years = [];
    for (var j = 2019; j > 2000; j--) {
      years.push({ key: j, value: j.toString(), text: j });
    }
    var months = [
      { key: "January", value: "January", text: "January" },
      { key: "February", value: "February", text: "February" },
      { key: "March", value: "March", text: "March" },
      { key: "April", value: "April", text: "April" },
      { key: "May", value: "May", text: "May" },
      { key: "June", value: "June", text: "June" },
      { key: "July", value: "July", text: "July" },
      { key: "August", value: "August", text: "August" },
      { key: "September", value: "September", text: "September" },
      { key: "October", value: "October", text: "October" },
      { key: "November", value: "November", text: "November" },
      { key: "December", value: "December", text: "December" }
    ];

    // const el = this.state.editDet;
    const el = this.props.pgetEditApp;
    const i = 1;
    return (
      <div className="mt-5">
        {/* <Card fluid>
          <Card.Content>
            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            > */}
        <Divider />
        <Form>
          <Header as="h3">Remarks</Header>
          <Form.Field width={10}>
            <Form.TextArea
              // label="Any other information you would like to furnish?"
              placeholder="Enter your remarks"
              id="fappremarks"
              name="fappremarks"
              value={el.fappremarks}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Header as="h3">
            Course for which you are appearing for entrance test
          </Header>
          <Form.Group width={"equal"}>
            <Form.Field width={5}>
              <Select
                name="fdegree1"
                value={el.fdegree1}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
            <Form.Field width={5}>
              <Select
                name="fdegree2"
                value={el.fdegree2}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
            <Form.Field width={5}>
              <Select
                name="fdegree3"
                value={el.fdegree3}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
          </Form.Group>
          <Form.Group width={"equal"}>
            <Form.Field width={5}>
              <Select
                name="fdegree4"
                value={el.fdegree4}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
            <Form.Field width={5}>
              <Select
                name="fdegree5"
                value={el.fdegree5}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
            <Form.Field width={5}>
              <Select
                name="fdegree6"
                value={el.fdegree6}
                placeholder="Select your Preferance"
                options={degreeOpt}
                onChange={this.handleChange}
                disabled
              />
            </Form.Field>
          </Form.Group>
          <Divider />
          <Header as="h3">Personal Details</Header>
          <div className="row">
            <div className="col-md-3">
              <Image
                src={`http://universitysolutions.in/bcu/adm/${el.fphotopath}`}
                size="small"
              />
            </div>
            <div className="col-md-9">
              <Form.Group>
                <Form.Field width={8}>
                  <Form.Input
                    id="fname"
                    name="fname"
                    label="Name"
                    placeholder="Your name"
                    value={el.fname}
                    onChange={this.handleChange}
                    // onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <label>Gender</label>
                <Form.Radio
                  label="Male"
                  value="M"
                  name="fgender"
                  checked={el.fgender == "M"}
                  disabled
                />
                <Form.Radio
                  label="Female"
                  value="F"
                  name="fgender"
                  checked={el.fgender == "F"}
                  disabled
                />
                <Form.Radio
                  label="Transgender"
                  value="T"
                  name="fgender"
                  checked={el.fgender == "T"}
                  disabled
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="fdob"
                    name="fdob"
                    value={el.fdob}
                    label="Date of Birth"
                    placeholder=""
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Category</label>
                  <Select
                    id="fcategory"
                    name="fcategory"
                    value={el.fcategory}
                    onChange={this.handleChange}
                    placeholder="Category"
                    options={categoryOpt}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Nationalitys</label>
                  <Select
                    name="fnational"
                    value={el.fnational}
                    placeholder="Nationality"
                    options={NationalityOpt}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="faadharno"
                    value={el.faadharno}
                    onChange={this.handleChange}
                    label="Aadhar No."
                    placeholder="Aadhar Number"
                  />
                </Form.Field>
              </Form.Group>
            </div>
            <div className="col-md-12">
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="ffatname"
                    name="ffatname"
                    value={el.ffatname}
                    onChange={this.handleChange}
                    label="Father Name"
                    placeholder="Father Name"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="ffatocc"
                    name="ffatocc"
                    value={el.ffatocc}
                    onChange={this.handleChange}
                    label="Father Occupation"
                    placeholder="Father Occ."
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fmotname"
                    name="fmotname"
                    value={el.fmotname}
                    onChange={this.handleChange}
                    label="Mother Name"
                    placeholder="Mother Name"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fmotocc"
                    name="fmotocc"
                    value={el.fmotocc}
                    onChange={this.handleChange}
                    label="Mother Occupation"
                    placeholder="Mother Occ."
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                id="fincome"
                name="fincome"
                value={el.fincome}
                onChange={this.handleChange}
                label="Annual Family Income "
                placeholder=""
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                id="fpmregno"
                name="fpmregno"
                value={el.fpmregno}
                onChange={this.handleChange}
                label="Online Scholarship(Post metric) Reg. No."
                placeholder="Register No."
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                id="fmobileno"
                name="fmobileno"
                value={el.fmobileno}
                onChange={this.handleChange}
                label="Contact No."
                placeholder=""
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                id="femail"
                name="femail"
                value={el.femail}
                onChange={this.handleChange}
                label="Email ID"
                placeholder=""
              />
            </Form.Field>
          </Form.Group>
          <div className="row">
            <div className="col-md-12">
              <b>Permanent Address</b>
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="fpermadd1"
                    name="fpermadd1"
                    value={el.fpermadd1}
                    onChange={this.handleChange}
                    label="Address Line1"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpermadd2"
                    name="fpermadd2"
                    value={el.fpermadd2}
                    onChange={this.handleChange}
                    label="Address Line2"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpermadd3"
                    name="fpermadd3"
                    value={el.fpermadd3}
                    onChange={this.handleChange}
                    label="Address Line3"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpermdist"
                    name="fpermdist"
                    value={el.fpermdist}
                    onChange={this.handleChange}
                    label="District"
                    placeholder="District"
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <Form.Group>
            <Form.Field width={4}>
              <Form.Input
                id="fpermpin"
                name="fpermpin"
                value={el.fpermpin}
                onChange={this.handleChange}
                label="Pincode"
                placeholder="PinCode"
              />
            </Form.Field>
            <Form.Field width={4}>
              <Form.Input
                id="fpermstate"
                name="fpermstate"
                value={el.fpermstate}
                onChange={this.handleChange}
                label="State"
                placeholder="State"
              />
            </Form.Field>
          </Form.Group>
          <div className="row">
            <div className="col-md-12">
              <b>Communication Address</b>
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="fcurradd1"
                    name="fcurradd1"
                    value={el.fcurradd1}
                    onChange={this.handleChange}
                    label="Address Line1"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fcurradd2"
                    name="fcurradd2"
                    value={el.fcurradd2}
                    onChange={this.handleChange}
                    label="Address Line2"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fcurradd3"
                    name="fcurradd3"
                    value={el.fcurradd3}
                    onChange={this.handleChange}
                    label="Address Line3"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fcurrdist"
                    name="fcurrdist"
                    value={el.fcurrdist}
                    onChange={this.handleChange}
                    label="District"
                    placeholder="District"
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <Form.Group>
            <Form.Field width={4}>
              <Form.Input
                id="fcurrpin"
                name="fcurrpin"
                value={el.fcurrpin}
                onChange={this.handleChange}
                label="Pincode"
                placeholder="PinCode"
              />
            </Form.Field>
            <Form.Field width={4}>
              <Form.Input
                id="fcurrstate"
                name="fcurrstate"
                value={el.fcurrstate}
                onChange={this.handleChange}
                label="State"
                placeholder="State"
              />
            </Form.Field>
          </Form.Group>
          <Divider />
          <Header as="h3">Reservation Details </Header>
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell style={{ width: "40%" }}>
                  Do you belong to Below Poverty Line Family (BPL){" "}
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fbpl"
                      checked={el.fbpl == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fbpl"
                      checked={el.fbpl == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Are you the single Girl child to your parents?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fogirl"
                      checked={el.fogirl === "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fogirl"
                      checked={el.fogirl === "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Have you studied 7 years in Karnataka?</Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fkarstudy"
                      checked={el.fkarstudy == "Yes"}
                      readOnly
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fkarstudy"
                      checked={el.fkarstudy == "No"}
                      disabled
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Are you a Kashmiri migrant?</Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fkashmir"
                      checked={el.fkashmir == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fkashmir"
                      checked={el.fkashmir == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Are you a student of Hyderabad-Karnataka?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fhk"
                      checked={el.fhk == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fhk"
                      checked={el.fhk == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Are you a student of Jammu & Kashmir State?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fjk"
                      checked={el.fjk == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fjk"
                      checked={el.fjk == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Have you studied in Rural Area upto 10th Std ?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="frural"
                      checked={el.frural == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="frural"
                      checked={el.frural == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Have you studied in Kannada Medium upto 10th Std ?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fkannada"
                      checked={el.fkannada == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fkannada"
                      checked={el.fkannada == "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Are you a son/daughter of B’luru Central University Employee?
                  (If yes, choose between teaching or non-teaching)
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Radio
                      label="Yes"
                      value="Yes"
                      name="fbcue"
                      checked={el.fbcue == "Yes"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="No"
                      value="No"
                      name="fbcue"
                      checked={el.fbcue == "No"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="Teaching"
                      value="Teaching"
                      name="fbcuetype"
                      checked={el.fbcuetype == "Teaching"}
                      onChange={this.handleChange}
                    />
                    <Form.Radio
                      label="Non-Teaching"
                      value="Non-Teaching"
                      name="fbcuetype"
                      checked={el.fbcuetype == "Non-Teaching"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Mention whether you claim any of the following quota?
                </Table.Cell>
                <Table.Cell>
                  <Form.Group inline>
                    <Form.Checkbox
                      label="Sports"
                      value="Yes"
                      name="fsports"
                      checked={el.fsports == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                    <Form.Checkbox
                      label="Culture"
                      value="Yes"
                      name="fculture"
                      checked={el.fculture == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                    <Form.Checkbox
                      label="NCC"
                      value="Yes"
                      name="fncc"
                      checked={el.fncc == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                  </Form.Group>
                  <Form.Group inline>
                    <Form.Checkbox
                      label="NSS"
                      value="Yes"
                      name="fnss"
                      checked={el.fnss == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                    <Form.Checkbox
                      label="Defence"
                      value="Yes"
                      name="fdefence"
                      checked={el.fdefence == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                    <Form.Checkbox
                      label="Differently Abled/ Blind"
                      value="Yes"
                      name="fhandicap"
                      checked={el.fhandicap == "Yes"}
                      onChange={this.handleChangeCheck}
                    />
                  </Form.Group>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider />
          <Header as="h3">Details of qualifying examination </Header>
          <Form.Group inline>
            <label>
              Have you studied Mathematics in Pre-University [10+2]?{" "}
            </label>
            <Form.Radio
              label="Yes"
              value="Yes"
              name="fpumat"
              checked={el.fpumat == "Yes"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              value="No"
              name="fpumat"
              checked={el.fpumat == "No"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Have you studied Biology in Pre-University [10+2]?</label>
            <Form.Radio
              label="Yes"
              value="Yes"
              name="fpubio"
              checked={el.fpubio == "Yes"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              value="No"
              name="fpubio"
              checked={el.fpubio == "No"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field width={6}>
            <Form.Input
              id="fsslcregno"
              name="fsslcregno"
              value={el.fsslcregno}
              onChange={this.handleChange}
              label="SSLC Register No."
              placeholder="Register No."
            />
          </Form.Field>
          <div className="row">
            <div className="col-md-6">
              <Form.Group grouped>
                <label>University Studied </label>
                <Form.Field
                  label="Bangalore University"
                  control={Radio}
                  value="Bangalore University"
                  checked={el.fqutype == "Bangalore University"}
                  onChange={this.handleChange}
                  name="fqutype"
                />
                <Form.Field
                  label="Other University within Karnataka"
                  control={Radio}
                  value="Other University within Karnataka"
                  checked={el.fqutype == "Other University within Karnataka"}
                  onChange={this.handleChange}
                  name="fqutype"
                />
                <Form.Field
                  label="Other University outside Karnataka"
                  control={Radio}
                  value=" Other University Outside Karnataka "
                  checked={el.fqutype == " Other University Outside Karnataka "}
                  onChange={this.handleChange}
                  name="fqutype"
                />
                <Form.Field
                  label="Bangalore University, Auotnomous College"
                  control={Radio}
                  value="Bangalore University Autonomous Colleges"
                  checked={
                    el.fqutype == "Bangalore University Autonomous Colleges"
                  }
                  onChange={this.handleChange}
                  name="fqutype"
                />
              </Form.Group>
            </div>
            <Form.Field width={4}>
              <Form.Input
                id="fquniv"
                name="fquniv"
                value={el.fquniv}
                onChange={this.handleChange}
                label="If other University, mention here"
                placeholder=""
              />
            </Form.Field>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="fqdegree"
                    name="fqdegree"
                    value={el.fqdegree}
                    onChange={this.handleChange}
                    label="Degree"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fqregno"
                    name="fqregno"
                    value={el.fqregno}
                    onChange={this.handleChange}
                    label="Register No."
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fqclass"
                    name="fqclass"
                    value={el.fqclass}
                    onChange={this.handleChange}
                    label="Class/ Division"
                    placeholder=""
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={5}>
                  <label>Passing month / year </label>
                  <Select
                    id="fqmonth"
                    name="fqmonth"
                    value={el.fqmonth}
                    onChange={this.handleChange}
                    options={months}
                  />
                </Form.Field>
                <Form.Field width={5} style={{ marginTop: "2%" }}>
                  <Select
                    id="fqyear"
                    name="fqyear"
                    value={el.fqyear}
                    onChange={this.handleChange}
                    options={years}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fqmaxmarks"
                    name="fqmaxmarks"
                    value={el.fqmaxmarks}
                    onChange={this.handleChange}
                    label="Max. Marks"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fqsecmarks"
                    name="fqsecmarks"
                    value={el.fqsecmarks}
                    onChange={this.handleChange}
                    label="Sec. Marks"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fqpercentage"
                    name="fqpercentage"
                    value={el.fqpercentage}
                    onChange={this.handleChange}
                    label="Total"
                    placeholder=""
                    disabled
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <Form.Field>
            <label>Marks in Degree</label>
            <p>Note : Enter the aggregate marks of all semesters.</p>
          </Form.Field>
          <Form.Group>
            <Form.Checkbox
              label="Results Awaited"
              value="Yes"
              name="fresstat"
              checked={el.fresstat == "Yes"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-4">
              <b>Languages </b>
              <Form.Field>
                <Form.Input
                  id="flang1"
                  name="flang1"
                  value={el.flang1}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="flang2"
                  name="flang2"
                  value={el.flang2}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
            </div>
            <div className="col-md-4">
              <b>Maximum Marks </b>
              <Form.Field>
                <Form.Input
                  id="flang1mm"
                  name="flang1mm"
                  value={el.flang1mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="flang2mm"
                  name="flang2mm"
                  value={el.flang2mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input id="" placeholder="" disabled />
              </Form.Field>
            </div>
            <div className="col-md-4">
              <b>Secured Marks </b>
              <Form.Field>
                <Form.Input
                  id="flang1ms"
                  name="flang1ms"
                  value={el.flang1ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="flang2ms"
                  name="flang2ms"
                  value={el.flang2ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input id="" placeholder="" disabled />
              </Form.Field>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <b>Optionals </b>
              <Form.Field>
                <Form.Input
                  id="fopt1"
                  name="fopt1"
                  value={el.fopt1}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt2"
                  name="fopt2"
                  value={el.fopt2}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt3"
                  name="fopt3"
                  value={el.fopt3}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt4"
                  name="fopt4"
                  value={el.fopt4}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
            </div>
            <div className="col-md-4">
              <b>Maximum Marks </b>
              <Form.Field>
                <Form.Input
                  id="fopt1mm"
                  name="fopt1mm"
                  value={el.fopt1mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt2mm"
                  name="fopt2mm"
                  value={el.fopt2mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt3mm"
                  name="fopt3mm"
                  value={el.fopt3mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt4mm"
                  name="fopt4mm"
                  value={el.fopt4mm}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input id="" placeholder="" disabled />
              </Form.Field>
            </div>
            <div className="col-md-4">
              <b>Secured Marks </b>
              <Form.Field>
                <Form.Input
                  id="fopt1ms"
                  name="fopt1ms"
                  value={el.fopt1ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt2ms"
                  name="fopt2ms"
                  value={el.fopt2ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt3ms"
                  name="fopt3ms"
                  value={el.fopt3ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="fopt4ms"
                  name="fopt4ms"
                  value={el.fopt4ms}
                  onChange={this.handleChange}
                  placeholder=""
                />
              </Form.Field>
              <Form.Field>
                <Form.Input id="" placeholder="" disabled />
              </Form.Field>
            </div>
          </div>
          <Form.Group inline>
            <label>Have you passed any Postgraduate Degree?</label>
            <Form.Radio
              label="Yes"
              value="yes"
              name="fpgdegree"
              checked={el.fpgdegree == "yes"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              value="No"
              name="fpgdegree"
              checked={el.fpgdegree == "No"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group grouped>
                <label>University Studied </label>
                <Form.Field
                  label="Bangalore University"
                  control={Radio}
                  value="Bangalore University"
                  checked={el.fpgunivtype == "Bangalore University"}
                  onChange={this.handleChange}
                  name="fpgunivtype"
                />
                <Form.Field
                  label="Other University within Karnataka"
                  control={Radio}
                  value="Other University within Karnataka"
                  checked={
                    el.fpgunivtype == "Other University within Karnataka"
                  }
                  onChange={this.handleChange}
                  name="fpgunivtype"
                />
                <Form.Field
                  label="Other University outside Karnataka"
                  control={Radio}
                  value=" Other University Outside Karnataka "
                  checked={
                    el.fpgunivtype == " Other University Outside Karnataka "
                  }
                  onChange={this.handleChange}
                  name="fpgunivtype"
                />
                <Form.Field
                  label="Bangalore University, Auotnomous College"
                  control={Radio}
                  value="Bangalore University Autonomous Colleges"
                  checked={
                    el.fpgunivtype == "Bangalore University Autonomous Colleges"
                  }
                  onChange={this.handleChange}
                  name="fpgunivtype"
                />
              </Form.Group>
            </div>
            <Form.Field width={4}>
              <Form.Input
                id="fpguniv"
                name="fpguniv"
                value={el.fpguniv}
                onChange={this.handleChange}
                label="If other University, mention here"
                placeholder=""
              />
            </Form.Field>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    id="fpguniv"
                    name="fpguniv"
                    value={el.fpguniv}
                    onChange={this.handleChange}
                    label="Degree"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpguniv"
                    name="fpguniv"
                    value={el.fpguniv}
                    onChange={this.handleChange}
                    label="Register No."
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpguniv"
                    name="fpguniv"
                    value={el.fpguniv}
                    onChange={this.handleChange}
                    label="Class/ Division"
                    placeholder=""
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Passing month / year </label>
                  <Select
                    placeholder=""
                    id="fpgyear"
                    name="fpgyear"
                    value={el.fpgyear}
                    onChange={this.handleChange}
                    options={months}
                  />
                </Form.Field>
                <Form.Field style={{ marginTop: "2%" }}>
                  <Select
                    placeholder=""
                    id="fpgmonth"
                    name="fpgmonth"
                    value={el.fpgmonth}
                    onChange={this.handleChange}
                    options={years}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpguniv"
                    name="fpguniv"
                    value={el.fpguniv}
                    onChange={this.handleChange}
                    label="Max. Marks"
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    id="fpguniv"
                    name="fpguniv"
                    value={el.fpguniv}
                    onChange={this.handleChange}
                    label="Sec. Marks"
                    placeholder=""
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <Form.Field width={6}>
            <Form.TextArea
              label="Other examinations passed?"
              placeholder="..."
              id="fothexam"
              name="fothexam"
              value={el.fothexam}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field width={6}>
            <Form.Input
              label="If you are a Sponsored candidate – mention Organization’s Name & enclose a copy of the certificate. "
              placeholder="..."
              id="fsponsor"
              name="fsponsor"
              value={el.fsponsor}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field width={6}>
            <Form.TextArea
              label="Any other information you would like to furnish?"
              placeholder="..."
              id="fothinfo"
              name="fothinfo"
              value={el.fothinfo}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field width={6}>
            <Form.Input
              label="Total Number of enclosures attested by self?"
              placeholder=""
              id="fdocattest"
              name="fdocattest"
              value={el.fdocattest}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        {/* </Card.Description>
          </Card.Content>
        </Card> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    univcode: state.univ.funivcode,
    pgetEditApp: state.pgetEditApp,
    degrees: state.pgetDeg,
    category: state.category
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getCategory,
    getFacultyDegree,
    changePgetDet
  }
)(PGETEditApp);
