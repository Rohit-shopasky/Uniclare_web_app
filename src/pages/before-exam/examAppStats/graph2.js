import React, { Component } from "react";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { Table, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { Pie as Pie1 } from "react-chartjs-2";

const PayData = {
  labels: [],
  datasets: [
    {
      label: "Exam Application Payment Statistics ",
      fill: false,
      lineTension: 0.1,
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      // borderColor: "rgba(75,192,192,1)",
      // borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 2,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

class ExmAppStatsG2 extends Component {
  state = {
    pd: PayData
  };

  componentDidMount() {
    var { labels, datasets } = this.chartReference.props.data;

    // var pDet = this.props.AppStats.PayDet;
    var pDetails = this.props.AppStats.PayDet1;

    datasets[0].data = [];
    labels = [];

    pDetails.map((el, i) => {
      datasets[0].data.push(el["count"]);
      labels.push(el["fpaygateway"]);
    });
    // Object.keys(pDet).forEach((item, index, array) => {
    //   datasets[0].data.push(pDet[item]);
    //   labels.push(item);
    // });
    this.setState({ pd: { labels: labels, datasets: datasets } });
  }

  render() {
    // var pDet = this.props.AppStats.PayDet;
    var pDetails = this.props.AppStats.PayDet1;

    var { pd } = this.state;
    console.log("STATE", pd);

    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-6">
            <Pie1
              data={this.state.pd}
              ref={ref2 => (this.chartReference = ref2)}
              id="c2"
              options={{
                title: {
                  display: true,
                  text: "Payment Gateway Summary",
                  fontSize: "15",
                  lineHeight: 1.2
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
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Count</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pDetails.map((el, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Header as="h4">
                          <Header.Content>{el["fpaygateway"]}</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <b>{el["count"]}</b>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              {/* <Table.Body>
                {Object.entries(pDet)
                  .slice(0, 1)
                  .map((el, i) => {
                    ttlRaz = +pDet["Razorpay"];
                    ttlpaytm = +pDet["Paytm"];
                    ttlPO = +pDet["POSTOFFICE"];
                    ttlHDFC = +pDet["HDFC"];
                    ttlAxis = +pDet["axis"];
                    ttlHDFCB = +pDet["HDFC_BANK"];
                  })}
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>Razorpay</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlRaz}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>Paytm</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlpaytm}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>Post Office</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlPO}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>HDFC</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlHDFC}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>Axis</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlAxis}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>HDFC Bank Challan</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{ttlHDFCB}</Table.Cell>
                </Table.Row>
              </Table.Body> */}
            </Table>
          </div>
        </div>
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
)(ExmAppStatsG2);
