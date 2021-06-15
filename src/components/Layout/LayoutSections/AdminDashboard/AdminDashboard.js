import React, {Component} from "react";

import "./AdminDashboard.css";
import CreateRecipe from "./AdminDashboardComponents/Components/CreateRecipe/CreateRecipe";
import Dashboard from "./AdminDashboardComponents/Dashboard";
import CreateMenu from "./AdminDashboardComponents/Components/CreateMenu/CreateMenu";
import SendEmail from "./AdminDashboardComponents/Components/SendEmail/SendEmail";

import SubscribeEmailCalls from '../../../../repository/get/getSubscribeEmail';
import CreateCoupon from "./AdminDashboardComponents/Components/CreateCoupon/CreateCoupon";
import CreateSubscriptionPlan from "./AdminDashboardComponents/Components/CreateSubscriptionPlan/CreateSubscriptionPlan";
import ManageCoupon from "./AdminDashboardComponents/Components/ManageCoupon/ManageCoupon";
import ManageSubscriptionPlan
    from "./AdminDashboardComponents/Components/ManageSubscriptionPlan/ManageSubscriptionPlan";
import Orders from "./AdminDashboardComponents/Components/Orders/Orders";

class AdminDashboard extends Component {

    state = {
        routeComponent: "Dashboard",
        SubscribedUsers: "",

    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        this.setState({
            routeComponent: this.props.routeComponent
        })

        await SubscribeEmailCalls.fetchSubscribeEmails().then((response) => {

            this.setState({
                SubscribedUsers: response.data.length
            })
        })

    }

    onSubmitRoute = (event) => {
        console.log(event.target)
        let route;
        if (event.target.value) {
            route = event.target.value;
        } else {
            route = event.target.innerHTML.toString();
        }

        if (route === "Create Recipe") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-recipe");
        } else if (route === "Create Coupon") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-coupon");

        } else if (route === "Create Menu") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-menu");

        } else if (route === "Send Email") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/send-email");

        } else if (route === "Create Subscription Plan") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-subscription-plan");

        } else if (route === "Manage Coupon") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/manage-coupon");

        } else if (route === "Manage Subscription Plan") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/manage-subscription-plan");

        } else if (route === "<< Go Back to Dashboard") {
            route = "Dashboard";
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin");

        }

    }

    render() {

        let routeComponent;
        if (this.state.routeComponent === "Create Recipe") {
            routeComponent = <CreateRecipe route={this.state.routeComponent}
                                           onSubmitRoute={this.onSubmitRoute}
            />
        } else if (this.state.routeComponent === "Create Menu") {
            routeComponent = <CreateMenu route={this.state.routeComponent} onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Send Email") {
            routeComponent = <SendEmail
                subscribedUsers={this.state.SubscribedUsers}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Create Coupon") {
            routeComponent = <CreateCoupon
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Create Subscription Plan") {
            routeComponent = <CreateSubscriptionPlan
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Manage Coupon") {
            routeComponent = <ManageCoupon
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Manage Subscription Plan") {
            routeComponent = <ManageSubscriptionPlan
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Orders") {
            routeComponent = <Orders
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else {
            routeComponent = <Dashboard
                SubscribedUsers={this.state.SubscribedUsers}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}
            />
        }


        return (

            <div className="admin-dashboard-wrapper py-5">

                <div className="container d-flex flex-column">
                    <h1 className="text-center border-bottom border-success">Admin Dashboard</h1>
                </div>

                <div className="px-5 pt-4 pb-3">
                    {routeComponent}
                </div>

            </div>

        )

    }
}

export default AdminDashboard;