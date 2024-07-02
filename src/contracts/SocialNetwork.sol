//SPOX-License-Identifier:MIT
pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;
    address[] public profilesValid;
    mapping(address=>string) profiles;
    uint256 public  profilecount=0;
    uint public allCommentCount= 0;
    mapping (uint => uint) public commentCount;
    mapping(uint => comment) public comments;
    uint[] public commentid;
    uint256  public flag=0;
    uint256 public accountcount=0;


   
    struct Post {
        uint id;
        string name;
        string hash;
        string content;
        uint tipAmount;
        address payable author;
        
    }
     struct comment{
        uint id;
        uint postId;
        string content;
        address aurthor;
    }

    event PostCreated(
        uint id,
        string name,
        string hash,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,

        string hash,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public {
        name = "Dapp University Social Network";
    }

    function createPost(string memory _content,string memory _hash) public {
        // Require valid content
        require(bytes(_content).length > 0);
        // Increment the post count
        postCount ++;
        string memory name1=" " ;

        
        for (uint i = 0; i < profilesValid.length; i++) {
            if (profilesValid[i] == msg.sender) {
                name1=profiles[msg.sender];
            }
        }
     
        // Create the post
        posts[postCount] = Post(postCount,name1,_hash, _content, 0, msg.sender);

        
        
      
        // Trigger event
        emit PostCreated(postCount,name1,_hash, _content, 0, msg.sender);
        
    }
    function addComment(uint _postId,string memory _content) public{
         require(bytes(_content).length > 0);
         allCommentCount++;
         uint count =commentCount[_postId];
         count++;
         comments[allCommentCount]=comment(allCommentCount,_postId,_content,msg.sender);
        commentCount[_postId]=count;
        commentid.push(_postId);
    }

    
    
 
    function tipPost(uint _id) public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= postCount);
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sending them Ether
        address(_author).transfer(msg.value);
        // Incremet the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostTipped(postCount,_post.hash, _post.content, _post.tipAmount, _author);
    }

    
    function createProfile(string memory _name) public{
        profilesValid.push(msg.sender);
        profiles[msg.sender]=_name;
        profilecount++;
    }
    function returnName()public view returns ( string memory){
        return profiles[msg.sender];
    }
}