import React, { useState, useEffect } from "react";
import Select from "react-select";
import Web3 from "web3";
import "./My_companies.css";

export default function Dashboard() {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };
  useEffect(() => {
    const artifact = require("../contracts/MyContract.json");
    const func = async () => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.log("HI");
          console.error(err);
        }
        const getdata = async () => {
          var d = await contract.methods
            .companiesData()
            .call({ from: accounts[0] });
          //   console.log(d);
          var s = `<tr>
                      <th>COMPANY</th>
                      <th>NO. OF SHARES</th>
                      <th>PRICE</th>
                      <th>% CHANGE</th>
                    </tr>`;
          d.forEach(function (company) {
            s +=
              `<tr>
                        <td>` +
              company.name +
              ` </td>
                        <td>` +
              company.number_of_shares +
              ` </td>
                        <td>` +
              company.curr_stock_price +
              `</td>
                        <td>{2}</td>
                      </tr>`;
          });
          //   console.log(s);
          setData(d);
          document.getElementById("mycom").innerHTML = s;
        };
        getdata();
      } else {
        console.log("problem here");
      }
    };
    func();
  }, []);
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
              <table className="comp-table1" id="mycom">
                {/* <tr>
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
                                </tr> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
