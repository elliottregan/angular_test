function formCtr($scope, formData, accountData) {

  init();
  
  function init() {
    $scope.fdbkCampaign = accountData.getActiveCampaigns()[0];
    $scope.title = 'Settings';
  };
 
};

function controlPanelCtr($scope) {
  
  $scope.receiveFdbk = function() {
    var campaignIndex = ['camp0', 'camp1'].sample();
    messageId = Number.random(10,500);
    var newMessage = {
      id: 'msg10',
      author: "user1",
      time: "just now",
      questionsList: [
        {
          id: 'asdf',
          type: 'multipleChoice',
          text: "How was your service today?",
          answers: [
            {
              id: 0,
              text: "ass"
            },
            {
              id: 2,
              text: "mehhhhh..."
            },
            {
              id: 3,
              text: "better than not"
            },
            {
              id: 4,
              text: "fabul-fucking-tastic!"
            }
          ],
          response: 4
        },
        {
          id: 'asdf2',
          type: 'binary',
          text: "Yes or no?",
          answers: [
            {
              id: 50,
              text: "yes"
            },
            {
              id: 52,
              text: "no"
            }
          ],
          response: 50
        },
        {
          id: 'asdf3',
          type: 'freeText',
          text: "Tell us about something you like.",
          answers: [],
          response: "I like turtles."
        },
        {
          id: 'asdf4',
          type: 'number',
          text: "How old are you?",
          answers: [],
          response: 18
        },
        {
          id: 'asdf5',
          type: 'rating',
          text: "Rate your overall experience.",
          answers: [
            {
              id: 30,
              text: "poor"
            },
            {
              id: 32,
              text: "fair"
            },
            {
              id: 33,
              text: "good"
            },
            {
              id: 34,
              text: "great"
            },
          ],
          response: 33
        }
      ],
      heard: "false",
      comments: [],
      reward: {
        id: "rwd1",
        title: 'Free rocket ball',
        description: 'What is a rocket ball?',
        creator: "RocketMan",
        terms: "Guess correctly, and you get it for free!",
        exp_date: "2/28/1993",
        date_claimed: false,
        verified: false,
        owner: "user1",
        passphrase: "applegoat",
        date_issued: "1/2/1013",
        shared_with: ["Joe", "Mark", "Ruby"]
      },
      collaboration: {
        importance: false,
        tags: [],
        tagged_users: [],
        comments: []
      }
    };

    $scope.$emit("NEW_MESSAGE", campaignIndex, newMessage, messageId);
  
  };

};

