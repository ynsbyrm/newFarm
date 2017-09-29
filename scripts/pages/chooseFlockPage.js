/* 
		You can modify its contents.
*/
const extend                = require('js-base/core/extend');
const ChooseFlockPageDesign = require('ui/ui_chooseFlockPage');
const ListViewItem          = require('sf-core/ui/listviewitem');
const Image                 = require('sf-core/ui/image');
const Router                = require('sf-core/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const Label                 = require('sf-core/ui/label');
const FlexLayout            = require('sf-core/ui/flexlayout');
const Color                 = require('sf-core/ui/color');
const ImageView             = require('sf-core/ui/imageview');

// Define Database(DB) from locale.
var database = new Database({
  file: new File({path: Path.DataDirectory + "//livestock.sqlite"})
});

const ChooseFlockPage = extend(ChooseFlockPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

// Create ListView and define all events.
function createListView(listView, houses){
  listView.itemCount = houses.length;
  // Define onRowCreate event
  listView.onRowCreate = function(){
    var listViewItem = new ListViewItem();
    var lvFLayoutRow = new FlexLayout({
      id: 100,
      width: null,
      height: 122,
      marginLeft: 10,
      marginRight: 10
    });
    listViewItem.addChild(lvFLayoutRow);
    
    var rowFlex = new FlexLayout({
      id: 101,
      width: null,
      height: 120,
      flexDirection: FlexLayout.FlexDirection.ROW,
      flexWrap: FlexLayout.FlexWrap.WRAP
    });
    lvFLayoutRow.addChild(rowFlex);
    
    var imageLayout = new FlexLayout({
      id: 103,
      height: null,
      width: null,
      flexGrow: 2
    });
    rowFlex.addChild(imageLayout);
    
    var myImage = Image.createFromFile("images://smartface.png");
    var imageView = new ImageView({
      id: 104,
      image: myImage,
      width: null,
      height: null,
      flexGrow: 1
    });
    imageLayout.addChild(imageView);
    
    var rowLayout = new FlexLayout({
      id: 102,
      height: null,
      width: null,
      marginLeft: 10,
      marginRight: 10,
      flexGrow: 5
    });
    rowFlex.addChild(rowLayout);
    
    var farmnameLabel = new Label({
      id: 106,
      width: null,
      height: null,
      flexGrow: 1,
      visible: true,
      text: "Farmname"
    });
    rowLayout.addChild(farmnameLabel);
    
    var farmcodeLabel = new Label({
      id: 107,
      width: null,
      height: null,
      flexGrow: 1,
      visible: true,
      text: "Farmcode"
    });
    rowLayout.addChild(farmcodeLabel);
    
    var lastChangedLabel = new Label({
      id: 108,
      width: null,
      height: null,
      flexGrow: 1,
      visible: true,
      text: "Last Changed Date"
    });
    rowLayout.addChild(lastChangedLabel);
    
    var lineLayout = new FlexLayout({
      id: 109,
      height: 0.2,
      width: null,
      borderColor: Color.create(255, 105, 105, 105),
      borderWidth: 0.4,
      marginLeft: 10,
      marginRight: 10
    });
    lvFLayoutRow.addChild(lineLayout);
    
    return listViewItem;
  };
  
  // Define onRowBind event
  listView.onRowBind = function(listViewItem, index){
    // Get Farmname, farmcode, lastChanged date labels 
    var firstFlex = listViewItem.findChildById(100);
    var secondFlex = firstFlex.findChildById(101);
    var imageFlex = secondFlex.findChildById(103);
    var imageArea = imageFlex.findChildById(104);
    var rowFlex = secondFlex.findChildById(102);
    var farmName = rowFlex.findChildById(106);
    var farmCode = rowFlex.findChildById(107);
    var dateLabel = rowFlex.findChildById(108);
    
    farmName.text = houses[index].name;
    farmCode.text = houses[index].code;
    dateLabel.text= houses[index].date;
    
    var deger = index +1;
    var last = 0;
    if(deger > 4)
      last = deger % 4;
    else
      last = deger;
    var image = Image.createFromFile("images://customers_" + last + ".png");
    imageArea.image = image;
    
  };
  
  listView.onRowSelected = function(listViewItem, index){
    Router.go("flockDataPage");
  };
  
  listView.onPullRefresh = function() {
    listView.itemCount = houses.length;
    listView.refreshData();
    listView.stopRefresh();
  };
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  // Get ListView to "listView" for define dataset and make some changes.
  var listView = this.children.lvFlocks;
  // Define dataset from DB.
  var houses = [{}];
  // Get Query result  
  var result = database.query("SELECT * FROM 'F40601'");
  // Use 'for' loop for get every row values.
  for(var i=0; i < result.count(); i++)
  {
    var farmcode = result.get(i).getInteger('FARMCODE');
    var farmname = result.get(i).getString('FARMNAME');
    var lastDate = result.get(i).getString('DATE');
    var menuItem1 = ({name: farmname, code: farmcode, date: lastDate});
    houses[i] = menuItem1;
  }
  createListView(listView,houses);
 
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = ChooseFlockPage);