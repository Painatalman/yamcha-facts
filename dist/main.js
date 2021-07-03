/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/JSONFileQuoteDAO.ts":
/*!*****************************************!*\
  !*** ./src/scripts/JSONFileQuoteDAO.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getRandomInt_1 = __importDefault(__webpack_require__(/*! ./utils/getRandomInt */ \"./src/scripts/utils/getRandomInt.ts\"));\nconst getFirstIntNotIn_1 = __importDefault(__webpack_require__(/*! ./utils/getFirstIntNotIn */ \"./src/scripts/utils/getFirstIntNotIn.ts\"));\nconst validateQuoteDataCollection_1 = __importDefault(__webpack_require__(/*! ./validators/validateQuoteDataCollection */ \"./src/scripts/validators/validateQuoteDataCollection.ts\"));\n// a provider that has its own data stored locally, doesn't do API calls\nclass JSONFileQuoteDAO {\n    constructor({ quotes, extras }) {\n        this._quoteDataList = this._initQuoteData(quotes);\n        this._extras = extras;\n        validateQuoteDataCollection_1.default({\n            quotes: this._quoteDataList,\n            extras: this._extras\n        });\n    }\n    _initQuoteData(quotes) {\n        let quoteDataNoCustomIDs = quotes.map(function parseQuoteData(data) {\n            // checks if an unique id must be set for the quote\n            if (typeof data === 'string') {\n                return {\n                    text: data,\n                    id: undefined,\n                    isNerdy: false\n                };\n            }\n            const { text, id, isNerdy = false } = data;\n            return {\n                text,\n                id,\n                isNerdy\n            };\n        });\n        return this._getQuoteDataWithIDs(quoteDataNoCustomIDs);\n    }\n    _getQuoteDataWithIDs(quoteDataNoCustomIDs) {\n        const quoteIDs = quoteDataNoCustomIDs.reduce((quoteDataList, quoteData) => {\n            if (typeof quoteData.id !== 'undefined') {\n                quoteDataList.push(quoteData.id);\n            }\n            return quoteDataList;\n        }, []);\n        return quoteDataNoCustomIDs.map((quoteData) => {\n            if (typeof quoteData.id === 'string') {\n                return Object.assign(Object.assign({}, quoteData), { id: quoteData.id });\n            }\n            const id = '' + getFirstIntNotIn_1.default(quoteIDs.map((item) => parseInt(item)));\n            quoteIDs.push(id);\n            return Object.assign(Object.assign({}, quoteData), { id });\n        });\n    }\n    _getRandomFilteredQuoteData(list) {\n        const quote = this._getRandomItemFromList(list);\n        if (!quote) {\n            return Promise.reject(new Error('No quotes available'));\n        }\n        return Promise.resolve(quote);\n    }\n    _getRandomExtra(type) {\n        if (!this._extras[type]) {\n            throw new Error('there are no extras of type' + type);\n        }\n        const extraIndex = getRandomInt_1.default(this._extras[type].length);\n        return this._extras[type][extraIndex];\n    }\n    _getRandomItemFromList(quoteDataList) {\n        const quoteLength = quoteDataList.length;\n        let quote;\n        if (quoteLength === 0) {\n            return null;\n        }\n        quote = quoteDataList[quoteLength === 1 ? 0 : getRandomInt_1.default(quoteLength)];\n        return this._getQuoteDataWithExtras(quote);\n    }\n    _getQuoteDataWithExtras(quoteData) {\n        const text = quoteData.text.replace(/(^|\\s+)\\$([a-z]+)/g, (_wholeMatch, spaceOrStart, extraName) => {\n            return `${spaceOrStart}${this._getRandomExtra(extraName)}`;\n        });\n        return Object.assign(Object.assign({}, quoteData), { text });\n    }\n    fetchQuoteData(id) {\n        const quote = this._quoteDataList.find((quoteData) => quoteData.id == id);\n        if (!quote) {\n            return Promise.reject(new Error(`No quote matching id ${id}`));\n        }\n        return Promise.resolve(this._getQuoteDataWithExtras(quote));\n    }\n    fetchRandomQuoteData(excludedId) {\n        const list = this._quoteDataList.filter((quoteData) => quoteData.id !== excludedId);\n        return this._getRandomFilteredQuoteData(list);\n    }\n    fetchRandomNonNerdyQuoteData(excludedId) {\n        const list = this._quoteDataList.filter(({ id, isNerdy }) => {\n            return id !== excludedId && isNerdy === false;\n        });\n        const quote = this._getRandomItemFromList(list);\n        if (!quote) {\n            return Promise.reject(new Error(\"No non-nerdy quotes. They're either all nerdy, or there's no quotes at all\"));\n        }\n        return Promise.resolve(quote);\n    }\n}\nexports.default = JSONFileQuoteDAO;\n\n\n//# sourceURL=webpack:///./src/scripts/JSONFileQuoteDAO.ts?");