function appCtr($scope, $stateParams, $state, $location, $route, $timeout, accountData) {
  
  $scope.sortableOptions = {
    axis: 'y',
    distance: 30,
    handle: ".handle"
  };
  
  $scope.$on("NEW_MESSAGE", function(event, campaignIndex, message, messageId) {
    $scope.$broadcast("MESSAGE_RECEIVED", campaignIndex, message, messageId);
  }); 
  
    
  init();
  
  function init() {
    console.log("initialize app controller");
    $scope.title = 'default title';
    
  };
  
  $scope.currentCampaign = "camp0";
  
  $scope.sidebar_visible = false;  
  
  $scope.toggleSidebar = function(direction) {
    
    if ($stateParams.campaignId) {
      var arrayOfCampaignIds = $stateParams.campaignId.split("+");
      $scope.multipleViewCampaigns = arrayOfCampaignIds.length > 1;
    }
    
    if ( (!$scope.sidebar_visible) && (direction != undefined) ) {
      
      $scope.sidebar_in_frame = true;
      $scope.sidebar_visible = true;
      
      $('.main_nav').toggleClass('visible');
      
      if (direction == 'left') {
        $('#main_view').toggleClass('slide_left');
        $('.main_nav').addClass("invisible");
        $('.main_nav').removeClass("visible");
        $('.second_nav').addClass("visible");
        $('.second_nav').removeClass("invisible");
      }
      else if (direction == 'right') {
        $('#main_view').toggleClass('slide_right');
        $('.main_nav').addClass("visible");
        $('.main_nav').removeClass("invisible");
        $('.second_nav').addClass("invisible");
        $('.second_nav').removeClass("visible");
        
      }
      
    }
    else {
      $('.main_nav').removeClass('visible');
      $scope.sidebar_visible = false;
      $('#main_view').removeClass('slide_right');
      $('#main_view').removeClass('slide_left');
      $scope.sidebar_in_frame = false;
      $scope.sidebar_visible = false;
    }

  };
  
  $scope.personal_pages_visible = false;
  
  $scope.togglePersonalPages = function() {
    $scope.personal_pages_visible = !$scope.personal_pages_visible;
  };
  
  $scope.togglePanel = function(panelName) {
    $('aside').toggleClass('visible');
    $scope.panel=panelName;
    
    $scope.buildQuestion = {
        id: "",
        type: "",
        text: "",
        answers: []
    };
    
    $scope.editing_question = false;
  };
  
  function Campaign(id, handle, title, local, location, discoverable) {
    
    this.id = id,
    this.handle = handle,
    this.title = title,
    this.description = 'This is the default description.',
    this.local = local,
    this.location = location,
    this.discoverable = discoverable,
    this.questionsList = [],
    this.reward =
      {
        title: '',
        description: '',
        terms: ''
      },
    this.permissions = 
      {
        accepted: [],
        pending: []
      }
  };
  
  $scope.steps = [0,1,2,3,4];
  
  $scope.currentStep = 0;
  
  $scope.resetStep = function() {
    $scope.currentStep = 0;
  };
  
  $scope.changeStep = function(step) {
    $scope.currentStep = step;
  };
  
  $scope.advanceStep = function() {
    
    if ($scope.currentStep < $scope.steps.length-1) {
      $scope.currentStep = $scope.currentStep+1;
    };
  };
  
  $scope.panel = 'default';
  
  getDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if (dd<10) {
      dd='0'+dd
    }
    if (mm<10) {
      mm='0'+mm
    }
    
    today = yyyy+mm+dd;
    return today;
    
  };
  
};

function userCtr($scope, userData, accountData) {
  console.log("initialize user controller");
  init();
  
  function init() {
    
    $scope.userDetails = userData.getUserDetails();
    
    $scope.accounts = accountData.getAccount();
    $scope.accountList = Object.keys($scope.accounts);
    
    $scope.title = 'Settings';
  };

};

function accountCtr($scope, $stateParams, $location, tempObjects, accountData) {
  console.log("initialize account controller");
  init();  
  
  function init() {
    
    $scope.accountId = $stateParams.accountId;
    $scope.handle = $scope.accounts[$scope.accountId].handle;
    
    $scope.handleList = accountData.getHandle($scope.accountId);
    $scope.campaignList = accountData.getActiveCampaigns($scope.accountId);
    $scope.archivedCampaignList = accountData.getArchivedCampaigns($scope.accountList[0]);    
  
  };
};

