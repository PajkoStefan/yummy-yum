import React, {Component} from "react";

import './Payment.css';
import validator from "validator/es";
import isAlpha from "validator/es/lib/isAlpha";
import isInt from "validator/es/lib/isInt";

import postPaymentCalls from '../../../../../../repository/post/postPayment';
import postOrderInfo from '../../../../../../repository/post/postOrderInfo';
import postOrderMeals from "../../../../../../repository/post/postOrderMeals";

// import passwordHash from 'password-hash';

class Payment extends Component {

    state = {
        paymentError: {
            shippingAddressError: {
                message: "",
                isError: false
            },
            zipCodeError: {
                message: "",
                isError: false
            },
            nameOnCardError: {
                message: "",
                isError: false
            },
            expirationDateMonthError: {
                message: "",
                isError: false
            },
            expirationDateYearError: {
                message: "",
                isError: false
            },
            securityCodeError: {
                message: "",
                isError: false
            },
            cardNumberError: {
                message: "",
                isError: false
            }
        },
        error: "",
        formValues: {
            shippingAddressValue: "",
            zipCodeValue: "",
            nameOnCardValue: "",
            expirationDateMonthValue: "",
            expirationDateYearValue: "",
            securityCodeValue: "",
            cardNumberValue: "",
        },
        cardCounter: 0
    };

    validateCreditCard = (value) => {

        if (validator.isCreditCard(value)) {
            this.setErrorMessage('Valid CreditCard Number')
        } else {
            this.setErrorMessage('Enter valid CreditCard Number!')
        }
    }

    zipCodeValidator = (value, length, isDigit, field) => {

        if ((length < 6 && isDigit) || length === 0) {
            if (isInt(value)) {
                let obj = {...this.state.formValues, zipCodeValue: value}
                this.setState({
                    formValues: obj
                })
            } else if (value === "") {
                let obj = {...this.state.formValues, zipCodeValue: value}
                this.setState({
                    formValues: obj
                })
            }
        } else {
            this.setErrorMessage(true, field);
        }

        if (value === "") {
            this.setErrorMessage(true, field);
        }

    }

    cardNumberValidator = (value, length, isDigit, field) => {

        if ((length <= 16 && isDigit) || length === 0) {
            if (isInt(value)) {
                let obj = {...this.state.formValues, cardNumberValue: value}
                this.setState({
                    formValues: obj
                })
            } else if (value === "") {
                let obj = {...this.state.formValues, cardNumberValue: value}
                this.setState({
                    formValues: obj
                })
            }
        }

    }

    securityCodeValidator = (value, length, isDigit, field) => {

        if ((length < 5 && isDigit) || length === 0) {
            if (isInt(value)) {
                let obj = {...this.state.formValues, securityCodeValue: value}
                this.setState({
                    formValues: obj
                })
            } else if (value === "") {
                let obj = {...this.state.formValues, securityCodeValue: value}
                this.setState({
                    formValues: obj
                })
            }
        }

    }

    onChangeDigits = async (event) => {

        let length = [...event.target.value].join("").length;
        let lastCharacter = [...event.target.value]
        let isDigit;

        if (length === 1) {
            isDigit = isInt(event.target.value);
        } else if (length > 0) {
            isDigit = isInt(lastCharacter[length - 1]);
        }

        if (event.target.name === "pnb-zip-code") {
            this.zipCodeValidator(event.target.value, length, isDigit, "pnb-zip-code")
        } else if (event.target.name === "pnb-card-number") {
            this.cardNumberValidator(event.target.value, length, isDigit, "pnb-card-number")
        } else if (event.target.name === "pnb-security-code") {
            this.securityCodeValidator(event.target.value, length, isDigit, "pnb-security-code")
        }

    }

    setErrorMessage = (isError, field) => {

        let message = "";
        let paymentError = {...this.state.paymentError}
        let obj = {
            message: message,
            isError: isError
        }
        if (field === "pnb-name-on-card") {
            if (isError) {
                message = "Wrong Name on Card!"
            }
            obj.message = message;
            paymentError.nameOnCardError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-shipping-address") {
            if (isError) {
                message = "Wrong Shipping Address!"
            }
            obj.message = message;
            paymentError.shippingAddressError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-expiration-date-month") {
            if (isError) {
                message = "Wrong Expiration Date(Month)!"
            }
            obj.message = message;
            paymentError.expirationDateMonthError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-expiration-date-year") {
            if (isError) {
                message = "Wrong Expiration Date(Year)!"
            }
            obj.message = message;
            paymentError.expirationDateYearError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-card-number") {
            if (isError) {
                message = "Wrong Card Number!"
            }
            obj.message = message;
            paymentError.cardNumberError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-security-code") {
            if (isError) {
                message = "Wrong Security Code!"
            }
            obj.message = message;
            paymentError.securityCodeError = obj
            this.setState({
                paymentError: paymentError
            })
        } else if (field === "pnb-zip-code") {
            if (isError) {
                message = "Wrong Zip Code!"
            }
            obj.message = message;
            paymentError.zipCodeError = obj
            this.setState({
                paymentError: paymentError
            })
        }

    }