/***/ }),

/***/ "./src/scripts/QuoteController.ts":
/*!****************************************!*\
  !*** ./src/scripts/QuoteController.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass QuoteController {\n    constructor({ dao, factory, renderer, settings, soundPlayer }) {\n        const defaultSettings = {\n            nonNerdyOnly: false,\n            playSound: false\n        };\n        this._dao = dao;\n        this._factory = factory;\n        this._renderer = renderer;\n        this._lastQuoteId = undefined;\n        this._soundPlayer = soundPlayer;\n        this._settings = Object.assign(Object.assign({}, defaultSettings), (settings || {}));\n    }\n    _createQuoteAndSetLastId(quoteData) {\n        const quote = this._factory.createQuote(quoteData);\n        this._lastQuoteId = quote.getId();\n        return quote;\n    }\n    _getRandomQuote() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const quoteData = yield this._dao.fetchRandomQuoteData(this._lastQuoteId);\n            return this._createQuoteAndSetLastId(quoteData);\n        });\n    }\n    _getRandomNonNerdyQuote() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const quoteData = yield this._dao.fetchRandomNonNerdyQuoteData(this._lastQuoteId);\n            return this._createQuoteAndSetLastId(quoteData);\n        });\n    }\n    _renderQuote(quote) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this._renderer.render(quote);\n        });\n    }\n    _playSoundIfApplicable() {\n        const { _soundPlayer, _settings } = this;\n        if (_soundPlayer && _settings.playSound) {\n            _soundPlayer.play();\n        }\n    }\n    update() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const nonNerdyOnly = this._settings.nonNerdyOnly;\n            const quote = nonNerdyOnly ?\n                yield this._getRandomNonNerdyQuote()\n                : yield this._getRandomQuote();\n            this._playSoundIfApplicable();\n            yield this._renderQuote(quote);\n            return quote;\n        });\n    }\n    toggleNonNerdyOnly(nonNerdyOnly) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (nonNerdyOnly === this._settings.nonNerdyOnly) {\n                return Promise.resolve();\n            }\n            this._settings.nonNerdyOnly = nonNerdyOnly;\n            return yield this.update();\n        });\n    }\n    toggleSound(shouldPlay) {\n        this._settings.playSound = shouldPlay;\n    }\n}\nexports.default = QuoteController;\n\n\n//# sourceURL=webpack:///./src/scripts/QuoteController.ts?");

/***/ }),

/***/ "./src/scripts/QuoteDTO.ts":
/*!*********************************!*\
  !*** ./src/scripts/QuoteDTO.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass QuoteDTO {\n    constructor({ text, id }) {\n        this._text = text;\n        this._id = id;\n    }\n    getContent() {\n        return this._text;\n    }\n    getId() {\n        return this._id;\n    }\n    equals(quote) {\n        return quote.getId() === this._id;\n    }\n}\nexports.default = QuoteDTO;\n\n\n//# sourceURL=webpack:///./src/scripts/QuoteDTO.ts?");

/***/ }),

