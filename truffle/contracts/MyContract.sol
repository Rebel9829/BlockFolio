// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {
  struct company{
    string name;
    string company_id;
    uint number_of_shares;
    uint curr_stock_price;
    uint list_price;
    uint list_value;
    address owner;
  }
  struct user {
    address user_address;
    uint num_invested;
    uint num_listed;
    mapping(int=>company)investments; 
    mapping(int=>company)owned; 
  }
  mapping(string=>company) public listed;
  mapping(address=>user) public users_list;
  uint public count_listed;
  uint public count_users;
//   uint amount;
//   function send_ether(address payable _addr) payable public {
//         require(msg.value >= amount);
//         _addr.transfer(msg.value);
//     };
  function list_company(string memory _company_name,string memory _company_id,uint _number_of_shares,uint _list_price,uint _list_value)public{
    listed[_company_id]=company({name:_company_name,
            company_id:_company_id,
            number_of_shares:_number_of_shares,
            list_price:_list_price,
            list_value:_list_value,
            owner: msg.sender,
            curr_stock_price:0});
    count_listed++;
  }
  
}
