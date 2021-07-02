import React from "react";
import Image from "../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import OrderCartDeliveryTime from "./OrderCartComponents/OrderCartDeliveryTime";
import OrderCartDeliveryDate from "./OrderCartComponents/OrderCartDeliveryDate";
import OrderCartCustomizeIt from "./OrderCartComponents/OrderCartCustomizeIt";
import {useHistory} from 'react-router-dom';
import SellingOrderCart from "../CartTypes/SellingOrderCart";
import SubscriptionOrderCart from "../CartTypes/SubscriptionOrderCart";

const OrderCart = (props) => {

    let removeItem = (param) => {
        console.log(param)
        props.removeHandler(props.cardInfo.cardIndex);
    }

    let mealFromTheWeekOf = () => {
        let mondayDate = props.cardInfo.mealMenuDate.split("-");
        let startDate = new Date(parseInt(mondayDate[2]), (mondayDate[0] - 1), parseInt(mondayDate[1]));
        let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
        const startMonth = startDate.toLocaleString('default', {month: 'long'});
        const endMonth = endDate.toLocaleString('default', {month: 'long'});
        startDate = startMonth + " " + startDate.getDate() + ", " + startDate.getFullYear();
        endDate = endMonth + " " + endDate.getDate() + ", " + endDate.getFullYear()
        return [startDate, endDate];
    }

    let weekDates = mealFromTheWeekOf();

    let deliveryDateHandler = (event) => {
        props.deliveryDateOnChangeHandler(event, props.cardInfo.cardIndex);

    }

    let deliveryTimeHandler = (event, cardId) => {
        props.deliveryTimeOnChangeHandler(event, cardId);
    }

    const populateMealNameInLocalStorage = (mealName, mealMenuDate) => {
        let obj = {
            mealName: mealName,
            mealMenuDate: mealMenuDate,
            cardIdNumber: props.cardInfo.menuCardIndex
        }
        localStorage.setItem("mealInfo", JSON.stringify(obj));
    }

    let history = useHistory();

    let redirectToURL = () => {
        let mealName = props.cardInfo.mealName;
        let mealMenuDate = props.cardInfo.mealMenuDate;
        populateMealNameInLocalStorage(mealName, mealMenuDate)
        history.push("/meals/" + props.cardInfo.mealName);
        // window.open("/meals/" + props.cardInfo.mealName, "_blank").focus();
    }

    return (

        <div className="card">

            {
                !props.isSubscriptionItem ?
                    <SellingOrderCart
                        removeItem={removeItem.bind(this)}
                        weekDates={weekDates}
                        deliveryDateHandler={deliveryDateHandler.bind(this)}
                        deliveryTimeHandler={deliveryTimeHandler.bind(this)}
                        deliveryTimeValue={props.deliveryTimeValue}
                        deliveryDateValue={props.deliveryDateValue}
                        servingOnChangeHandler={props.servingOnChangeHandler}
                        cardHandler={props.cardHandler}
                        redirectToURL={redirectToURL}
                        cardInfo={props.cardInfo}
                        img={props.img}
                    /> :
                    <SubscriptionOrderCart
                        removeItem={removeItem.bind(this)}
                        weekDates={weekDates}
                        deliveryDateHandler={deliveryDateHandler.bind(this)}
                        deliveryTimeHandler={deliveryTimeHandler.bind(this)}
                        deliveryTimeValue={props.deliveryTimeValue}
                        deliveryDateValue={props.deliveryDateValue}
                        redirectToURL={redirectToURL}
                        cardInfo={props.cardInfo}
                        img={props.img}
                    />
            }


        </div>

    )


}

export default OrderCart;