/***/ "./src/scripts/QuoteFactory.ts":
/*!*************************************!*\
  !*** ./src/scripts/QuoteFactory.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst QuoteDTO_1 = __importDefault(__webpack_require__(/*! ./QuoteDTO */ \"./src/scripts/QuoteDTO.ts\"));\n/**\n * Parses data into a properly formatted quote\n */\nclass QuoteFactory {\n    createQuote(data) {\n        return new QuoteDTO_1.default(data);\n    }\n}\nexports.default = QuoteFactory;\n\n\n//# sourceURL=webpack:///./src/scripts/QuoteFactory.ts?");

/***/ }),

/***/ "./src/scripts/TeleportSoundPlayer.ts":
/*!********************************************!*\
  !*** ./src/scripts/TeleportSoundPlayer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass TeleportSoundPlayer {\n    play() {\n        const { sound } = TeleportSoundPlayer;\n        // might not be loaded yet\n        sound.play && sound.play();\n    }\n}\nTeleportSoundPlayer.sound = new Audio('https://www.myinstants.com/media/sounds/dbz-teleport.mp3');\nexports.default = TeleportSoundPlayer;\n\n\n//# sourceURL=webpack:///./src/scripts/TeleportSoundPlayer.ts?");

/***/ }),

/***/ "./src/scripts/app.ts":
/*!****************************!*\
  !*** ./src/scripts/app.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data_json_1 = __importDefault(__webpack_require__(/*! ./data/data.json */ \"./src/scripts/data/data.json\"));\nconst JSONFileQuoteDAO_1 = __importDefault(__webpack_require__(/*! ./JSONFileQuoteDAO */ \"./src/scripts/JSONFileQuoteDAO.ts\"));\nconst QuoteController_1 = __importDefault(__webpack_require__(/*! ./QuoteController */ \"./src/scripts/QuoteController.ts\"));\nconst QuoteFactory_1 = __importDefault(__webpack_require__(/*! ./QuoteFactory */ \"./src/scripts/QuoteFactory.ts\"));\nconst TeleportSoundPlayer_1 = __importDefault(__webpack_require__(/*! ./TeleportSoundPlayer */ \"./src/scripts/TeleportSoundPlayer.ts\"));\nconst validateAnchor_1 = __importDefault(__webpack_require__(/*! ./validators/validateAnchor */ \"./src/scripts/validators/validateAnchor.ts\"));\nconst validateCheckbox_1 = __importDefault(__webpack_require__(/*! ./validators/validateCheckbox */ \"./src/scripts/validators/validateCheckbox.ts\"));\nconst validateElement_1 = __importDefault(__webpack_require__(/*! ./validators/validateElement */ \"./src/scripts/validators/validateElement.ts\"));\nconst yamchaQuoteRenderer_1 = __importDefault(__webpack_require__(/*! ./yamchaQuoteRenderer */ \"./src/scripts/yamchaQuoteRenderer.ts\"));\nconst SELECTORS = {\n    QUOTE_EL_ID: 'quote',\n    QUOTE_CHANGE_TRIGGER_ID: 'quotebutton',\n    TWITTER_SHARE_ID: 'twitteranchor',\n    NON_NERDY_CONTROL_ID: 'nonNerdyOnlyControl',\n    SOUND_CONTROL_ID: 'soundControl'\n};\nconst quoteEl = validateElement_1.default(document.getElementById(SELECTORS.QUOTE_EL_ID));\nconst quoteChanger = validateElement_1.default(document.getElementById(SELECTORS.QUOTE_CHANGE_TRIGGER_ID));\nconst twitterShare = validateAnchor_1.default(document.getElementById(SELECTORS.TWITTER_SHARE_ID));\nconst nonNerdyOnlyControl = validateCheckbox_1.default(document.getElementById(SELECTORS.NON_NERDY_CONTROL_ID));\nconst soundControl = validateCheckbox_1.default(document.getElementById(SELECTORS.SOUND_CONTROL_ID));\nconst quoteController = new QuoteController_1.default({\n    dao: new JSONFileQuoteDAO_1.default(data_json_1.default),\n    factory: new QuoteFactory_1.default(),\n    renderer: new yamchaQuoteRenderer_1.default(quoteEl),\n    soundPlayer: new TeleportSoundPlayer_1.default()\n});\nconst updateTwitterLink = (quote) => {\n    const text = quote.getContent();\n    twitterShare.href = `https:// twitter.com/intent/tweet?via=Mi_PiCo&hashtags=yamcha-facts&url=https://painatalman.github.io/yamcha-facts&text=${text}`;\n};\n/**\n * Gets a random quote and updates the block for quotes\n *\n * @returns {void}\n */\nconst changeQuote = () => {\n    quoteController.update().then(updateTwitterLink);\n};\nconst toggleNonNerdy = () => {\n    const nonNerdyOnly = !nonNerdyOnlyControl.checked;\n    quoteController\n        .toggleNonNerdyOnly(nonNerdyOnly)\n        .then((quoteOrNothing) => quoteOrNothing && updateTwitterLink(quoteOrNothing));\n};\nconst toggleSound = () => {\n    const shouldPlaySound = soundControl.checked;\n    quoteController.toggleSound(shouldPlaySound);\n};\nquoteChanger.addEventListener('click', changeQuote);\nnonNerdyOnlyControl.addEventListener('change', toggleNonNerdy);\nsoundControl.addEventListener('change', toggleSound);\n// set initial quote\nchangeQuote();\n\n\n//# sourceURL=webpack:///./src/scripts/app.ts?");