    shippingAddressValidation = (value) => {
        if ((value.length < 100 && value.length) || value === "") {
            let obj = {...this.state.formValues, shippingAddressValue: value}
            this.setState({
                formValues: obj
            })
        }
    }

    nameOfCardValidation = (value) => {

        let patt1 = /[a-zA-Z]+ [a-zA-Z]+/
        let wrongPatt1 = /[0-9]+/;
        let wrongPatt2 = /([^a-zA-Z0-9 ])+/;


        if (patt1.test(value) &&
            !wrongPatt1.test(value) && !wrongPatt2.test(value)) {
        }

        let length = value.length;
        let isAlphaAndSpace;
        let isSpaceAllowedInString;

        if (length > 0) {
            isAlphaAndSpace = isAlpha(value[length - 1]) && value.split(" ").length - 1 <= 1;
            isSpaceAllowedInString = value.split(" ").length - 1 === 1 && value[length - 1] === " "
        }

        if (length > 0 &&
            (isAlphaAndSpace || isSpaceAllowedInString)
        ) {
            if (length === 1 && isAlpha(value)) {
                let obj = {...this.state.formValues, nameOnCardValue: value}
                this.setState({
                    formValues: obj
                })
            } else if (length > 1) {
                let obj = {...this.state.formValues, nameOnCardValue: value}
                this.setState({
                    formValues: obj
                })
            }
        } else if (length === 0) {
            let obj = {...this.state.formValues, nameOnCardValue: value}
            this.setState({
                formValues: obj
            })
        }
    }

    expirationDateMonthValidation = (value) => {

        let month = "";
        let temp = value.toString();
        if (temp.length === 1 && isInt(temp)) {
            let monthRegex1 = new RegExp("[1-9]{1}")
            if (temp.length === 1 && temp.match(monthRegex1)) {
                month = temp;
            } else if (temp.match('0')) {
                month = temp;
            }
            let obj = {...this.state.formValues, expirationDateMonthValue: month}

            this.setState({
                formValues: obj
            })
        } else if (temp.length === 2 && isInt(temp)) {
            let monthRegex2 = new RegExp("1[0-2]{1,1}")
            let monthRegex3 = new RegExp("0[1-9]{1,1}")

            if (temp.length === 2 && temp.match(monthRegex2)) {
                month = temp;
            } else if (temp.length === 2 && temp.match(monthRegex3)) {
                month = temp;
            }
            if (month) {
                let obj = {...this.state.formValues, expirationDateMonthValue: month}
                this.setState({
                    formValues: obj
                })
            }

        }

        if (temp.length === 0) {
            if (isInt(temp) || temp === "") {
                let obj = {...this.state.formValues, expirationDateMonthValue: temp}
                this.setState({
                    formValues: obj
                })
            }
        }


    }

    expirationDateYearValidation = (value) => {
        if (value.length < 5) {
            if (isInt(value) || value === "") {
                let obj = {...this.state.formValues, expirationDateYearValue: value}
                this.setState({
                    formValues: obj
                })
            }
        }
    }

    onChangeTextFields = (event) => {

        if (event.target.name === "pnb-shipping-address") {
            this.shippingAddressValidation(event.target.value)
        } else if (event.target.name === "pnb-name-on-card") {
            this.nameOfCardValidation(event.target.value);
        } else if (event.target.name === "pnb-expiration-date-month") {
            this.expirationDateMonthValidation(event.target.value)
        } else if (event.target.name === "pnb-expiration-date-year") {
            this.expirationDateYearValidation(event.target.value)
        }

    }

    isCardNameValid = () => {
        let fullName = this.state.formValues.nameOnCardValue;
        let cardName = [];
        let flag = true;

        if (fullName.split(" ").length - 1 === 1)
            cardName = fullName.split(" ");


        if (cardName.length === 0) {
            flag = false
        } else if (cardName.length > 0) {
            cardName.forEach(item => {
                if (!isAlpha(item))
                    flag = false
            })
        }

        if (!flag)
            this.setErrorMessage(true, "pnb-name-on-card")
        else
            this.setErrorMessage(false, "pnb-name-on-card")

        return flag;
    }

