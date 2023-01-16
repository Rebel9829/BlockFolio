// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Exchange {
    struct buy_order{
        address investor;
        uint bid;
        uint quantity;
    }
    struct sell_order{
        address investor;
        uint offer;
        uint quantity;
    }

    struct investment {
        address stock;
        uint quantity;
        uint buy_price;
    }
    struct my_buy_order{
        address stock;
        uint bid;
        uint quantity;
    }
    struct my_sell_order{
        address stock;
        uint offer;
        uint quantity;
    }
    struct investor {
        address investor_address;
        uint num_invested;
        uint num_listed;
        address[] investments;
        mapping(address=>investment) investmentsDetails;
        my_buy_order[] buyOrders;
        my_sell_order[] sellOrders;
    }
    struct stock {
        string name;
        address owner;
        string cid;
        uint price;
        uint listingPrice;
    }
    mapping(address=>investor) public investors;
    string[] public stocks;
    uint public totalStocks;
    mapping(string=>stock) public stocksDetails;
    mapping(string=>buy_order[]) public buyOrders;
    mapping(string=>sell_order[]) public sellOrders;

    function listCompany(string memory _name, string memory _id, uint _list_price, uint _quantity) public {
        stocks.push(_id);
        stock memory temp = stock({
            name: _name,
            owner: msg.sender,
            cid: _id,
            price: _list_price,
            listingPrice: _list_price
        });
        stocksDetails[_id] = temp;
        sell_order memory neworder = sell_order({
            investor: msg.sender,
            offer: _list_price,
            quantity: _quantity
        });
        sellOrders[_id].push(neworder);
        totalStocks++;
    }

    receive() external payable {
        // can be empty
    }

    function test(string memory _id) public returns (uint, uint){
        return (buyOrders[_id].length, sellOrders[_id].length);
    }
    // function addOrder(string memory _id, uint _price, uint _quantity) public {
    //     buy_order memory neworder = buy_order({
    //         investor: msg.sender,
    //         bid: _price,
    //         quantity: _quantity
    //     });
    //     buyOrders[_id].push(neworder);
    //     uint s = buyOrders[_id].length;
    //     // for(uint i = s-2; i>=0; i--){
    //     //     buy_order memory order = buyOrders[_id][i];
    //     //     if(order.bid > _price){
    //     //            buyOrders[_id][i+1] = buyOrders[_id][i];
    //     //     }else{
    //     //         buyOrders[_id][i+1] = neworder;
    //     //     }
    //     // }
    // }
    address payable owner = payable(address(this));
    function buy(string memory _id, uint _price, uint _quantity) public payable {
        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send money");
        buy_order memory neworder = buy_order({
            investor: msg.sender,
            bid: _price,
            quantity: _quantity
        });
        buyOrders[_id].push(neworder);
        uint s = buyOrders[_id].length;
        // uint i = s-2;
        // while(i > 0){
        //     // buy_order memory order = buyOrders[_id][i-1];
        //     // if(order.bid > _price){
        //     //        buyOrders[_id][i] = buyOrders[_id][i-1];
        //     // }else{
        //     //     buyOrders[_id][i] = neworder;
        //     //     i = 0;
        //     // }
        //     s++;
        //     i = 0;
        // }
        while(s > 0){
            buy_order memory order = buyOrders[_id][s-1];
            if(order.bid > _price){
                   buyOrders[_id][s] = buyOrders[_id][s-1];
                   if(s > 0){
                    s--;
                   }
            }else{
                buyOrders[_id][s] = neworder;
                s = 0;
            }
        }
    }
}