function dashboardCtr($scope, $stateParams, $location, tempObjects, accountData) {
  console.log("initialize dashboard controller");
  $scope.buildCampaign = tempObjects.getBuildCampaign();
  checkForArchived();
  $scope.view_archived = false;
  $scope.edit_mode = false;
  $scope.new_mode = false;
  
  $scope.selected_campaigns = [];
  
  
  $scope.archiveListItem = function(clicked_list_item, parent_object) {
    $scope.toggleEditMode();
    $scope.campaignList[clicked_list_item].archived = true;
    $scope.archivedCampaignList[clicked_list_item] = angular.copy($scope.campaignList[clicked_list_item]);
    $scope.campaignList = Object.reject($scope.campaignList, clicked_list_item);    
    
    console.log($scope.campaignList)
    console.log($scope.archivedCampaignList)
    checkForArchived();
  };
  
  $scope.unarchiveListItem = function(clicked_list_item, relocate_to_object) {
    $scope.archivedCampaignList[clicked_list_item.id].archived = false;
    $scope.campaignList[clicked_list_item.id] = angular.copy($scope.archivedCampaignList[clicked_list_item.id]);
    $scope.archivedCampaignList = Object.reject($scope.archivedCampaignList, clicked_list_item.id);
    checkForArchived();
  };
  
  function checkForArchived() {
  
    if ( Object.isEmpty($scope.archivedCampaignList) ) {
      $scope.archiveExists = false;
    }
    else {
      $scope.archiveExists = true;
    }
    
    if ( Object.isEmpty($scope.campaignList) ) {
      $scope.archiveExists = true;
    }
  
  }
  
  $scope.toggleArchived = function() {
    $scope.view_archived = !$scope.view_archived;
  };
  
  $scope.selectCampaign = function(campaign_id) {
    
    var selected_campaigns_url_string = "";
    
    if ( $scope.selected_campaigns.some(campaign_id) ) {
      $scope.selected_campaigns.remove(campaign_id);
    }
    else {
      $scope.selected_campaigns.push(campaign_id);
    };
    
    if ($scope.selected_campaigns.length == 0) {
      $scope.edit_mode = false;
      $scope.disable_single_edit_buttons = false;
      $scope.edit_link = "";
      selected_campaigns_url_string = "";
    }
    else if ($scope.selected_campaigns.length == 1) {
      $scope.edit_mode = true;
      $scope.disable_single_edit_buttons = false; 
      $scope.edit_link = "#/campaign/"+$scope.selected_campaigns[0]+"/edit";
      selected_campaigns_url_string = selected_campaigns_url_string.add(campaign_id);
      $scope.view_link = "#/campaign/{1}/conversations".assign(selected_campaigns_url_string);
    }
    else if ( $scope.selected_campaigns.length >= 2 ) {
      $scope.disable_single_edit_buttons = true;
      $scope.edit_link = "";
      $scope.selected_campaigns.forEach(function(campaign_id) {
        selected_campaigns_url_string = selected_campaigns_url_string.add("+"+campaign_id);
        while(selected_campaigns_url_string.charAt(0) === '+') {
            selected_campaigns_url_string = selected_campaigns_url_string.substr(1);
        };
        $scope.view_link = "#/campaign/{1}/conversations".assign(selected_campaigns_url_string);
      });
    };
    
  };
    
  $scope.changeHandle = function() {
    if ($scope.handle != "+") {
      $scope.handle_to_submit = $scope.handle;
    }
    else {
      $scope.handle_to_submit = '';
    }
  };
  
  $scope.duplicateMode = function(state, clicked_campaign) {
    $scope.duplicating_mode = state;
    
    if (clicked_campaign != '') {
      $scope.temporary_duplicate = angular.copy($scope.campaignList[clicked_campaign]);
      $scope.temp_handle = $scope.temporary_duplicate.handle; 
    }
    else {
      $scope.temporary_duplicate = '';
      $scope.temp_handle = ''; 
    }
    $scope.toggleEditMode();
  };
  
  $scope.duplicateCampaign = function(title, handle) {
    
    var datetime = new Date().getTime();
    
    $scope.temporary_duplicate.handle = handle;
    $scope.temporary_duplicate.id = datetime;
    $scope.temporary_duplicate.instances = [];
    
    
    accountData.addCampaign($scope.accountId, datetime, angular.copy($scope.temporary_duplicate))
    $scope.campaignList = accountData.getActiveCampaigns($scope.accountId);
    $scope.duplicating_mode = false;
    
    $scope.buildCampaign = angular.copy($scope.temporary_duplicate);
    $location.path( '/campaign/'+$scope.campaignList[datetime].id+'/edit' );
  };
  
  $scope.toggleEditMode = function() {
    $scope.edit_mode = !$scope.edit_mode;
    $scope.new_mode = false;
    $scope.selected_campaigns = [];
    
  };
  
  $scope.toggleNewMode = function() {
    $scope.new_mode = !$scope.new_mode;
  };
  
  $scope.deleteAnyListItems = function(checked_items, parent_object) { //deletes any item from an ng-repeat list
      var shortened_list = Object.reject(parent_object, checked_items);
      $scope.toggleEditMode();
      $scope.campaignList = shortened_list;
  };
  
  function Campaign(id, handle, title, local, location, discoverable) {
    
    this.id = id,
    this.handle = handle,
    this.title = title,
    this.description = 'This is the default description.',
    this.local = local,
    this.location = location,
    this.discoverable = discoverable,
    this.questionsList = [],
    this.reward =
      {
        title: '',
        description: '',
        terms: ''
      },
    this.permissions = 
      {
        accepted: [],
        pending: []
      }
  };
  
  $scope.createCampaign = function(new_campaign_title, handle, is_local, new_campaign_locale, discoverable) {
    var datetimeId = Date.now();
        
    var temp_builder = new Campaign(datetimeId, handle, new_campaign_title, is_local, new_campaign_locale, discoverable);
    tempObjects.updateBuildCampaign(temp_builder);
    
    console.log(accountData.getActiveCampaigns($scope.accountId))
    
    accountData.addCampaign($scope.accountId,temp_builder.id, temp_builder);
    console.log(accountData.getActiveCampaigns($scope.accountId))
    
//    $scope.campaignList = accountData.getActiveCampaigns($scope.accountId);
    
    console.log(accountData.getActiveCampaigns($scope.accountId));
    
    $location.path( '/campaign/'+datetimeId+'/edit' );
 
  };
  
};

