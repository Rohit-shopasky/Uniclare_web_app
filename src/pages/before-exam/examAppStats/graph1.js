import React, { Component } from "react";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { Table, Header, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";

let data1 = {
  labels: [],
  datasets: [
    {
      label: "Exam Application Statistics Summary",
      fill: false,
      lineTension: 0.1,
      backgroundColor: ["#3498db", "#9b59b6", "#f1c40f"],
      // borderColor: "rgba(75,192,192,1)",
      // borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

class ExmAppStatsG1 extends Component {
  state = {
    d: data1
  };

  componentDidMount() {
    var { datasets, labels } = this.chartReference1.props.data;

    // var res = this.props.AppStats.summary;
    let det = this.props.AppStats.det;

    datasets[0].data = [];
    labels = [];
    det.map((el, i) => {
      datasets[0].data.push(el["studTtl"]);
      labels.push(el["Total Students"]);
    });

    // Object.keys(res).forEach((item, index, array) => {
    //   datasets[0].data.push(res[item]);
    //   labels.push(item);
    // });
    datasets[0].data.shift();
    labels.shift();
    this.setState({
      d: {
        labels: labels,
        datasets: datasets
      }
    });
  }

  render() {
    // let summ = this.props.AppStats.summary;
    let det = this.props.AppStats.det;
    var { d } = this.state;
    console.log("G1", det, det[0], "after ", this.state.d);

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Pie
              data={d}
              ref={ref1 => (this.chartReference1 = ref1)}
              id="c1"
              options={{
                title: {
                  display: true,
                  text: "Exam Application Statistics Summary",
                  lineHeight: 1.2,
                  fontSize: "15"
                },
                legend: {
                  display: true,
                  onClick: () => {},
                  position: "right"
                }
              }}
            />
          </div>
          <div
            className="col-md-6 mt-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Table basic celled collapsing padded size="large">
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>
                    <Header as="h3">Type</Header>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Header as="h3">Count</Header>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {det.map((el, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Header as="h4">
                          <Header.Content>
                            {el["Total Students"]}
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <b>{el["studTtl"]}</b>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AppStats: state.ExamAppStats
  };
};
export default connect(
  mapStateToProps,
  {
    showError
  }
)(ExmAppStatsG1);
