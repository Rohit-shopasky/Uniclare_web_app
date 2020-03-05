import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import ErrorModal from "./errorMessage";
import {
  islogin,
  getMenus,
  logout
} from "../../actions/registration/loginRegn";
import { Dimmer, Loader, Breadcrumb, Input } from "semantic-ui-react";
import { getActiveCollegeList } from "../../actions/masters/activeclglist";
import ControlModal from "./controlModal";

import {
  AppHeader,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
// import navigation from '../../_nav';
// routes config
import routes from "../../routes";

const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

class DefaultLayout extends Component {
  state = {
    load: false,
    open: false,
    menu: {
      items: [
        {
          icon: "icon-speedometer",
          name: "Dashboard",
          url: "/dashboard"
        }
      ]
    }
  };
  async componentDidMount() {
    await this.props.islogin();
    await this.props.getMenus();
    await this.props.getActiveCollegeList();
    this.setState({ load: true });

    if (this.props.user.fdeggrp == "") this.open();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menus !== prevProps.menus) {
      this.setState({ menu: this.props.menus, searchVal: "" });
    }
  }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  redirect = () => {
    this.props.history.push("/");
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  searchmenu = (e, data) => {
    const string = data.value;
    const filMenu = this.props.menus.items.filter(o =>
      Object.keys(o).some(k =>
        o[k]
          .toString()
          .toLowerCase()
          .includes(string.toLowerCase())
      )
    );
    this.setState({ menu: { items: filMenu }, searchVal: data.value });
  };

  signOut(e) {
    e.preventDefault();
    localStorage.removeItem("logtoken");
    localStorage.removeItem("fusertype");
    localStorage.removeItem("funivcode");
    this.props.history.push("/");
    this.props.logout();
  }
  render() {
    return <div>{this.state.load ? this.renderContent() : null}</div>;
  }
  renderContent() {
    const colgname = this.props.college.filter(
      item => item.fcollcode == this.props.user.fcollcode
    )[0];

    const headerDate1 =
      this.props.user.fexamdate === ""
        ? "Exam Date"
        : this.props.user.fexamdate;
    const headerDate2 = this.props.user.fexamtype;
    const finalDateHeader = `(${headerDate1}/${headerDate2})`;

    const menu = this.state.menu;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader {...this.props} onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <Input
                className="no-border-radius"
                icon="search"
                placeholder="Search Menu..."
                onChange={this.searchmenu}
              />
              {/* <AppSidebarNav navConfig={this.props.menus} {...this.props} /> */}
              <AppSidebarNav navConfig={menu} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <ControlModal open={this.state.open} close={this.close} />
            <Breadcrumb style={{ width: "125%", marginLeft: "-200px" }}>
              <div style={{ float: "left" }}>
                <Breadcrumb.Section onClick={this.open} link active>
                  {this.props.user.fdeggrp === ""
                    ? "Degree Group"
                    : this.props.user.fdeggrp}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle double right" />
                <Breadcrumb.Section active>
                  {this.props.user.fexamdate === ""
                    ? "Exam Date"
                    : this.props.user.fexamdate}{" "}
                  {this.props.user.fyear === ""
                    ? null
                    : ` (${this.props.user.fyear} / ${this.props.user.fexamtype})`}
                </Breadcrumb.Section>
              </div>
              <div style={{ float: "right" }}>
                {parseInt(this.props.user.fcurtype) > 499 && (
                  <b>
                    {" "}
                    {` ${colgname.fcollcode} ${colgname.fcollname}, ${colgname.town}`}
                  </b>
                )}
              </div>
            </Breadcrumb>

            <Container fluid style={{ marginTop: "1em" }}>
              <ErrorModal />
              {this.props.loading ? (
                <Dimmer active>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
              ) : null}
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    menus: state.menu,
    user: state.user,
    college: state.activeCollege
  };
};

export default connect(
  mapStateToProps,
  { islogin, getMenus, logout, getActiveCollegeList }
)(DefaultLayout);

// export default DefaultLayout;
