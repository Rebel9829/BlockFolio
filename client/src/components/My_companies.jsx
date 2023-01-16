import React, { useState } from "react";
import Select from "react-select";
import "./My_companies.css";


export default function Dashboard() {
    const [value, setValue] = useState();
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
                            <p2 className="insum">My Companies Summary</p2>
                            <div className="cardsi">
                                <a href="#" class="data-card">
                                    <h31>5</h31>
                                    <h41>Total Companies Owned</h41>
                                </a>
                                <a href="#" class="data-card">
                                    <h31>230K$</h31>
                                    <h41>Amount Invested</h41>
                                </a>
                                <a href="#" class="data-card">
                                    <h31>230K$</h31>
                                    <h41>Amount Invested</h41>
                                </a>
                            </div>
                        </section>


                    </div>
                    <div className="right1">
                    <div className="tren_stocks">
                            <p1>My Companies Information</p1>
                            <table className="table1">
                                <tr>
                                    <th>COMPANY</th>
                                    <th>NO. OF SHARES</th>
                                    <th>PRICE</th>
                                    <th>% CHANGE</th>
                                </tr>

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


                </div>
                {/* <div className="box2">
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

                </div> */}
            </div>
        </div>
    )
};