/***/ }),

/***/ "./src/scripts/data/data.json":
/*!************************************!*\
  !*** ./src/scripts/data/data.json ***!
  \************************************/
/*! exports provided: quotes, extras, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"quotes\\\":[{\\\"text\\\":\\\"7.7/10: too much Yamcha!\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"A man once said: 'If you ain't first, you're Yamcha!'\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"A wild $pokemon appeared! Yamcha fled!\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Abra used Teleport! Yamcha fainted!\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Actually, Yamcha knows Instant Transmission. He can send his life to nowhere in an instant\\\",\\\"isNerdy\\\":true},\\\"All men are created equal... except Yamcha, he sucks!\\\",\\\"An old lady helped Yamcha cross the street\\\",\\\"Any person who finishes last still gets ahead of Yamcha\\\",\\\"By singing, Yamcha can be shattered by glass\\\",\\\"Cutting Yamcha makes onions cry\\\",{\\\"text\\\":\\\"Dark Souls's prototype was originally named Yamcha's Life, but no one could get past the title screen in that version\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Even Krillin thinks Yamcha stinks\\\",\\\"isNerdy\\\":true},\\\"Fighters train with punching bags the same way punching bags train with Yamcha\\\",{\\\"text\\\":\\\"George Lucas followed Yamcha's advice. Thus the prequels were made\\\",\\\"isNerdy\\\":true},\\\"For some reason, there's a locker named Yamcha. It never locks\\\",\\\"If Yamcha collects all dragon balls, he can make 0 wishes\\\",\\\"If Yamcha gets robbed, he has to go to jail\\\",\\\"If you commit a foul against Yamcha, your team can score a penalty\\\",{\\\"text\\\":\\\"In fighting games, 'training mode' is commonly known as 'Yamcha hitting'\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"In My Hero Academia, Yamcha's quirk is 'None for You'\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"In Ultra Instinct, Yamcha can defeat TWO Saibamen\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Jobbers usually perform their finishing move on Yamcha. Six times\\\",\\\"isNerdy\\\":true},\\\"Lightning never strikes twice... unless Yamcha's the target\\\",{\\\"text\\\":\\\"Look, I can see Yamcha's parachute! He's not ok.\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Mr. Satan rejected a fusion with Yamcha, because anyone who fuses with Yamcha becomes weaker\\\",\\\"isNerdy\\\":true},\\\"Murphy's Law was originally named after Yamcha\\\",\\\"Negative numbers go from 0 to Yamcha\\\",\\\"On a clown's birthday, Yamcha is hired to be made fun of\\\",{\\\"text\\\":\\\"$pokemon is confused! Yamcha hurt himself in its confusion!\\\",\\\"isNerdy\\\":true},\\\"Rabbits can pull Yamcha out of their hats\\\",\\\"Someone shared a picture of Yamcha on $socialnetwork. Yamcha's account was deleted\\\",\\\"Yamcha tried to capture a Pokémon, once. He caught himself\\\",\\\"Tomorrow never dies... unless it's Yamcha!\\\",\\\"Trash has to take out Yamcha once a week\\\",{\\\"text\\\":\\\"VOLTORB used SELFDESTRUCT! Only YAMCHA fainted!\\\",\\\"isNerdy\\\":true},\\\"When a ghost dies, it becomes Yamcha\\\",\\\"When kids misbehave in school, they have to sit in a corner and look at Yamcha\\\",{\\\"text\\\":\\\"When Yamcha died, HELL was renamed Home For Infinite Losers (HFIL for short)\\\",\\\"isNerdy\\\":true},\\\"When Yamcha goes for a swim, he gets burned\\\",\\\"Whenever Yamcha buys Kinder Surprise, it comes with no toy\\\",\\\"While you were reading this, Yamcha died (right after the first 'w')\\\",{\\\"text\\\":\\\"Yamcha installed Chrome to download Internet Explorer\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha bought WinRAR\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha can be hit by a stormtrooper... any stormtrooper\\\",\\\"isNerdy\\\":true},\\\"Yamcha can be opened by a jar of pickles\\\",\\\"Yamcha can be stepped on by a LEGO piece\\\",\\\"Yamcha can count to zero. Twice\\\",{\\\"text\\\":\\\"Yamcha can die from \\\\\\\"just a flesh wound\\\\\\\"\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha can die instantly from having part of his name written on Death Note\\\",\\\"isNerdy\\\":true},\\\"Yamcha can drown in a plain\\\",\\\"Yamcha can get a flat tire on a boat\\\",\\\"Yamcha can get dehydrated from drinking water\\\",\\\"Yamcha can get food poisoning without eating\\\",{\\\"text\\\":\\\"Yamcha can get viruses on a Mac\\\",\\\"isNerdy\\\":true},\\\"Yamcha can lose a game by playing rock against scissors\\\",{\\\"text\\\":\\\"Yamcha can only use iPhones: Androids can kill him easily\\\",\\\"isNerdy\\\":true},\\\"Yamcha can own a mansion and remain homeless\\\",{\\\"text\\\":\\\"Yamcha can take damage from a Magikarp's Splash attack\\\",\\\"isNerdy\\\":true},\\\"Yamcha can win the lottery and still owe money for the ticket\\\",{\\\"text\\\":\\\"Yamcha can't believe in the heart of the cards\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha couldn't get a role in The Room due to his bad acting\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha day is friday the 13th\\\",\\\"isNerdy\\\":true},\\\"Yamcha has died more often than anyone's internet connection\\\",\\\"Yamcha failed his driver's test (to ride a shopping cart)\\\",\\\"Yamcha finished a time trial once. His time was infinity\\\",{\\\"text\\\":\\\"Yamcha found the gravity chamber too hard to train in, even though it was turned off\\\",\\\"isNerdy\\\":true},\\\"Yamcha gets drunk with just one beer (alcohol-free included)\\\",\\\"Yamcha gets speeding tickets for dying so fast\\\",\\\"Yamcha gets sunburned at night\\\",\\\"Yamcha got a speeding ticket for standing still\\\",\\\"Yamcha got fired for being unemployed\\\",{\\\"text\\\":\\\"If Yamcha were a Pokémon, he'd be weak against all types (including Normal)\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha is allergic to Senzu beans\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha loses to anyone in ONE PUNCH, man!\\\",\\\"isNerdy\\\":true},\\\"Yamcha lost a game of connect-1, even though he played first\\\",\\\"Yamcha needs a GPS system to get from his house to the bathroom\\\",\\\"Yamcha ordered Coca-Cola Zero. He got regular Coke with his face on it\\\",\\\"Yamcha retired at the age of 5\\\",{\\\"text\\\":\\\"Yamcha saw The Ring. He couldn't even last a day, let alone a week...\\\",\\\"isNerdy\\\":true},\\\"Yamcha stopped walking at the age of 1... month\\\",\\\"Yamcha thinks wrestling is real\\\",\\\"Yamcha tried to use his name as a password on $socialnetwork: it was too weak\\\",\\\"Yamcha was found guilty of his own murder\\\",\\\"Yamcha was the only candidate for presidency. He lost\\\",\\\"Yamcha watches tutorials on how to breathe... but he never managed to complete any of them\\\",{\\\"text\\\":\\\"Yamcha will eventually join Smash Bros., but only after Waluigi joins the battle!\\\",\\\"isNerdy\\\":true},\\\"Yamcha wears clown shoes to (try to) be taken seriously\\\",\\\"Yamcha's biography is also a drama, and not a good one!\\\",\\\"Yamcha's birthday is february 31st\\\",\\\"Yamcha's clothing size is L (for loser)\\\",{\\\"text\\\":\\\" Yamcha's favourite car is the Fiat Multipla (actually, it was his idea!)\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha's favourite software is Windows Vista\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha's favourite Star Wars character is Jar Jar Binks\\\",\\\"isNerdy\\\":true},{\\\"text\\\":\\\"Yamcha's Master balls always fail\\\",\\\"isNerdy\\\":true},\\\"Yamcha's name means loser... in any language\\\",{\\\"text\\\":\\\"Yamcha's power level is below NEGATIVE NINE THOUSAAAAAAAAND!\\\",\\\"isNerdy\\\":true},\\\"Yamcha's the first youtuber to ever reach 1.0000.000 un-subscribers (his subscriber count still 0)\\\",{\\\"text\\\":\\\"Yamcha's version of Ultra Instinct makes him get hit by every punch without thinking about it\\\",\\\"isNerdy\\\":true},\\\"You can't tell Yamcha to 'have a blast'. He'd take it too literally\\\",{\\\"text\\\":\\\"\\\\\\\"You're already dead?!\\\\\\\", said Kenshiro before he could strike Yamcha\\\",\\\"isNerdy\\\":true}],\\\"extras\\\":{\\\"pokemon\\\":[\\\"ENTEI\\\",\\\"MAGIKARP\\\",\\\"PIKACHU\\\",\\\"RAIKOU\\\",\\\"SUICUNE\\\"],\\\"socialnetwork\\\":[\\\"Facebook\\\",\\\"Instagram\\\",\\\"MySpace\\\",\\\"Pinterest\\\",\\\"Twitter\\\"]}}\");\n\n//# sourceURL=webpack:///./src/scripts/data/data.json?");

/***/ }),

