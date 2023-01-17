import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Dashboard.css";
import Web3 from "web3";
// import $ from "jquery";

const options = [
  {
    sortCode: "55-77-42",
    accountNumber: "08488234",
    accountType: "Savings Account",
    accountName: "DEF Sam",
  },
  {
    sortCode: "12-43-98",
    accountNumber: "12365432",
    accountType: "Savings Account",
    accountName: "GHI Cena",
  },
  {
    sortCode: "87-20-51",
    accountNumber: "76491234",
    accountType: "Savings Account",
    accountName: "JKL Pandey",
  },
  {
    sortCode: "56-73-39",
    accountNumber: "09865479",
    accountType: "Savings Account",
    accountName: "ABC Singh",
  },
  {
    sortCode: "55-77-42",
    accountNumber: "08488234",
    accountType: "Savings Account",
    accountName: "DEF Sam",
  },
  {
    sortCode: "12-43-98",
    accountNumber: "12365432",
    accountType: "Savings Account",
    accountName: "GHI Cena",
  },
  {
    sortCode: "87-20-51",
    accountNumber: "76491234",
    accountType: "Savings Account",
    accountName: "JKL Pandey",
  },
  {
    sortCode: "56-73-39",
    accountNumber: "09865479",
    accountType: "Savings Account",
    accountName: "ABC Singh",
  },
];
export default function Dashboard() {
  const [value, setValue] = useState();
  const [showCard, setShowCard] = useState(false);
  const [data, setData] = useState("");
  const [contra, setContract] = useState();
  const [accoun, setAccounts] = useState();
  const [com, setCompanies] = useState();
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
          setContract(contract);
          setAccounts(accounts);
        } catch (err) {
          console.log("HI");
          console.error(err);
        }
        const getdata = async () => {
          var d = await contract.methods
            .my_investments(accounts[0])
            .call({ from: accounts[0] });
          // console.log(d);
          var s = `<tr>
                  <th>StockID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Buy Price</th>
                </tr>`;
          d.forEach(function (company) {
            s +=
              `<tr>
              <td>` +
              company.company_id +
              ` </td>
                    
                    <td>` +
              company.stocks_owned +
              ` </td>
                    <td>` +
              company.buy_price +
              `</td>
                    <td>{2}</td>
                  </tr>`;
          });

          // console.log(s);

          document.getElementById("portfolio").innerHTML = s;
        };

        const trendingStocks = async () => {
          var trend = await contract.methods
            .companiesData()
            .call({ from: accounts[0] });
          setCompanies(trend);
          var content = `<tr>
                      <th>StockID</th>
                      <th>COMPANY</th>
                      <th>PRICE</th>
                      <th>LISTING PRICE</th>
                    </tr>`;
          for (var i = 0; i < Math.min(5, trend.length); i++) {
            var company = trend[i];
            content +=
              `<tr>
              <td>` +
              company.company_id +
              ` </td>
                        <td>` +
              company.name +
              ` </td>
                        <td>` +
              company.curr_stock_price +
              ` </td>
                        <td>` +
              company.list_price +
              `</td>
                      </tr>`;
          }
          setData(trend);
          document.getElementById("trending").innerHTML = content;
        };
        trendingStocks();
        getdata();
      } else {
        console.log("problem here");
      }
    };
    func();
  }, []);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    quantity: "",
  });
  function placeOrder(e) {
    e.preventDefault();
    var ty = document.querySelector(
      'input[name="inlineRadioOptions"]:checked'
    ).value;
    var b = 0;

    var p = parseInt(document.getElementById("price").value);
    var q = parseInt(document.getElementById("quantity").value);
    var cid = value.company_id;
    var money = p * q;
    console.log(ty);

    if (ty === "sell") {
      b = 1;
      money = 0;
      contra.methods
        .add_order(cid, p, q, b)
        .send({ from: accoun[0], value: Web3.utils.toWei(money.toString()) });
    } else {
      contra.methods
        .add_order(cid, p, q, b)
        .send({ from: accoun[0], value: Web3.utils.toWei(money.toString()) });
    }
  }
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
              <div className="search">
                <Select
                  name="accounts"
                  styles={style}
                  options={data}
                  value={value}
                  onFocus={() => setShowCard(false)}
                  onChange={(e) => {
                    setShowCard(true);
                    setValue(e);
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option}
                />
              </div>
              <input className="submit" type="submit" value=" " />
            </div>
          </div>
        </div>
        <div
          style={{
            display: showCard ? "block" : "none",
          }}
        >
          <div style={{ marginTop: "2%" }}>
            <div class="card">
              <div class="card-header">Searched Stock</div>
              <div class="card-body">
                <table className="card_table">
                  <tr>
                    <th style={{ paddingLeft: "6%" }}>Stock Owner</th>
                    <td>{showCard ? value.company_id : "none"}</td>
                    <th style={{ paddingLeft: "8%" }}>Stock Name</th>
                    <td>{showCard ? value.name : "none"}</td>
                  </tr>
                  <tr>
                    <th style={{ paddingLeft: "6%" }}>Current Price</th>
                    <td>{showCard ? value.curr_stock_price : "none"}</td>
                    <th style={{ paddingLeft: "8%" }}>Listing Price</th>
                    <td>{showCard ? value.list_price : "none"}</td>
                  </tr>
                  <tr>
                    <th style={{ paddingLeft: "6%" }}>Highest Buy Order</th>
                    <td>$10000</td>
                    <th style={{ paddingLeft: "8%" }}>Lowest Sell Order</th>
                    <td>$1</td>
                  </tr>
                </table>
                <div className="card_buttons">
                  <div>
                    <button
                      style={{ width: "80px" }}
                      type="button"
                      class="btn btn-primary btn-lg"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop1"
                    >
                      Buy
                    </button>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <button
                      type="submit"
                      onClick={() => setShowCard(false)}
                      class="btn btn-outline-secondary btn-lg ml-5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="staticBackdrop1"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <form>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h2 className="modal-title" id="staticBackdropLabel">
                            Buy Stock
                          </h2>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div class="row">
                            <div class="col-md-6 mb-4">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  onChange={(e) => {
                                    setFormData({
                                      ...data,
                                      type: e.target.value,
                                    });
                                  }}
                                  id="femaleGender"
                                  value="buy"
                                />
                                <label
                                  class="form-check-label"
                                  for="femaleGender"
                                >
                                  Buy
                                </label>
                              </div>

                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  onChange={(e) => {
                                    setFormData({
                                      ...data,
                                      type: e.target.value,
                                    });
                                  }}
                                  name="inlineRadioOptions"
                                  id="maleGender"
                                  value="sell"
                                />
                                <label
                                  class="form-check-label"
                                  for="maleGender"
                                >
                                  Sell
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 mb-4 pb-2">
                              <div class="form-outline">
                                <input
                                  type="text"
                                  id="price"
                                  onChange={(e) => {
                                    setFormData({
                                      ...data,
                                      price: e.target.value,
                                    });
                                  }}
                                  class="form-control form-control-lg"
                                />
                                <label class="form-label" for="price">
                                  Price Limit
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6 mb-4 pb-2">
                              <div class="form-outline">
                                <input
                                  type="tel"
                                  id="quantity"
                                  onChange={(e) => {
                                    setFormData({
                                      ...data,
                                      quantity: e.target.value,
                                    });
                                  }}
                                  class="form-control form-control-lg"
                                />
                                <label class="form-label" for="quantity">
                                  Quantity
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={placeOrder}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
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
              <table className="table1" id="portfolio"></table>
            </div>
          </div>
          <div className="right2">
            <div className="tren_stocks">
              <p1>Trending Stocks</p1>
              <table className="table1" id="trending">
                {/* <tr>
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
                </tr> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
