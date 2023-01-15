import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div>
            <div className="container1">
                <div className="box1">
                    <div className="left1">
                        <section class="page-contain">
                        <p2>Investment Summary</p2>
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
                        <div className="search_bar">
                            <div className="wrapper">
                                <input className="search" type="text" id="search" placeholder="Search for any stock"/>
                                <input className="submit" type="submit" value=" " />
                            </div>
                        </div>
                    </div>


                </div>
                <div className="box2">
                    <div className="left2">
                        <div className="tren_stocks">
                            <p1>Trending Stocks</p1>
                            <div className="table1">
                                <table>
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
                    <div className="right2">
                        <div className="tren_stocks">
                            <p1>Trending Stocks</p1>
                            <div className="table1">
                                <table>
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
        </div>
    )
}