/***/ "./src/scripts/utils/copyWithoutDuplicates.ts":
/*!****************************************************!*\
  !*** ./src/scripts/utils/copyWithoutDuplicates.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = (someArray) => [...new Set(someArray)];\n\n\n//# sourceURL=webpack:///./src/scripts/utils/copyWithoutDuplicates.ts?");

/***/ }),

/***/ "./src/scripts/utils/getExtrasFromQuoteText.ts":
/*!*****************************************************!*\
  !*** ./src/scripts/utils/getExtrasFromQuoteText.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = (quoteText) => {\n    const re = /(?:^\\$|\\s\\$)([a-z]+)/g;\n    const matches = [];\n    let execResult;\n    while ((execResult = re.exec(quoteText)) !== null) {\n        matches.push(execResult[1]);\n    }\n    return matches;\n};\n\n\n//# sourceURL=webpack:///./src/scripts/utils/getExtrasFromQuoteText.ts?");

/***/ }),

/***/ "./src/scripts/utils/getFirstIntNotIn.ts":
/*!***********************************************!*\
  !*** ./src/scripts/utils/getFirstIntNotIn.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction getFirstIntNotIn(list) {\n    let firstInt = 0;\n    while (list.indexOf(firstInt) !== -1) {\n        firstInt++;\n    }\n    return firstInt;\n}\nexports.default = getFirstIntNotIn;\n\n\n//# sourceURL=webpack:///./src/scripts/utils/getFirstIntNotIn.ts?");

/***/ }),

