/* 
		You can modify its contents.
*/
/*globals Application*/
const extend          = require('js-base/core/extend');
const LoginPageDesign = require('ui/ui_loginPage');
const Color           = require('sf-core/ui/color');
const Router          = require('sf-core/router');
const Database        = require('sf-core/data').Database;
const Path            = require('sf-core/io/path');
const File            = require('sf-core/io/file');

var page;

const LoginPage = extend(LoginPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    page = this;
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    page.children.userName.children.userNameInput.hint = "Username";
    page.children.password.children.passwordInput.hint = "Password";
    page.children.loginPageHeader.children.headerText.onTouch = imageonTouch.bind(page);
    page.children.loginButton.onPress = login.bind(page);
    
    page.android.onBackButtonPressed = function(e) {
      Application.exit();
    };
    
  });

function imageonTouch(){
  page.children.userName.children.userNameInput.text = "Appsakademi";
  page.children.password.children.passwordInput.text = "1medaka@34";
}

var database = new Database({
  file: new File({path: Path.DataDirectory + "//livestock.sqlite"})
});

function login(){
  var userNameLine = page.children.userName.children.userNameLine;
  var passwordLine = page.children.password.children.passwordLine;
  var userText = page.children.userName.children.userNameInput.text;
  var passText = page.children.password.children.passwordInput.text;
  if(userText != null && userText === "Appsakademi")
  {
    userNameLine.borderColor = Color.GREEN;
    if(passText != null && passText === "1medaka@34")
    {
      passwordLine.borderColor = Color.GREEN;
      //database.execute("CREATE TABLE 'F40601'('FARMCODE' INTEGER NOT NULL, 'FARMNAME' TEXT, 'DATE' TEXT, PRIMARY KEY ('FARMCODE') ) ");
      //database.execute("INSERT INTO 'F40601' ('FARMCODE', 'FARMNAME', 'DATE') VALUES (1001, 'Istanbul', '12.04.2017' )");
      //database.execute("INSERT INTO 'F40601' ('FARMCODE', 'FARMNAME', 'DATE') VALUES (1002, 'Samsun', '12.06.2017' )");
      Router.go("selectHousePage");
    }
    else 
      passwordLine.borderColor = Color.RED;
  }
  else
    userNameLine.borderColor = Color.RED;
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  // Define inMemoryDB's columns
  //database.execute("CREATE TABLE 'TEMP'('COMINGID' INTEGER NOT NULL, PRIMARY KEY ('COMINGID') ) ");
  superOnLoad();
}

module && (module.exports = LoginPage);