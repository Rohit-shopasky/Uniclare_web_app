import React, { Component } from "react";
import { Card, Button, Dropdown, Divider, Form, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import {
  getUserTypeList,
  getMenuList,
  updateUserMenus
} from "../../../actions/utils/assignMenus";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { wHeight } from "../../parms";

class AssignMenus extends Component {
  state = {
    checked: [],
    expanded: [],
    parents: [],
    userType: ""
  };

  async componentDidMount() {
    await this.props.getUserTypeList();
    await this.props.getMenuList();
  }

  handleChange = async (e, { name, value }) => {
    this.setState({ userType: value });
  };

  handleCreate = async () => {
    const { checked, expanded, userType, parents } = this.state;

    var parent = parents.join("*");
    var fpermissions = checked.join("*");
    const permissions = parent.concat("*", fpermissions);

    const data = { fpermissions: permissions, usertype: userType };
    console.log("CREATE", data);
    await this.props.updateUserMenus(data);
    this.setState({ userType: "", parents: [], checked: [], expanded: [] });
  };

  onCheck = (checked, node) => {
    if (node.isParent && node.checked) {
      this.setState({ parents: [...this.state.parents, node.value] });
      this.setState({ checked });
    } else if (node.isParent && node.checked == false) {
      this.setState({
        parents: [...this.state.parents.filter((el, i) => el != node.value)]
      });
      this.setState({ checked });
    } else {
      this.setState({ checked });
    }
  };

  render() {
    const userTypeList = this.props.userTypeList;
    const menuList =
      this.props.menuList.tree == undefined ? [] : this.props.menuList.tree;
    const menuIcons =
      this.props.menuList.icons == undefined ? [] : this.props.menuList.icons;

    const nodes = Object.keys(menuList).map((el, i) => menuList[el]);

    const icons = Object.keys(menuIcons).map((el, i) => menuIcons[el]["icon"]);

    const userTypeOpt = userTypeList.map((el, i) => {
      return {
        key: i,
        value: el.FUSERTYPE,
        text: `${el.FUSERTYPE} - ${el.FTYPEDESC}`
      };
    });
    const wheight = wHeight();

    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Assign Menus</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Update"
                  onClick={this.handleCreate}
                  icon="upload"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <Form>
                <Form.Field width={8}>
                  <label>User Type</label>
                  <Dropdown
                    search
                    selection
                    id="fusertype"
                    name="fusertype"
                    options={userTypeOpt}
                    onChange={this.handleChange}
                    value={this.state.userType}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Menus</label>
                  <CheckboxTree
                    nodes={nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={this.onCheck}
                    // icons={{
                    //   leaf: <Icon name={icons} />
                    // }}
                    onExpand={expanded => this.setState({ expanded })}
                    // onlyLeafCheckboxes
                  />
                </Form.Field>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userTypeList: state.userTypeList,
    menuList: state.menuList
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getUserTypeList,
    getMenuList,
    updateUserMenus
  }
)(AssignMenus);
