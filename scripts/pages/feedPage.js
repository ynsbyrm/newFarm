/* 
		You can modify its contents.
*/
const extend                = require('js-base/core/extend');
const FeedPageDesign        = require('ui/ui_feedPage');
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Router                = require('sf-core/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const Label                 = require('sf-core/ui/label');
const FlexLayout            = require('sf-core/ui/flexlayout');
const Color                 = require('sf-core/ui/color');
const Menu                  = require('sf-core/ui/menu');
const MenuItem              = require('sf-core/ui/menuitem');
const DatePicker            = require('sf-core/ui/datepicker');
const TimePicker            = require('sf-core/ui/timepicker');

var page;

const FeedPage = extend(FeedPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    page = this;
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    page.children.flFields.children.flItem.onTouch = itemOnTouch.bind(page);
    page.children.flFields.children.flUnits.children.flMeasure.onTouch = measureOnTouch.bind(page);
    page.children.flFields.children.flDateTime.children.flDate.onTouch = dateOnTouch.bind(page);
    page.children.flFields.children.flDateTime.children.flTime.onTouch = timeOnTouch.bind(page);
    page.children.flFields.children.flUnits.children.tbQuantity.hint   = "ENTER QUANTITY";
    page.children.flButton.children.saveButton.onPress                 = saveButtonOnPress.bind(page);
    
  });

function itemOnTouch() {
  
}

function measureOnTouch(){
  
}

function dateOnTouch(){
  
}

function timeOnTouch(){
  
}

function saveButtonOnPress(){
  
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
  superOnLoad();
}

module && (module.exports = FeedPage);