    isCardNumberValid = () => {
        let cardNumber = this.state.formValues.cardNumberValue;

        let flag = true;


        if (cardNumber.length !== 16) {
            flag = false;
        } else if (!isInt(cardNumber)) {
            flag = false;
        }

        if (!flag)
            this.setErrorMessage(true, "pnb-card-number")
        else
            this.setErrorMessage(false, "pnb-card-number")


        return flag;
    }

    isExpirationMonthValid = () => {
        let expirationMonth = this.state.formValues.expirationDateMonthValue;

        let flag = true;


        if (expirationMonth.length < 1 || expirationMonth.length > 2) {
            flag = false;
        } else if (!isInt(expirationMonth)) {
            flag = false;
        } else if (expirationMonth.length === 1 && expirationMonth === "0") {
            flag = false;
        }

        let newDate = new Date();
        let month = newDate.getMonth();

        if (expirationMonth <= month + 1) {
            flag = false;
        }


        if (!flag)
            this.setErrorMessage(true, "pnb-expiration-date-month")
        else
            this.setErrorMessage(false, "pnb-expiration-date-month")


        return flag;
    }

    isExpirationYearValid = () => {
        let expirationYear = this.state.formValues.expirationDateYearValue;

        let flag = true;

        if (expirationYear.length !== 4) {
            flag = false;
        } else if (!isInt(expirationYear)) {
            flag = false;
        }

        let newDate = new Date();
        let year = newDate.getFullYear();

        if (expirationYear < year) {
            flag = false;
        }
        if (expirationYear - year >= 10) {
            flag = false;
        }

        if (!flag)
            this.setErrorMessage(true, "pnb-expiration-date-year")
        else
            this.setErrorMessage(false, "pnb-expiration-date-year")


        return flag;
    }

    isSecurityCodeValid = () => {
        let code = this.state.formValues.securityCodeValue;

        let flag = true;

        if (code.length !== 4) {
            flag = false;
        } else if (!isInt(code)) {
            flag = false;
        }

        if (!flag)
            this.setErrorMessage(true, "pnb-security-code")
        else
            this.setErrorMessage(false, "pnb-security-code")


        return flag;
    }

    isCardFieldErrors = () => {
        let errors = {
            nameOnCardError: this.state.paymentError.nameOnCardError,
            cardNumberError: this.state.paymentError.cardNumberError,
            expirationDateMonthError: this.state.paymentError.expirationDateMonthError,
            expirationDateYearError: this.state.paymentError.expirationDateYearError,
            securityCodeError: this.state.paymentError.securityCodeError,
            shippingAddressError: this.state.paymentError.shippingAddressError,
            zipCodeError: this.state.paymentError.zipCodeError
        };

        return !errors.nameOnCardError.isError && !errors.cardNumberError.isError
            && !errors.expirationDateMonthError.isError && !errors.expirationDateYearError.isError
            && !errors.securityCodeError.isError && !errors.shippingAddressError.isError
            && !errors.zipCodeError.isError;
    }

    cardValidator = () => {

        const isCardNameValid = this.isCardNameValid();
        const isCardNumberValid = this.isCardNumberValid();
        const isExpirationMonthValid = this.isExpirationMonthValid();
        const isExpirationYearValid = this.isExpirationYearValid();
        const isSecurityCodeValid = this.isSecurityCodeValid();
        const isErrorValid = this.isCardFieldErrors();

        return isCardNameValid && isCardNumberValid && isExpirationMonthValid
            && isExpirationYearValid && isSecurityCodeValid && isErrorValid;

    }

    isShippingAddressValid = () => {
        let formValues = {...this.state.formValues};
        let isAddressValid = true;
        let addressFlag = true;
        if (formValues.shippingAddressValue.length === 0 || formValues.shippingAddressValue.length < 7) {
            isAddressValid = false;
            addressFlag = false;
        }

        if (!addressFlag)
            this.setErrorMessage(true, "pnb-shipping-address")
        else
            this.setErrorMessage(false, "pnb-shipping-address")

        return isAddressValid;
    }

    isZipCodeValid = () => {
        let formValues = {...this.state.formValues};
        let isZipCodeValid = true;

        let zipCodeFlag = true;
        if (formValues.zipCodeValue.length < 5) {
            isZipCodeValid = false;
            zipCodeFlag = false;
        }

        if (!zipCodeFlag)
            this.setErrorMessage(true, "pnb-zip-code")
        else
            this.setErrorMessage(false, "pnb-zip-code")
        return isZipCodeValid;
    }

    shippingAddressValidator = async () => {

        const isAddressValid = this.isShippingAddressValid();
        const isZipCodeValid = this.isZipCodeValid();

        return isAddressValid && isZipCodeValid;

    }