function campaignCtr($scope, $stateParams, $location, accountData) {
  console.log("initialize campaign controller")
  
  init();
  
  $scope.$on("MESSAGE_RECEIVED", function(event, campaignIndex, message, messageId) {
    $scope.campaignList[campaignIndex].instances[messageId] = message;
    $scope.campaignList[campaignIndex].newCounter = $scope.campaignList[campaignIndex].newCounter + 1;
  });
  
  function init() {
    $scope.campaignId = $stateParams.campaignId;
    $scope.campaignTitle = $scope.campaignList[$stateParams.campaignId].title;
    $scope.accountId = $stateParams.accountId;
    
    var arrayOfCampaignIds = [];
    if ($stateParams.campaignId) {
      arrayOfCampaignIds = $stateParams.campaignId.split("+");
    }
    var mergedInstances = {};
    var mergedRewards = {};
    var mergedContacts = {};
    
    arrayOfCampaignIds.forEach( function(campaign_id) {
    
      if (campaign_id) {
         if (checkIfUrlCampaginsExist(arrayOfCampaignIds)) {
           setViewCampaign(arrayOfCampaignIds);
         }
         else {
           $location.path( '/account/'+$scope.accountId ); //redirect back to dashboard if campaign isn't found
         };
      };
    
    });
     
  };  
  
  $scope.campaignNav_true = false;
  $scope.toggleNavbar = function() {
    $scope.campaignNav_true = !$scope.campaignNav_true;
  };
  
  function checkIfUrlCampaginsExist(array_of_campaign_ids) {
    var outcome = true;
    var BreakException = {};
    try {
      array_of_campaign_ids.forEach(function(campaign_id) {
        outcome = Object.keys($scope.campaignList).any(campaign_id);
        if (!outcome) throw BreakException;
      });
    } catch(outcome) {
        if (outcome!==BreakException) throw outcome;
    };
    
    return outcome;
  };
  
  function setViewCampaign(array_of_campaign_ids) {
      
    mergedInstances = angular.copy($scope.campaignList[array_of_campaign_ids[0]].instances);
    mergedRewards = angular.copy($scope.campaignList[array_of_campaign_ids[0]].rewards);
  
    array_of_campaign_ids.forEach(function(campaign_id) {
      mergedInstances = Object.merge(mergedInstances, angular.copy($scope.campaignList[campaign_id].instances), true);
      mergedRewards = Object.merge(mergedRewards, angular.copy($scope.campaignList[campaign_id].rewards), true);
    });
  
    $scope.viewCampaign = $scope.campaignList[array_of_campaign_ids[0]]; //find campaign with id in the list of campaigns
    $scope.viewCampaign.instances = mergedInstances;
    
  };
  
  
  
  $scope.appPages = {
    "Your Fdbk History" : "history",
    "Your Rewards" : "rewards",
    "Personal Settings" : "settings"
  };
    
};

