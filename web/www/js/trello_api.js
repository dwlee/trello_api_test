$(document).ready(function () { 

	var onAuthorize = function() {
	    updateLoggedIn();
	    $("#output").empty();
	    
	    Trello.members.get("me", function(member){
	        $("#fullName").text(member.fullName);
	    
	        var $cards = $("<div>")
	            .text("Loading Cards...")
	            .appendTo("#output");

	        // Output a list of all of the cards that the member 
	        // is assigned to
	        Trello.get("members/me/cards", function(cards) {
	            $cards.empty();
	            $.each(cards, function(ix, card) {
	                $("<a>")
	                .attr({href: card.url, target: "trello"})
	                .addClass("card")
	                .text(card.name)
	                .appendTo($cards);
	            });  
	        });

	    });

	};

	var updateLoggedIn = function() {
	    var isLoggedIn = Trello.authorized();
	    $("#loggedout").toggle(!isLoggedIn);
	    $("#loggedin").toggle(isLoggedIn);        
	};
	    
	var logout = function() {
	    Trello.deauthorize();
	    updateLoggedIn();
	};
	                          
	Trello.authorize({
	    interactive:false,
	    success: onAuthorize
	});

	$("#connectLink")
	.click(function(){
	    Trello.authorize({
	        type: "popup",
	        success: onAuthorize,
	        scope: {read: "allowRead", write: "allowWrite", account: "allowAccount"} 
	         
	    });
	});
	    
	$("#disconnect").click(logout);
	
	$("#board_name_change")
	.click(function(){
		console.log("board_name_change button");
		Trello.put("/boards/527a1a48df75123f53002cb6/name",
				{value:"new board"},
				function(){console.log("success")}, 
				function(){console.log("fail")});
	});
	
	$("#get_member")
	.click(function(){
		console.log("get_member button");
		Trello.get("/members/me/",function(members){console.log(members);printLog(members)});
	});
	
	$("#get_tokens")
	.click(function(){
		console.log("get_tokens button");
		Trello.get("/members/me/tokens",function(tokens){console.log(tokens);printLog(tokens)});
	});
	
	$("#get_board_info")
	.click(function(){
		console.log("get_board_info button");
		var board_id = $("#board_id").val();	
		$('<h2></h2></br>').html(board_id).appendTo('test_result');
		console.log("board_id: "+board_id);
		Trello.get("boards/"+board_id+"/members",function(info){console.log(info);printLog(info)});
	});
	
	$("#get_member_info")
	.click(function(){
		console.log("get_member_info button");
		var member_id = $("#member_id").val();

		console.log("member_id: "+member_id);
		Trello.get("members/"+member_id,
				{field:"avatarHash,bio,bioData,confirmed,fullName,idPremOrgsAdmin,initials,memberType,products,status,url,username,avatarSource,email,gravatarHash,idBoards,idBoardsInvited,idBoardsPinned,idOrganizations,idOrganizationsInvited,loginTypes,newEmail,oneTimeMessagesDismissed,prefs,status,trophies,uploadedAvatarHash,premiumFeatures"},
				function(members_info){console.log(members_info);printLog(members_info)});
	});
	
	$("#get_token_info")
	.click(function(){
		console.log("get_token_info button");
		var token_id = $("#token_id").val();

		Trello.get("tokens/"+token_id,
				function(members_info){console.log(members_info);printLog(members_info)});
	});
	
	$("#get_token")
	.click(function(){
		console.log("get_token button");
		console.log(Trello.token());
	});
	
	$("#get_token").click(function(){
		console.log("test button");
		var token = Trello.token();
		console.log(token);
		printLog(token)
	});
	
	
	$("#register_webhook").click(function(){
		console.log("register_webhooks button");
		var token = $("#token").val();
		var url = $("#url").val();
		if(url==""){
			url = "http://106.240.238.35:209/rest_api_test";
			//dwlee desktop ip
		}
	    var now = new Date();
		
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var date = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		
		var tag = ""+year+month+ date+hour+min+sec;
		
		
		Trello.post("tokens/"+token+"/webhooks",
				   {description: "My first webhook",
					//callbackURL: "http://localhost/web/rest_api_test",
					callbackURL: url+"?id="+tag,
					idModel: "527a1a48df75123f53002cb6",},
					function(success){console.log("success");console.log(success);printLog("success: "+success.responseText);},
					function(fail){console.log("fail");console.log(fail);printLog("fail: "+fail.responseText);}
					);
			
		printLog("Send post web hooks")
	});
	
	
	$("#get_webhook").click(function(){
		console.log("get_webhooks button");
		
		var token = $("#token").val();
		var url = $("#url").val();
		
		Trello.get("tokens/"+token+"/webhooks",{},
					function(success){console.log("success");console.log(success);printLog(success);},
					function(fail){console.log("fail");console.log(fail);printLog(fail);}
					);
	});
	
	$("#delete_webhook").click(function(){
		console.log("delete_webhook button");
		
		var token = $("#token").val();
		var url = $("#url").val();
		var webhook_id = $("#webhook_id").val();
		
		Trello.delete("tokens/"+token+"/webhooks/"+webhook_id,{},
					function(success){console.log("success");console.log(success);printLog(success);},
					function(fail){console.log("fail");console.log(fail);printLog(fail);}
					);
	});

	$("#test").click(function(){
		console.log("test button");
		var now = new Date();
		
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var date = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
	
		var tag = ""+year+month+ date+hour+min+sec;		
		console.log(tag);

	});
	
	var printLog = function(log){
		
		$("#test_log").prepend(JSON.stringify(log)+"</br>");
		$("#test_log").prepend("<hr/>");
	}

}); 


