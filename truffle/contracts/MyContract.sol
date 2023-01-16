// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {

  receive() external payable {}

  fallback() external payable {}

  // function sendViaSend(address payable _to,uint _amount_to_send) public payable {
  //       // Send returns a boolean value indicating success or failure.
  //       // This function is not recommended for sending Ether.
  //       (bool success,) = owner.call{value: _amount_to_send}("");
  //       require(success, "Failed to send money");
  //   }
  address payable owner = payable(address(this));

  struct company{
    string name;
    string company_id;
    uint number_of_shares;
    uint curr_stock_price;
    uint list_price;
    uint list_value;
    address owner;
    uint sell_count;
    uint buy_count;
  }

  struct user {
    address user_address;
    uint num_invested;
    uint num_listed;
    mapping(int=>company)investments; 
    mapping(int=>company)owned; 
  }

  struct order{
    uint offer_price;
    address user_address;
    uint number_of_stocks;
    uint order_type; // 0---buy   1--sell
  }

  // order[] public tempo;

  mapping(string=>company) public listed;
  mapping(address=>user) public users_list;
  mapping(string=>order[])public orders;
  
  // function fill_tempo(uint _offer_price,address payable _user_address,uint _number_of_stock,uint _order_type) public {
  //   tempo.push(order(_offer_price,_user_address,_number_of_stock,_order_type));
  // }
  uint public count_listed;