    createPayment = async () => {
        let payment = {
            nameOnCard: this.state.formValues.nameOnCardValue,
            cardNumber: this.state.formValues.cardNumberValue,
            expirationDateMonth: this.state.formValues.expirationDateMonthValue,
            expirationDateYear: this.state.formValues.expirationDateYearValue,
            securityCode: this.state.formValues.securityCodeValue
        }
        await postPaymentCalls.createPayment(payment).then(response => {
            // console.log({message: "The Payment is successfully created!"})
        }).catch(error => {
            console.log(error);
        })
    }

    redirectToPaymentCompleted = () => {
        window.location.href = '/cart/payment-successful'
    }

    generateOrderID = () => {
        let dateToday = new Date();
        let randNumber = Math.floor(100000 + Math.random() * 900000);
        return dateToday.getFullYear().toString() +
            (dateToday.getMonth() + 1).toString() +
            dateToday.getDate().toString() + randNumber;
    }

    createOrderInfo = async () => {

        let orderInfo = JSON.parse(localStorage.getItem("orderSummary"));
        let orderId = this.generateOrderID();
        let obj = {
            "mealNumber": parseInt(orderInfo.meals),
            "servingNumber": parseInt(orderInfo.servings),
            "subtotal": parseFloat(orderInfo.subtotal),
            "shippingCost": parseFloat(orderInfo.shipping),
            "total": parseFloat(orderInfo.total),
            "orderId": orderId,
            "user": {
                "username": localStorage.getItem("username")
            }
        }

        await postOrderInfo.createOrderInfo(obj).then(response => {
            // console.log({message: "The Payment is successfully created!"})
        }).catch(error => {
            console.log(error);
        })
        
        return orderId;

    }

    orderMealObject = (orderMeal) => {
        let mealMenuDate = orderMeal.mealMenuDate.split("-");
        let menuName = "M-" + mealMenuDate[2] + "-" + mealMenuDate[1] + "-" + mealMenuDate[0];

        return {
            mealName: orderMeal.mealName,
            menuName: menuName,
            servings: parseInt(orderMeal.servings),
            customizeIt: orderMeal.customizeIt,
            price: parseFloat(orderMeal.price),
            deliveryTime: orderMeal.deliveryTime,
            deliveryDate: orderMeal.deliveryDate
        };
    }

    createOrderMeals = async (orderId) => {

        let orderMealItems = JSON.parse(localStorage.getItem("orderSummary")).items;
        console.log(orderMealItems)
        let orderMeals = [];
        orderMealItems.map(item => {
            orderMeals.push(this.orderMealObject(item));
        })

        let obj = {
            orderMeals: orderMeals
        }
        console.log(obj)

        await postOrderMeals.createOrderMeals(obj, orderId).then(response => {
            // console.log({message: "The Payment is successfully created!"})
        }).catch(error => {
            console.log(error);
        })

    }

    handleSubmit = async (event) => {

        event.preventDefault();

        const isShippingAddressValid = await this.shippingAddressValidator();
        const isCardValid = await this.cardValidator();

        const isFormValid = isShippingAddressValid && isCardValid;

        if (isFormValid) {
            await this.createPayment();
            let orderId = await this.createOrderInfo();
            await this.createOrderMeals(orderId);
            localStorage.setItem("shoppingCartItems", JSON.stringify([]));
            localStorage.setItem("mealRecipe", JSON.stringify([]));
            localStorage.setItem("mealInfo", JSON.stringify([]));
            // this.redirectToPaymentCompleted()
        }

    }


