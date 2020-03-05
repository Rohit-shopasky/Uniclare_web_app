import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUnivs } from "../../actions";
import {
  getMenus,
  setCurUniv,
  setCurUserType
} from "../../actions/registration/loginRegn";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";

import { Label } from "semantic-ui-react";

import {
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  setUniv = async univ => {
    await this.props.setCurUniv(univ);
    this.props.getMenus();
    this.props.history.push("/dashboard");
  };

  setUsertype = async type => {
    await this.props.setCurUserType(type);
    this.props.getMenus();
    this.props.history.push("/dashboard");
  };

  loadProfile = () => {
    this.props.history.push("/profile");
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const role = this.props.usertype.filter((el, i) => {
      if (el.ftype == this.props.user.fcurtype) return el;
    })[0];

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Nav navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={`../../assets/img/logos/${this.props.curuniv.ffolder}_logo.jpg`}
                className="img-avatar"
              />
              {this.props.curuniv.funivcode} - {this.props.curuniv.funivname}
            </DropdownToggle>
            {this.props.univs.length > 1 ? (
              <DropdownMenu
                right
                style={{ right: "auto", maxHeight: "24vh", overflowY: "auto" }}
              >
                <DropdownItem header tag="div" className="text-center">
                  <strong>University</strong>
                </DropdownItem>
                {this.props.univs.map((el, i) => {
                  return (
                    <DropdownItem
                      key={el.funivcode}
                      onClick={() => this.setUniv(el)}
                    >
                      {el.funivcode} - {el.funivname} ({el.ffolder})
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            ) : null}
          </AppHeaderDropdown>
        </Nav>
        <AppNavbarBrand
          style={{ margin: "0 auto" }}
          className="d-md-down-none"
          full={{ src: logo, width: 100, height: 35, alt: "Logo" }}
          minimized={{ src: logo, width: 100, height: 35, alt: "Logo" }}
        />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-bell" />
              {/* <Badge pill color="danger">
                5
              </Badge> */}
            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav style={{ marginRight: "1em" }}>
              <img
                src={"../../assets/img/avatars/user-avatar.png"}
                className="img-avatar"
                alt="user"
              />
              {this.props.user.fname}
              <div style={{ marginTop: "-0.8em", marginLeft: "4.5em" }}>
                <Label color="teal" horizontal size="tiny">
                  ({role.ftypedesc})
                </Label>
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              {this.props.usertype.length > 1 ? (
                <div>
                  <DropdownItem header tag="div" className="text-center">
                    <strong>Role</strong>
                  </DropdownItem>
                  {this.props.usertype.map((el, i) => {
                    // if (el.fegov === 'T')
                    return (
                      <DropdownItem
                        key={el.ftype}
                        onClick={() => this.setUsertype(el)}
                      >
                        {el.ftypedesc}
                      </DropdownItem>
                    );
                  })}
                </div>
              ) : null}

              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem onClick={e => this.loadProfile(e)}>
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              {/* <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    univs: state.univs,
    curuniv: state.univ,
    usertype: state.usertype,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUnivs,
    setCurUniv,
    getMenus,
    setCurUserType
  }
)(DefaultHeader);

// export default DefaultHeader;
