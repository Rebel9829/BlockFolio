// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {

  receive() external payable {}

  fallback() external payable {}

  function sendViaCall(address payable _to,uint _amount_to_send) public payable {
        // Send returns a boolean value indicating success or failure.
        // This function is not recommended for sending Ether.
        _amount_to_send*=(1000000000000000000);
        (bool success,) = _to.call{value:_amount_to_send }("");
        require(success, "Failed to send money");
    }
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
  function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
    bytes memory b1 = bytes(s1);
    bytes memory b2 = bytes(s2);
    uint256 l1 = b1.length;
    if (l1 != b2.length) return false;
    for (uint256 i=0; i<l1; i++) {
        if (b1[i] != b2[i]) return false;
    }
    return true;
}
  struct investment{
    string company_id;
    uint stocks_owned;
    uint buy_price;
  }
  struct user {
    address user_address;
    uint num_invested;
    uint num_listed;
    investment[]my_invests;
    company[]my_owned; 
  }
  company[] public companies;
  function companiesData() public returns( company [] memory){
    return companies;
  }
  struct order{
    uint offer_price;
    address user_address;
    uint number_of_stocks;
    uint order_type; // 0---buy   1--sell
  }

  mapping(string=>company) public listed;
  mapping(address=>user) public users_list;
  mapping(string=>order[])public orders;
  uint public count_listed;


  function bubble_sort(string memory _company_id) public{
    uint n=orders[_company_id].length;
    for(uint i=0;i<n;i++){
      for(uint j=0;j+1<n;j++){
        if(orders[_company_id][j].offer_price>orders[_company_id][j+1].offer_price){
          order memory yo=orders[_company_id][j];
          orders[_company_id][j]=orders[_company_id][j+1];
          orders[_company_id][j+1]=yo;
        }
      }
    }
  }
  function my_investments(address _user_address) public returns(investment[] memory){
    return users_list[_user_address].my_invests;
  }
  function my_companies(address _user_address) public returns(company[] memory){
    return users_list[_user_address].my_owned;
  }
  function list_company(string memory _company_name,string memory _company_id,uint _number_of_shares,uint _list_price,uint _list_value)public{
    listed[_company_id]=company({name:_company_name,
            company_id:_company_id,
            number_of_shares:_number_of_shares,
            list_price:_list_price,
            list_value:_list_value,
            owner: msg.sender,
            curr_stock_price:_list_price,
            sell_count:0,
            buy_count:0});
    count_listed++;
    companies.push(listed[_company_id]);
    add_order(_company_id,_list_price,_number_of_shares,1);
    users_list[msg.sender].my_owned.push(listed[_company_id]);
  }

  function determine_price(string memory _company_id) public returns (uint,uint){
    uint _tot=orders[_company_id].length;
    if(_tot==0){
      return (0,0);
    }
    uint max_trade=0;
    bubble_sort(_company_id);
    uint _num1=0;
    uint _num2=0;
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
    uint price;
    if(tot_num>0){
      price=(tot_price/tot_num);
      listed[_company_id].curr_stock_price=price;
    }
    return (price,max_trade);
  }


  function fulfil(order memory _to_fulfil,uint _price,string memory _company_id)public{
    if(_to_fulfil.order_type==0){
      /// buy order
      uint refund=(_to_fulfil.offer_price-_price)*_to_fulfil.number_of_stocks;
      // send refund to _to_fulfil.user_address
      address addr=_to_fulfil.user_address;
      sendViaCall(payable(addr),refund);
   
    }
    else{
      // sell order
      uint revenue=(_price-_to_fulfil.offer_price)*_to_fulfil.number_of_stocks;
      // send revenue to _to_fulfil.user_address
      address addr=_to_fulfil.user_address;
      sendViaCall(payable(addr),revenue);
    }
  }


  function trade_at(uint _price,string memory  _company_id,uint num_stocks)public{
    
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
          


          // ///****************************************************************************************** */
          bool found=false;
          for(uint _j=0;_j<users_list[orders[_company_id][_i].user_address].num_invested;_j++){
            if(stringsEquals(users_list[orders[_company_id][_i].user_address].my_invests[_j].company_id,_company_id)){
              found=true;
              users_list[orders[_company_id][_i].user_address].my_invests[_j].stocks_owned+=_num1;
            }
          }
          if(!found){
            investment memory _tmpi=investment(_company_id,_num1,_price);
            users_list[orders[_company_id][_i].user_address].my_invests.push(_tmpi);
            users_list[orders[_company_id][_i].user_address].num_invested++;
          }

          // //*************************************************************************** */
          fulfil(order(orders[_company_id][_i-1].offer_price,orders[_company_id][_i-1].user_address,_num1,orders[_company_id][_i-1].order_type),_price,_company_id);
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


          // ////************************************************************************************ */
          for(uint _j=0;_j<users_list[orders[_company_id][_i].user_address].num_invested;_j++){
            if(stringsEquals(users_list[orders[_company_id][_i].user_address].my_invests[_j].company_id,_company_id)){
              users_list[orders[_company_id][_i].user_address].my_invests[_j].stocks_owned-=_num1;
              if(users_list[orders[_company_id][_i].user_address].my_invests[_j].stocks_owned==0){
                uint _ll=users_list[orders[_company_id][_i].user_address].my_invests.length;
                users_list[orders[_company_id][_i].user_address].my_invests[_j]=users_list[orders[_company_id][_i].user_address].my_invests[_ll-1];
                users_list[orders[_company_id][_i].user_address].my_invests.pop();
                users_list[orders[_company_id][_i].user_address].num_invested--;
              }
            }
          }
          // ////////////********************************************************************************* */

          fulfil(order(orders[_company_id][_i-1].offer_price,orders[_company_id][_i-1].user_address,_num1,orders[_company_id][_i-1].order_type),_price,_company_id);
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


  function add_order(string memory  _company_id,uint _offer_price,uint _number_of_stock,uint _order_type)public payable{
    address _user_address=msg.sender;
    if(_order_type==0){
      (bool success,) = owner.call{value: msg.value}("");
      require(success, "Failed to send money");
    }
    
    
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