/***/ "./src/scripts/utils/getRandomInt.ts":
/*!*******************************************!*\
  !*** ./src/scripts/utils/getRandomInt.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = (maxValue) => {\n    return Math.floor(Math.random() * maxValue);\n};\n\n\n//# sourceURL=webpack:///./src/scripts/utils/getRandomInt.ts?");

/***/ }),

/***/ "./src/scripts/validators/validateAnchor.ts":
/*!**************************************************!*\
  !*** ./src/scripts/validators/validateAnchor.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isAnchor(el) {\n    return el instanceof HTMLAnchorElement;\n}\n/**\n * Throws an error if it's a checkbox\n */\nfunction validateCheckbox(el) {\n    if (!isAnchor(el)) {\n        throw new Error(`NotAnchor: ${el} is not an anchor. Maybe it does not exist!`);\n    }\n    return el;\n}\nexports.default = validateCheckbox;\n\n\n//# sourceURL=webpack:///./src/scripts/validators/validateAnchor.ts?");

/***/ }),

/***/ "./src/scripts/validators/validateCheckbox.ts":
/*!****************************************************!*\
  !*** ./src/scripts/validators/validateCheckbox.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isCheckbox(el) {\n    return el instanceof HTMLInputElement && el.type === 'checkbox';\n}\n/**\n * Throws an error if it's not a checkbox\n */\nfunction validateCheckbox(el) {\n    if (!isCheckbox(el)) {\n        throw new Error(`NotCheckbox: ${el} is not a checkbox`);\n    }\n    return el;\n}\nexports.default = validateCheckbox;\n\n\n//# sourceURL=webpack:///./src/scripts/validators/validateCheckbox.ts?");

