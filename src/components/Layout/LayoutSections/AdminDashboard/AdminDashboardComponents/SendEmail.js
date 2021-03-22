import React, {Component} from "react";

import SubscribeEmailCalls from "../../../../../repository/get/getSubscribeEmail";

class SendEmail extends Component {


    state = {
        subscribeEmails: [],
        sendToList: [],
        CCList: [],
        recipients: "",
        isUnchecked: true
    }

    async componentDidMount() {

        await this.getSubscribeEmails()

    }

    recipientsHandler = (list) => {
        this.setState({
            recipients: list.join(", ")
        })
    }

    uncheckedHandler = () => {
        let arrayOfObjects = []
        this.state.subscribeEmails.forEach(item => {
            arrayOfObjects.push({
                email: item.email,
                isIncludedToRecipients: false
            })
        })

        this.setState({
            sendToList: [],
            subscribeEmails: arrayOfObjects,
            isUnchecked: true
        })

        this.recipientsHandler([]);
    }

    //add all emails to sendToList
    getSubscribeEmails = async () => {
        await SubscribeEmailCalls.fetchSubscribeEmails().then(response => {
            let emails = response.data.map(item => {
                return {
                    email: item.email.email,
                    isIncludedToRecipients: false
                }
            })
            this.setState({
                subscribeEmails: emails
            })
        }).catch(error => {
            console.log(error);
        })
    }

    addAllEmailsToRecipients = () => {
        let list = [];
        let arrayOfObjects = []
        this.state.subscribeEmails.forEach(item => {
            list.push(item.email);
            arrayOfObjects.push({
                email: item.email,
                isIncludedToRecipients: !this.state.isIncludedToRecipients
            })
        })

        this.setState({
            sendToList: list,
            subscribeEmails: arrayOfObjects,
            isUnchecked: false
        })

        this.recipientsHandler(list);
    }

    addEmailToRecipients = (event) => {

        let arrayOfObjects = [...this.state.subscribeEmails];
        let isAdded;

        arrayOfObjects.forEach((item, index) => {
            if (item.email === event.target.value) {
                arrayOfObjects[index] = {
                    email: item.email,
                    isIncludedToRecipients: !arrayOfObjects[index].isIncludedToRecipients
                }
                isAdded = arrayOfObjects[index].isIncludedToRecipients;
            }
        })

        let list = [...this.state.sendToList];

        if (list.includes(event.target.value)) {
            list.splice(list.indexOf(event.target.value), 1)
        } else {
            list.push(event.target.value)
        }

        this.setState({
            sendToList: list,
            subscribeEmails: arrayOfObjects
        })
        this.recipientsHandler(list);

    }


    handleSubmit = (event) => {
        alert('Email is sent!');

        event.preventDefault();

    }

    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-menu row py-3 ">

                    <div className="col-8">

                        <form onSubmit={this.handleSubmit}>

                            <div className="row d-flex flex-column">

                                <div className="row justify-content-center pb-4">
                                    <h3>Send Email</h3>
                                </div>

                                <div className="row">

                                    <div className="col text-center">

                                        <div className="col d-flex flex-column">
                                            <label className="align-self-start">To:</label>
                                            <input
                                                type="text" placeholder="recipients" className="w-50 mb-2"
                                                defaultValue={this.state.recipients}
                                            />
                                        </div>

                                        <div className="col d-flex flex-column">
                                            <label className="align-self-start">Subject:</label>
                                            <input type="text" className="w-50 mb-2"/>
                                        </div>

                                        <div className="col d-flex flex-column">
                                            <label className="align-self-start">CC:</label>
                                            <input type="text" className="w-50 mb-2"/>
                                        </div>

                                        <div className="col d-flex flex-column mb-2">
                                            <label className="align-self-start">Text:</label>
                                            <textarea className="w-75" rows="8"/>
                                        </div>

                                        <div className="col d-flex flex-column">
                                            <input type="file" className="w-50 mb-2 btn-email-attach"/>
                                        </div>

                                        <div className="col d-flex flex-column ">
                                            <input type="submit" value="Send Email!"
                                                   className="w-50 align-self-center"/>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>


                    <div className="col-4">

                        <div className="d-flex justify-content-center align-items-center">

                            <p className="">Subscribed Users: </p>

                            <p className="bg-white text-color-green p-2 ml-2">
                                {this.props.subscribedUsers}
                            </p>

                        </div>


                        <div className="subscribers-list py-4">

                            <div className="row d-flex justify-content-center align-items-center">

                                <div className="col-9">
                                    <label className="pr-4">Add All Emails to Recipients: </label>
                                </div>

                                <div className="col-3">
                                    <button type="button" onClick={this.addAllEmailsToRecipients}
                                            className="btn-add-to-recipients mb-1">
                                        Add
                                    </button>
                                </div>

                            </div>

                            <div className="col d-flex justify-content-end">
                                <div className="col-7 align-self-center">
                                    <label className="pr-4">Uncheck All Emails: </label>
                                </div>
                                <div className="col-5">
                                    <button type="button" onClick={this.uncheckedHandler}
                                            className="btn-add-to-recipients mb-1">
                                        Unchecked
                                    </button>
                                </div>
                            </div>

                            <hr/>

                            <ul className="list-unstyled sl mt-2">
                                {
                                    this.state.subscribeEmails.map((item, index) => {
                                        return <li key={(index + 1)} className="py-1">
                                            <div className="row">
                                                <div className="d-flex col-10">
                                                    <p className="mr-1">{(index + 1)}.</p>
                                                    <p>{item.email}</p>
                                                </div>
                                                <div className="col-2 text-center">
                                                    {
                                                        !item.isIncludedToRecipients ? <button
                                                                onClick={this.addEmailToRecipients}
                                                                type="button" value={item.email}
                                                                className="add-email-on-plus">
                                                                +
                                                            </button>
                                                            :
                                                            <button
                                                                onClick={this.addEmailToRecipients}
                                                                type="button" value={item.email}
                                                                className="remove-email-on-minus">
                                                                -
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default SendEmail;