function campaignBuilderCtr($scope, $location, $stateParams, tempObjects, accountData) {
    
  init();
  
  if ($scope.buildCampaign == undefined) {
     $location.path( '/account/'+$scope.accountId ); //redirect back to dashboard if a new campaign has not been initiated
  };
  
  function init() {
    $scope.title = 'Dashboard';
    tempObjects.updateBuildCampaign($scope.campaignList[$stateParams.campaignId]);
    $scope.buildCampaign = tempObjects.getBuildCampaign();
    
    if ($scope.reward_type == undefined) {
      $scope.reward_type = "location";
    }
    
  };
  
  var selectedQType = '';
  
  $scope.buildQuestion = {
    id: 'asdf',
    type: 'freeText',
    text: "",
    answers: []
  };
  
  $scope.SelectQuestionType = function(clicked_type, question) {
    question.type = clicked_type;
    
    if (clicked_type == 'binary') {
      question.answers = [
        {
          id: new Date().getTime(),
          text: "true"
        },
        {
          id: new Date().getTime()+1,
          text: "false"
        }
      ];
    }
    else if (clicked_type == 'multipleChoice') {
      question.answers = [
        {
          id: 0,
          text: ""
        }
      ];
    }
    else {
      question.answers = [];
    }
  };
  
  $scope.sendInvite = function(first_input, last_input, email_input, level_input, contact_list) {
    contact_list.push({
      first: first_input,
      last: last_input,
      email: email_input,
      date_sent: getDate(),
      level: level_input
    });
  };
  
  $scope.addAnswer = function(input_text, answers) {
    answers.push({
      id: new Date().getTime(),
      text: input_text
    });
  };
  
  $scope.deleteQuestion = function(index) {
    $scope.buildCampaign.questionsList.splice(index, 1);  
  };
  
  $scope.deleteListItem = function(index, parent_object) {
    parent_object.splice(index, 1);  
  };
  
  $scope.editing_question = false;
  var buildQuestionIndex;
  
  $scope.togglePanel = function(panelName) {  //this function is also in here because of different scoped buildQuestions. I'm tired. bad note. we just need separate functions for the individual panels. :/
  
    $('aside').toggleClass('visible');  //why are we using jQuery here? come on!
    $scope.panel=panelName;
    
    $scope.buildQuestion = {
        id: "",
        type: "freeText",
        text: "",
        answers: []
    };
    
    $scope.editing_question = false;
  };
  
  $scope.editQuestion = function(index) {
    buildQuestionIndex = index;
    var original_question = angular.copy($scope.buildCampaign.questionsList[index]);
    
    $scope.togglePanel('Create Question');
    $scope.buildQuestion = angular.copy(original_question);
    $scope.editing_question = true;
  };
  
  $scope.addLocation = function(input_location, list_of_locations) {    
    list_of_locations.push({
      id: new Date().getTime(),
      text: angular.copy(input_location)
    });
    this.addLocation_address.text = "";
  };
  
  $scope.saveQuestion = function() {
    if ($scope.buildQuestion.type == 'rating') {
      $scope.buildQuestion.answers = [
        {
          id: 0,
          text: "poor"
        },
        {
          id: 2,
          text: "fair"
        },
        {
          id: 3,
          text: "good"
        },
        {
          id: 4,
          text: "great"
        },
      ];
    };
    
    if ($scope.editing_question == false) {
      $scope.buildCampaign.questionsList.push(angular.copy($scope.buildQuestion));
    }
    else {
      $scope.buildCampaign.questionsList[buildQuestionIndex] = angular.copy($scope.buildQuestion);
    }
    
    $scope.togglePanel();
    $scope.editing_question = false;
    $scope.buildQuestion = {
        id: "",
        type: "",
        text: "",
        answers: []
    };
  };
  
  $scope.saveChanges = function() {
    accountData.addCampaign($stateParams.campaignId, $scope.buildCampaign, $scope.accountId);
    $scope.resetStep();
    $location.path( '/account/'+$scope.accountId ); //redirect back to dashboard
    
  };
  
  $scope.activateCampaign = function(campaign_id) {
    accountData.addCampaign(campaign_id, $scope.buildCampaign);
    $scope.currentStep = 0;
  };
  
};

function rewardsCtr($scope, $stateParams, $location, userData) {
  console.log("initialize user rewards controller");
  init();
  
  function init() {
    $scope.rewardsList = userData.getRewardsList();
    
    if ($scope.rewardsList[$stateParams.rewardId] != null) { //first make sure the rewardId from route exists.
      $scope.viewReward = $scope.rewardsList[$stateParams.rewardId]; //find reward with id in the list of rewards and save to variable.
      $scope.title = $scope.viewReward.title;
    }
    else {
      $location.path( "/rewards" ); //redirect back to dashboard if campaign isn't found
    };
  };

  $scope.title = 'Rewards';
  

  $scope.claimReward = function (el) {
    el.claimed = new Date();
  }

};