/***/ }),

/***/ "./src/scripts/validators/validateElement.ts":
/*!***************************************************!*\
  !*** ./src/scripts/validators/validateElement.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isElement(el) {\n    return el instanceof HTMLElement;\n}\n/**\n * Throws an error if it's a checkbox\n */\nfunction validateCheckbox(el) {\n    if (!isElement(el)) {\n        throw new Error(`NotElement: ${el} is not an HTML element. Maybe it does not exist!`);\n    }\n    return el;\n}\nexports.default = validateCheckbox;\n\n\n//# sourceURL=webpack:///./src/scripts/validators/validateElement.ts?");

/***/ }),

/***/ "./src/scripts/validators/validateQuoteDataCollection.ts":
/*!***************************************************************!*\
  !*** ./src/scripts/validators/validateQuoteDataCollection.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst getExtrasFromQuoteText_1 = __importDefault(__webpack_require__(/*! ../utils/getExtrasFromQuoteText */ \"./src/scripts/utils/getExtrasFromQuoteText.ts\"));\nconst copyWithoutDuplicates_1 = __importDefault(__webpack_require__(/*! ../utils/copyWithoutDuplicates */ \"./src/scripts/utils/copyWithoutDuplicates.ts\"));\nfunction validateQuoteDataParsedCollection(data) {\n    function _checkForDuplicateIds(data) {\n        const usedIds = [];\n        data.quotes.forEach(({ id }) => {\n            if (usedIds.includes(id)) {\n                throw new Error(`InvalidDataDuplicateID: ${id}.\\nPlease check your data file for duplicate data`);\n            }\n            usedIds.push(id);\n        });\n    }\n    function _checkForEmptyExtras(extraData) {\n        for (const extraName of Object.keys(extraData)) {\n            if (extraData[extraName].length === 0) {\n                throw new Error(`InvalidDataEmptyExtra: ${extraName}`);\n            }\n        }\n    }\n    function _checkForNonExistingExtras({ quotes, extras }) {\n        const requiredExtras = quotes.reduce((extras, { text }) => {\n            return copyWithoutDuplicates_1.default([\n                ...extras,\n                ...getExtrasFromQuoteText_1.default(text)\n            ]);\n        }, []);\n        requiredExtras.forEach(extra => {\n            // SHAME: truth be told, the second check is redundant if we're requiring extras to have content\n            if (!extras[extra] || extras[extra].length < 1) {\n                throw new Error(`InvalidDataMissingExtra: ${extra}`);\n            }\n        });\n    }\n    _checkForDuplicateIds(data);\n    _checkForEmptyExtras(data.extras);\n    _checkForNonExistingExtras(data);\n}\nexports.default = validateQuoteDataParsedCollection;\n\n\n//# sourceURL=webpack:///./src/scripts/validators/validateQuoteDataCollection.ts?");