//   uint amount;
//   function send_ether(address payable _addr) payable public {
//         require(msg.value >= amount);
//         _addr.transfer(msg.value);
//     };
  // function temp1() public returns(order[2] memory ) {
  //      order memory _o1=order(200,owner,5,0);
  //      order memory _o2=order(100,owner,5,0);
  //     //  arr.push(_o1);
  //     //  arr.push(_o2);
  //     order[2] memory arr=[_o1,_o2];
  //      quickSort(arr, int(0), int(arr.length - 1));
  //      return arr;
  // }
  uint public dummy=20;
  function sort(order[] memory data) public returns(order[] memory ) {
       quickSort(data, int(0), int(data.length - 1));
       return data;
    }
  function quickSort(order[] memory arr, int left, int right) internal{
      int i = left;
      int j = right;
      if(i==j) return;
      uint pivot = arr[uint(left + (right - left) / 2)].offer_price;
      while (i <= j) {
          while (arr[uint(i)].offer_price < pivot) i++;
          while (pivot < arr[uint(j)].offer_price) j--;
          if (i <= j) {
              (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
              i++;
              j--;
          }
      }
      if (left < j)
          quickSort(arr, left, j);
      if (i < right)
          quickSort(arr, i, right);
  }

  function list_company(string memory _company_name,string memory _company_id,uint _number_of_shares,uint _list_price,uint _list_value)public{
    listed[_company_id]=company({name:_company_name,
            company_id:_company_id,
            number_of_shares:_number_of_shares,
            list_price:_list_price,
            list_value:_list_value,
            owner: msg.sender,
            curr_stock_price:0,
            sell_count:0,
            buy_count:0});
    count_listed++;
  }

  uint public dummy2=30;
  uint public dummy3 = 50;
  function determine_price(string memory _company_id) public returns (uint,uint){
    uint _tot=orders[_company_id].length;
    dummy3 = _tot;
    if(_tot==0){
      return (0,0);
    }
    uint max_trade=0;
    sort(orders[_company_id]);
    uint _num1=0;
    uint _num2=0;
    // order valid_orders[];
    uint tot_price;
    uint tot_num;
    for (uint j=0; j <_tot; j++) {       
        if(orders[_company_id][j].order_type==1){
          _num2+=orders[_company_id][j].number_of_stocks;
        }
        uint _loc_ans=_num2;
        if(listed[_company_id].buy_count-_num1<_loc_ans){
          _loc_ans=listed[_company_id].buy_count-_num1;
        }
        if(orders[_company_id][j].order_type==0){
          _num1+=orders[_company_id][j].number_of_stocks;
        }
        if(max_trade<_loc_ans){
          max_trade=_loc_ans;
          tot_price=orders[_company_id][j].offer_price*(orders[_company_id][j].number_of_stocks);
          tot_num=orders[_company_id][j].number_of_stocks;
          
        }
        else if(max_trade==_loc_ans && max_trade!=0){
          tot_price+=orders[_company_id][j].offer_price*(orders[_company_id][j].number_of_stocks);
          tot_num+=orders[_company_id][j].number_of_stocks;
        }     
    }
    dummy2=tot_num;
    uint price;
    if(tot_num>0){
      price=(tot_price/tot_num);
      listed[_company_id].curr_stock_price=price;
    }
    return (price,max_trade);
  }


  function fulfil(order memory _to_fulfil,uint _price)public{
    if(_to_fulfil.order_type==0){
      /// buy order
      uint refund=(_to_fulfil.offer_price-_price)*_to_fulfil.number_of_stocks;
      // send refund to _to_fulfil.user_address
      // address addr=_to_fulfil.user_address;
      // sendViaSend(payable(addr),refund);
      
      
    }
    else{
      // sell order
      uint revenue=(_price-_to_fulfil.offer_price)*_to_fulfil.number_of_stocks;
      // send revenue to _to_fulfil.user_address
      // address addr=_to_fulfil.user_address;
      // sendViaSend(payable(addr),revenue);
    }
  }


  function trade_at(uint _price,string memory  _company_id,uint num_stocks)public{
    // uint len=orders[_company_id].length;
    // order buy_order[];
    // order sell_order[];
    uint b=0;
    uint s=0;
    for(uint _i=1;_i<=orders[_company_id].length;_i++){
      if(orders[_company_id][_i-1].order_type==0){
        if(orders[_company_id][_i-1].offer_price>=_price && b<num_stocks){
          uint _num1=orders[_company_id][_i-1].number_of_stocks;
          if(_num1>num_stocks-b){
            _num1=num_stocks-b;
          }
          b+=_num1;
          listed[_company_id].buy_count-=_num1;
          fulfil(order(orders[_company_id][_i-1].offer_price,orders[_company_id][_i-1].user_address,_num1,orders[_company_id][_i-1].order_type),_price);
          if(_num1==orders[_company_id][_i-1].number_of_stocks){
            uint _ln=orders[_company_id].length;
            orders[_company_id][_i-1]=orders[_company_id][_ln-1];
            orders[_company_id].pop();
            _i--;
          }
          else{
            orders[_company_id][_i-1].number_of_stocks-=_num1;
          }
        }
      }
      else{
        if(orders[_company_id][_i-1].offer_price<=_price && s<num_stocks){
          uint _num1=orders[_company_id][_i-1].number_of_stocks;
          if(_num1>num_stocks-s){
            _num1=num_stocks-b;
          }
          s+=_num1;
          listed[_company_id].sell_count-=_num1;
          fulfil(order(orders[_company_id][_i-1].offer_price,orders[_company_id][_i-1].user_address,_num1,orders[_company_id][_i-1].order_type),_price);
          if(_num1==orders[_company_id][_i-1].number_of_stocks){
            uint _ln=orders[_company_id].length;
            orders[_company_id][_i-1]=orders[_company_id][_ln-1];
            orders[_company_id].pop();
            _i--;
          }
          else{
            orders[_company_id][_i-1].number_of_stocks-=_num1;
          }
        }        
      }
    }
  }


  function add_order(string memory  _company_id,uint _offer_price,address _user_address,uint _number_of_stock,uint _order_type)public payable{

    // if(_order_type==0){
    //   (bool success,) = owner.call{value: msg.value}("");
    //   require(success, "Failed to send money");
    // }
    
    
    order memory _o=order(_offer_price,_user_address,_number_of_stock,_order_type);
    if(_order_type==0){
      listed[_company_id].buy_count+=_number_of_stock;
    }
    else{
      listed[_company_id].sell_count+=_number_of_stock;
    }
    orders[_company_id].push(_o);
    uint curr_stock_price=0;
    uint num_stocks;
    (curr_stock_price,num_stocks)=determine_price(_company_id);
    
    dummy=curr_stock_price;
    while(orders[_company_id].length!=0 && curr_stock_price!=0){
      listed[_company_id].curr_stock_price=curr_stock_price;
      trade_at(curr_stock_price,_company_id,num_stocks);
      (curr_stock_price,num_stocks)=determine_price(_company_id);
    }
    if(orders[_company_id].length==0 && curr_stock_price!=0){
      listed[_company_id].curr_stock_price=curr_stock_price;
    }
  }
  
}
