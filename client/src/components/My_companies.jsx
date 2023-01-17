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
            <div className="comp-container1">
                <div className="comp-box1">
                    <div className="comp-left1">
                        <section class="comp-page-contain">
                            <p2 className="comp-insum">My Companies Summary</p2>
                            <div className="comp-cardsi">
                                <a href="#" class="comp-data-card">
                                    <comph31>5</comph31>
                                    <comph41>Total Companies Owned</comph41>
                                </a>
                                <a href="#" class="comp-data-card">
                                    <comph31>230K$</comph31>
                                    <comph41>Amount Invested</comph41>
                                </a>
                                <a href="#" class="comp-data-card">
                                    <comph31>230K$</comph31>
                                    <comph41>Amount Invested</comph41>
                                </a>
                            </div>
                        </section>


                    </div>
                    <div className="comp-right1">
                    <div className="comp-tren_stocks">
                            <compp1>My Companies Information</compp1>
                            <table className="comp-table1">
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
            </div>
        </div>
    )
};