/***/ }),

/***/ "./src/scripts/yamchaQuoteRenderer.ts":
/*!********************************************!*\
  !*** ./src/scripts/yamchaQuoteRenderer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass YamchaQuoteRenderer {\n    constructor(el) {\n        this._el = el;\n        this._isFirstTime = true;\n    }\n    /**\n     * Useful to handle animation\n     */\n    _getPromiseForSingleAnimation(func) {\n        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n        if (hasReducedMotion)\n            return Promise.resolve(func());\n        return new Promise((resolve) => {\n            this._el.addEventListener('animationend', () => resolve(), {\n                once: true\n            });\n            func();\n        });\n    }\n    _hideQuote() {\n        const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;\n        const { _el } = this;\n        const setClasses = () => {\n            _el.classList.remove(ZOOM_IN);\n            _el.classList.add(ZOOM_OUT);\n        };\n        if (this._isFirstTime) {\n            return new Promise((resolve) => {\n                setClasses();\n                resolve();\n            });\n        }\n        return this._getPromiseForSingleAnimation(setClasses);\n    }\n    _showQuote() {\n        const { ZOOM_IN, ZOOM_OUT } = YamchaQuoteRenderer.EFFECTS;\n        const { _el } = this;\n        return this._getPromiseForSingleAnimation(() => {\n            _el.classList.remove(ZOOM_OUT);\n            _el.classList.add(ZOOM_IN);\n        });\n    }\n    _getTemplate(quote) {\n        return `<p>${quote.getContent()}</p>`;\n    }\n    render(quote) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const quoteContent = this._getTemplate(quote);\n            yield this._hideQuote();\n            this._el.innerHTML = quoteContent;\n            this._isFirstTime = false;\n            return yield this._showQuote();\n        });\n    }\n}\n// classnames from animatecss\nYamchaQuoteRenderer.EFFECTS = {\n    ZOOM_IN: 'zoomIn',\n    ZOOM_OUT: 'zoomOut'\n};\nexports.default = YamchaQuoteRenderer;\n\n\n//# sourceURL=webpack:///./src/scripts/yamchaQuoteRenderer.ts?");

/***/ })

/******/ });