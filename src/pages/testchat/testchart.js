import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { connect } from "react-redux";
import { resultStatCollegeWise } from "../../actions/after-exam/collegeWiesStat";

var pie = {
  labels: ["fdeclared", "ffail", "fmp", "fpass", "fwh", "passperct", "ttlStud"],
  datasets: [
    {
      data: ["0", "0", "0", "0", "0", "0", "0"],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#00B5AD",
        "#FC6A69",
        "#2B49A3",
        "#FF9933"
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#00B5AD",
        "#FC6A69",
        "#2B49A3",
        "#FF9933"
      ]
    }
  ]
};

class Charts extends Component {
  state = {
    show: false
  };

  async componentDidMount() {
    await this.props.resultStatCollegeWise();
    var dataload = this.props.resultStatCollegeWise1;
    console.log("dataload", dataload);
    console.log("p.labels", pie.labels);
    pie.labels = [
      "RESUL DECLARE",
      "FAIL",
      "Cheating case",
      "PASS",
      "fwh",

      "TOTAL STUDENT"
    ];

    var newval = [];
    pie.datasets[0].data = [];
    console.log("ppp", pie.labels, "datasets", pie.datasets[0].data);
    dataload.map(item => {
      newval.push(
        item.fdeclared,
        item.ffail,
        item.fmp,
        item.fpass,
        item.fwh,
        item.ttlStud
      );
    });
    console.log("  var newval = []", newval);
    pie.datasets[0].data = await newval;

    console.log(" pie.datasets[0].data[0]", pie.datasets[0].data[0]);
    console.log("piefinal", pie);

    if (dataload.length > 0) {
      await this.setState({ show: true });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          {this.state.show ? (
            <Card>
              <CardHeader>Student list</CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Pie data={pie} legend={{ onClick: () => {} }} />
                </div>
              </CardBody>
            </Card>
          ) : (
            ""
          )}
        </CardColumns>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resultStatCollegeWise1: state.resultStatCollegeWise
  };
};

export default connect(
  mapStateToProps,
  { resultStatCollegeWise }
)(Charts);