function CampaignRewardsCtr($scope, $stateParams, $location, accountData) {
  console.log("initialize rewards controller");
  init();
  
  var fullRewardsData = {};
  var closedRewards = [];
  var openRewards = [];
  $scope.title = 'Rewards';
  
  function init() {
    
  };
  
  var arrayOfCampaignIds = $stateParams.campaignId.split("+");
    
  fullRewardsData = accountData.getRewardsList($scope.accountId, arrayOfCampaignIds);
  
  function splitRewardsList(reward) {    
    
    if (fullRewardsData[reward].date_claimed == false) {
      openRewards.push(fullRewardsData[reward]);
    }
    else {
      closedRewards.push(fullRewardsData[reward]);
    }
    
  };
  
  var rewardIds = Object.keys(fullRewardsData);
  
  rewardIds.forEach(splitRewardsList);
  
  
  $scope.campaignId = $stateParams.campaignId;
  
  $scope.rewardsList = [];

  $scope.rewardsList = openRewards;
  
  $scope.rewardsView = "open";

  $scope.toggleRewardsList = function() {
    if ($scope.rewardsView == "open") {
      $scope.rewardsList = [];
      $scope.rewardsList = closedRewards;
      $scope.rewardsView = "closed";
    }
    else {
      $scope.rewardsList = [];
      $scope.rewardsList = openRewards;
      $scope.rewardsView = "open";
    };
  };
  
  $scope.claimReward = function (el) {
    el.date_claimed = new Date();
        
  }

};

function CampaignRewardCtr($scope, $stateParams, $location, accountData) {

  var fullRewardsData = {};
  var arrayOfCampaignIds = $stateParams.campaignId.split("+");
  
  init();
  
  function init() {
    fullRewardsData = accountData.getRewardsList(arrayOfCampaignIds);
  };
  
  $scope.campaignId = $stateParams.campaignId;
  $scope.rewardId = $stateParams.rewardId;
  
  if (fullRewardsData[$stateParams.rewardId] != undefined) { //first make sure the rewardId from route exists.
    $scope.viewReward = fullRewardsData[$stateParams.rewardId]; //find reward with id in the list of rewards and save to variable.
    $scope.title = $scope.viewReward.title;
     
  }
  else {
    $location.path( "/campaign/"+$stateParams.campaignId+"/rewards" ); //redirect back to dashboard if campaign isn't found
  };

  $scope.claimReward = function (el) {
    el.date_claimed = new Date();
  }

};

function inboxCtr($scope, accountData) {
  $scope.title = 'All Incoming Feedback';
  init();
  
  function init() {

  }; 
    
};

function conversationsCtr($rootScope, $scope, $route, $stateParams, $location, accountData) {
  console.log("initialize conversation controller");
  
  var lastRoute = $route.current;

  $scope.title = "Conversations";
  $scope.conversationDetailView = false;
  var arrayOfCampaignIds = $stateParams.campaignId.split("+");
  
  $scope.toggleToolPanel = function(conversation_object) {

    if (conversation_object) {
      $scope.conversationDetailView = true;
      $scope.viewConversation = conversation_object.collaboration;
      $location.path("/account/"+$scope.accountId+"/campaign/"+$scope.campaignId+"/conversations/"+conversation_object.id);
    }
    else {
      $scope.conversationDetailView = false;
      $location.path("/account/"+$scope.accountId+"/campaign/"+$stateParams.campaignId+"/conversations/");
    }
  };
  
  
  
//  if ($stateParams.instanceId != "") {
//    var instanceId_as_text = $stateParams.instanceId.split("/");
//    var message_exists = false;
//    var message_found = false;
//    instanceId = instanceId_as_text[1];
//    try {
//      arrayOfCampaignIds.forEach(function(campaign_id) {
//
//        if ( $scope.campaignList[campaign_id].instances[instanceId]) {  //check if instanceId exists in the campaign
//          throw campaign_id
//        }
//        
//      });
//      $location.path( "/campaign/"+$scope.campaignId+"/conversations" ); //redirect back to campaign instances if message isn't found
//    }
//    catch (campaign_id) {
//      $scope.toggleToolPanel($scope.campaignList[campaign_id].instances[instanceId]) //message found
//    }
//    
//  }
//  else {
//    $location.path( "/campaign/"+$scope.campaignId+"/conversations" ); //redirect back to campaign instances if message isn't found
//  }
};

