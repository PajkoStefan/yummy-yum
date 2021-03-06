import React from "react";

const UserShippingInformation = (props) => {

    let shippingInfo = JSON.parse(localStorage.getItem("userInformation")).shippingInformation;

    return (

        <div className="user-menu-body-main col">
            <div className="container">
                <div className="row d-flex flex-column">
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Address:
                        </p>
                        <p className="col text-color-green">
                            {
                                shippingInfo ? shippingInfo.address :
                                    <input type="text" placeholder="Address"
                                           name="shipping-address"
                                           required
                                           onChange={props.onChangeShippingInformationHandler}
                                    />
                            }
                        </p>
                    </div>
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Zip Code:
                        </p>
                        <p className="col text-color-green">
                            {
                                shippingInfo ? shippingInfo.zipCode :
                                    <input type="text" placeholder="Zip Code"
                                           name="shipping-zip-code"
                                           required
                                           onChange={props.onChangeShippingInformationHandler}
                                    />
                            }
                        </p>
                    </div>
                    {
                        !shippingInfo ? <div className="col d-flex py-3">
                                <button type="button" className=" btn-save-user-information"
                                        name="save-shipping-information"
                                        onClick={props.onSubmitSave}>
                                    Save
                                </button>
                            </div> :
                            ""
                        // <div className="col d-flex py-3">
                        //     <button type="button" className=" btn-save-user-information"
                        //             name="save-billing-information"
                        //             onClick={props.onSubmitSave}>
                        //         Change
                        //     </button>
                        // </div>

                    }
                </div>
            </div>
        </div>

    )

}

export default UserShippingInformation;