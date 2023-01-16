import React, { useState } from "react";
import Select from "react-select";
import "./Dashboard.css";

const options = [
    {
        sortCode: "55-77-42",
        accountNumber: "08488234",
        accountType: "Savings Account",
        accountName: "DEF Sam"
    },
    {
        sortCode: "12-43-98",
        accountNumber: "12365432",
        accountType: "Savings Account",
        accountName: "GHI Cena"
    },
    {
        sortCode: "87-20-51",
        accountNumber: "76491234",
        accountType: "Savings Account",
        accountName: "JKL Pandey"
    },
    {
        sortCode: "56-73-39",
        accountNumber: "09865479",
        accountType: "Savings Account",
        accountName: "ABC Singh"
    }
];

export default function Dashboard() {
    const [value, setValue] = useState();
    const [showCard, setShowCard] = useState(false);
    const style = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: "none",
        })
    };
    return (
        <div>
            <div className="container1">
                <div className="box1">
                    <div className="left1">
                        <section class="page-contain">
                            <p2 className="insum">Investment Summary</p2>
                            <div className="cardsi">
                                <a href="#" class="data-card">
                                    <h31>200$</h31>
                                    <h41>Amount Invested</h41>
                                </a>
                                <a href="#" class="data-card">
                                    <h31>230$</h31>
                                    <h41>Current Amount</h41>
                                </a>
                                <a href="#" class="data-card">
                                    <h31>15%</h31>
                                    <h41>Percentage Return</h41>
                                </a>
                            </div>
                        </section>


                    </div>
                    <div className="right1">
                        <div className="wrapper">
                            {/* <input className="search" type="text" id="search" placeholder="Search for any stock" /> */}
                            <div className="search"><Select
                                name="accounts"
                                styles={style}
                                options={options}
                                value={value}
                                onChange={(e) => { setShowCard(true); setValue(e.value); }}
                                getOptionLabel={(option) => option.accountName}
                                getOptionValue={(option) => option.accountNumber}
                            /></div>
                            <input className="submit" type="submit" value=" " />
                        </div>
                    </div>


                </div>
                <div style={{ display: (showCard) ? "block" : "none" }}>
                    <div style={{ marginTop: "2%" }}>
                        <div class="card">
                            <div class="card-header">
                                Searched Stock
                            </div>
                            <div class="card-body">
                                <table className="card_table">
                                    <tr>
                                        <th style={{ paddingLeft: "6%" }}>Stock Owner</th>
                                        <td>Harshit Pachar</td>
                                        <th style={{ paddingLeft: "8%" }}>Stock Name</th>
                                        <td>DEF Sam</td>
                                    </tr>
                                    <tr>
                                        <th style={{ paddingLeft: "6%" }}>Current Price</th>
                                        <td>$1000</td>
                                        <th style={{ paddingLeft: "8%" }}>Listing Price</th>
                                        <td>$5000</td>
                                    </tr>
                                    <tr>
                                        <th style={{ paddingLeft: "6%" }}>Highest Buy Order</th>
                                        <td>$10000</td>
                                        <th style={{ paddingLeft: "8%" }}>Lowest Sell Order</th>
                                        <td>$1</td>
                                    </tr>
                                </table>
                                <div className="card_buttons">
                                    <div><button style={{ width: "80px" }} type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Buy</button>
                                    </div>
                                    <div style={{ marginLeft: "20px" }}><button type="submit" onClick={() => setShowCard(false)} class="btn btn-outline-secondary btn-lg ml-5">Cancel</button></div>
                                </div>
                                <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <form onSubmit="">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h2 className="modal-title" id="staticBackdropLabel">Buy Stock</h2>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-6 mb-4">
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                                    value="buy" />
                                                                <label class="form-check-label" for="femaleGender">Buy</label>
                                                            </div>

                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                                    value="sell" />
                                                                <label class="form-check-label" for="maleGender">Sell</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-6 mb-4 pb-2">

                                                            <div class="form-outline">
                                                                <input type="text" id="price" class="form-control form-control-lg" />
                                                                <label class="form-label" for="price">Price Limit</label>
                                                            </div>

                                                        </div>
                                                        <div class="col-md-6 mb-4 pb-2">

                                                            <div class="form-outline">
                                                                <input type="tel" id="quantity" class="form-control form-control-lg" />
                                                                <label class="form-label" for="quantity">Quantity</label>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                </div>
                <div className="box2">
                    <div className="left2">
                        <div className="tren_stocks">
                            <p1>Your Investments</p1>
                            <table className="table1">
                                <tr>
                                    <th>COMPANY</th>
                                    <th>NO. OF SHARES</th>
                                    <th>PRICE</th>
                                    <th>% CHANGE</th>
                                </tr>
                                {options.map((option) => (
                                    <tr>
                                        <td>{option.sortCode}</td>
                                        <td>{option.accountNumber}</td>
                                        <td>{option.accountType}</td>
                                        <td>{option.accountName}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Google</td>
                                    <td>20</td>
                                    <td>1500</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Twitter</td>
                                    <td>25</td>
                                    <td>1000</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>Meta</td>
                                    <td>30</td>
                                    <td>1200</td>
                                    <td>15</td>
                                </tr>

                            </table>

                        </div>
                    </div>
                    <div className="right2">
                        <div className="tren_stocks">
                            <p1>Trending Stocks</p1>
                            <table className="table1">
                                <tr>
                                    <th>COMPANY</th>
                                    <th>PRICE</th>
                                    <th>% CHANGE</th>
                                </tr>
                                <tr>
                                    <td>Google</td>
                                    <td>1500</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Twitter</td>
                                    <td>1000</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>Meta</td>
                                    <td>1200</td>
                                    <td>15</td>
                                </tr>

                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};