function collabToolsCtr($scope, $stateParams) {
  console.log("initialize tools controller");
  
  $scope.conversationId = $stateParams.conversationId;
  
  $scope.addTopicTag = function(submitted_tag, conversationAttributes) {
    conversationAttributes.tags.push(submitted_tag);
    $scope.topic_tag.$setPristine();
    $scope.tag_to_submit = "";
  };
  
  $scope.addUserTag = function(submitted_user, conversationAttributes) {
      conversationAttributes.tagged_users.push(submitted_user);
      $scope.user_tag.$setPristine();
      $scope.user_to_submit = "";  
    };
  
  $scope.removeTag = function(tag_to_remove, conversation) {
    var tag_index = conversation.indexOf(tag_to_remove);
    conversation = conversation.splice(tag_index, 1);
  };
  
  $scope.addComment = function(post, comments) {
    comments.push({
      commentId: 1,
      author: "You",
      time: getDate(),
      text: post,
      heard: false
    });
    
    $scope.comment_text = "";
    $scope.comment_form.$setPristine();
  };

};

function instanceCtr($scope) {

  $scope.full_form_view_on = false;

  $scope.toggleFullFormView = function() {
    $scope.full_form_view_on = !$scope.full_form_view_on;
  };
  
  if ($scope.instance.comments.length >= 3) {
    $scope.isExpandable = true;
  }
  else {
    $scope.isExpandable = false
  };
  
  $scope.hearIt = function(el) {
    el.heard = "true";
  };
  
  $scope.expandReplies = function(convo) {
    if ( convo.cap == -2) {
      convo.cap = 8;
    }
    else {
      convo.cap = -2;
    }
  };
  
  $scope.addReply = function(post, comments) {
    comments.push({
      commentId: 1,
      author: "You",
      time: getDate(),
      text: post,
      heard: false
    });
    this.newCommentText = '';
    
    if ($scope.instance.comments.length >= 3) {
      $scope.isExpandable = true;
    }
    else {
      $scope.isExpandable = false;
    };
    
  };
    
};

function analyticsCtr($scope, $stateParams) {
  
  $scope.title = "Analytics";
  $scope.campaignId = $stateParams.campaignId;

};

function campaignContactsCtr($scope, $stateParams, $location, accountData, allUserData) {
  console.log("initialize contacts controller");
  $scope.title = "Contact Details";
  $scope.campaignId = $stateParams.campaignId;
  $scope.userId = $stateParams.userId;
  
  $scope.convoList = [];
  
  var arrayOfCampaignIds = $stateParams.campaignId.split("+");
  
  
  var contactIdList = accountData.getContactList($scope.accountId, arrayOfCampaignIds);
  contactIdList = contactIdList.unique();
  $scope.contactList = [];
  
  Object.values(contactIdList, function(userId) {
    $scope.contactList.push(allUserData.getUser(userId));
  });
  
//  //*********For user details view *********
//  if ($stateParams.userId != undefined) { //first make sure the userId from route exists.
//    
//    $scope.viewUser = allUserData.getUser($stateParams.userId); //find user with id 
//    
//      arrayOfCampaignIds.forEach(function(campaign_id) {
//        
//        Object.values($scope.viewUser.conversations[campaign_id], function(messageId) {
//        
//        $scope.convoList.push(accountData.getActiveCampaign(campaign_id).instances[messageId])
//        console.log(campaign_id)
//      });
//    });
//    
//    $scope.title = $scope.viewUser.name;
//  }
//  else  {
//    $location.path( "/campaign/"+$scope.campaignId+"/contacts" ); //redirect back to dashboard if campaign isn't found
//  };
  
};