    render() {

        return (

            <div className="payment-wrapper">

                <div className="payment-container container">

                    <div className="payment-card d-flex justify-content-center py-5">

                        <div className="card p-5">

                            <div>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="pt-5 pb-3 d-flex align-items-center flex-column">

                                        <div className="pnb-fields">

                                            <div className="row mb-3">

                                                <div className="col-9 pr-1">
                                                    <label className="m-0 text-color-green">Shipping
                                                        Address: </label>

                                                    <input type="text" required
                                                           value={this.state.formValues.shippingAddressValue}
                                                           onChange={this.onChangeTextFields}
                                                           name="pnb-shipping-address"
                                                           className="payment-delivery-address-field"
                                                           placeholder="Shipping Address"/>
                                                    {
                                                        this.state.paymentError.shippingAddressError.isError ?
                                                            <p className="text-danger font-size-2">
                                                                {this.state.paymentError.shippingAddressError.message}
                                                            </p> : null
                                                    }
                                                </div>

                                                <div className="col-3 pl-1">
                                                    <label className="m-0 text-color-green">Zip/Postal
                                                        Code: </label>
                                                    <input type="text" required
                                                           value={this.state.formValues.zipCodeValue}
                                                           onChange={this.onChangeDigits}
                                                           name="pnb-zip-code"
                                                           className="payment-zip-code-field"
                                                           placeholder="Zip/Postal Code"/>
                                                    {
                                                        this.state.paymentError.zipCodeError.isError ?
                                                            <p className="text-danger font-size-2">
                                                                {this.state.paymentError.zipCodeError.message}
                                                            </p> : null
                                                    }
                                                </div>

                                            </div>

                                            <div className="row mb-3 flex-column">

                                                <div className="col">
                                                    <label className="m-0 text-color-green">Name on Card: </label>
                                                    <input type="text" required
                                                           value={this.state.formValues.nameOnCardValue}
                                                           onChange={this.onChangeTextFields}
                                                           name="pnb-name-on-card"
                                                           className="payment-name-of-card-field"
                                                           placeholder="John Doe"/>
                                                    {
                                                        this.state.paymentError.nameOnCardError.isError ?
                                                            <p className="text-danger font-size-2">
                                                                {this.state.paymentError.nameOnCardError.message}
                                                            </p> : null
                                                    }
                                                </div>

                                                <div className="col mt-1">
                                                    <label className="m-0 text-color-green">Card Number: </label>
                                                    <input type="text" required
                                                           value={this.state.formValues.cardNumberValue}
                                                           onChange={this.onChangeDigits}
                                                           name="pnb-card-number"
                                                           className="payment-card-number-field"
                                                           placeholder="XXXX XXXX XXXX XXXX"/>
                                                    {
                                                        this.state.paymentError.cardNumberError.isError ?
                                                            <p className="text-danger font-size-2">
                                                                {this.state.paymentError.cardNumberError.message}
                                                            </p> : null
                                                    }
                                                </div>

                                            </div>

                                            <div className="row mb-3">

                                                <div className="col pr-1 d-flex">
                                                    <div className="w-50 pr-1">
                                                        <label className="m-0 text-color-green">Expiration
                                                            Date(Month): </label>
                                                        <input type="text" required
                                                               value={this.state.formValues.expirationDateMonthValue}
                                                               onChange={this.onChangeTextFields}
                                                               name="pnb-expiration-date-month"
                                                               className="payment-card-expiration-date-field"
                                                               placeholder="MM"/>
                                                        {
                                                            this.state.paymentError.expirationDateMonthError.isError ?
                                                                <p className="text-danger font-size-2">
                                                                    {this.state.paymentError.expirationDateMonthError.message}
                                                                </p> : null
                                                        }
                                                    </div>
                                                    <div className="w-50 pl-1">
                                                        <label className="m-0 text-color-green">Expiration
                                                            Date(Year): </label>
                                                        <input type="text" required
                                                               value={this.state.formValues.expirationDateYearValue}
                                                               onChange={this.onChangeTextFields}
                                                               name="pnb-expiration-date-year"
                                                               className="payment-card-expiration-date-field"
                                                               placeholder="YYYY"/>
                                                        {
                                                            this.state.paymentError.expirationDateYearError.isError ?
                                                                <p className="text-danger font-size-2">
                                                                    {this.state.paymentError.expirationDateYearError.message}
                                                                </p> : null
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col pl-1">
                                                    <label className="m-0 text-color-green">Security Code: </label>
                                                    <input type="text" required
                                                           value={this.state.formValues.securityCodeValue}
                                                           onChange={this.onChangeDigits}
                                                           name="pnb-security-code"
                                                           className="payment-card-security-code-field"
                                                           placeholder="CVV"/>
                                                    {
                                                        this.state.paymentError.securityCodeError.isError ?
                                                            <p className="text-danger font-size-2">
                                                                {this.state.paymentError.securityCodeError.message}
                                                            </p> : null
                                                    }
                                                </div>

                                            </div>

                                        </div>

                                        <div className="pay-now-submit-field">
                                            <button type="submit" className="btn-pay-now-submit">
                                                Pay Now
                                            </button>
                                        </div>

                                    </div>

                                </form>

                                <hr/>


                                <div className="payment-policies">

                                    <div className="text-center">

                                        <p className="font-size-3 d-inline text-color-green">
                                            By continuing,
                                            I accept the <span className="font-weight-bolder">YummyYum</span>
                                            <a href="/terms" className="text-decoration-none"> Terms </a>
                                            and
                                            <a href="/privacy-policy" className="text-decoration-none"> Privacy
                                                Policy</a> .
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default Payment;