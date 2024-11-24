(function(){
    var script = {
 "mouseWheelEnabled": true,
 "minHeight": 20,
 "paddingBottom": 0,
 "propagateClick": false,
 "mobileMipmappingEnabled": false,
 "id": "rootPlayer",
 "scrollBarVisible": "rollOver",
 "vrPolyfillScale": 1,
 "children": [
  "this.MainViewer",
  "this.Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
  "this.MapViewer",
  "this.Image_5FED247F_5256_529D_41D3_7F3AD0999B51"
 ],
 "scrollBarMargin": 2,
 "start": "this.init(); this.playList_46698F8F_5252_AE7C_41CB_DBFC808F6142.set('selectedIndex', 0)",
 "backgroundPreloadEnabled": true,
 "width": "100%",
 "layout": "absolute",
 "data": {
  "name": "Player460"
 },
 "borderSize": 0,
 "horizontalAlign": "left",
 "desktopMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "downloadEnabled": false,
 "scripts": {
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getKey": function(key){  return window[key]; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "existsKey": function(key){  return key in window; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "unregisterKey": function(key){  delete window[key]; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } }
 },
 "verticalAlign": "top",
 "height": "100%",
 "paddingRight": 0,
 "class": "Player",
 "borderRadius": 0,
 "minWidth": 20,
 "overflow": "visible",
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "definitions": [{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 132.26,
  "pitch": 0
 },
 "id": "camera_40E392DB_5252_B7E4_41D1_B584F9647C45",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.44,
  "pitch": 0
 },
 "id": "camera_4048C1F0_5252_B5A4_41D1_C0B54CD9D1E3",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
 "label": "8k PANOPanorama_25",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 1151.44,
   "class": "PanoramaMapLocation",
   "angle": 212.75,
   "y": 395.68
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -39.05,
   "panorama": "this.panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF",
   "distance": 1,
   "backwardYaw": 43.96
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 56.12,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": -47.74
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0FF77440_1228_8EB6_41B0_B43BE5047BB2",
  "this.overlay_0C4ED831_1229_86D6_41A7_47D946656382"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18714D27_1228_9EF9_4193_3EE6470472F1_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
 "label": "8k PANOPanorama_14",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 598.94,
   "class": "PanoramaMapLocation",
   "angle": 314.65,
   "y": 517.59
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -43.56,
   "panorama": "this.panorama_186A596D_1228_994E_41A3_578D581BD574",
   "distance": 1,
   "backwardYaw": -152.81
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 26.3,
   "panorama": "this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7",
   "distance": 1,
   "backwardYaw": -159.88
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_026A125E_122B_8B4A_41A9_D1A7C4C32A30",
  "this.overlay_1D24C24B_1238_8B4A_41A7_91259F8DACE9"
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18708970_122B_9956_4178_20839723BC76_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18708970_122B_9956_4178_20839723BC76",
 "label": "8k PANOPanorama_28",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18708970_122B_9956_4178_20839723BC76_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 762.32,
   "class": "PanoramaMapLocation",
   "angle": 71.5,
   "y": 432.94
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 17.79,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": 157.88
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 2.16,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 110.37
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_3207B930_1238_86D6_4167_8CA8C245E9E8",
  "this.overlay_32FE897F_1238_F94A_4192_573472751FE8"
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7",
 "label": "8k PANOPanorama_17",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 571.62,
   "class": "PanoramaMapLocation",
   "angle": -19.85,
   "y": 304.27
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 109.66,
   "panorama": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
   "distance": 1,
   "backwardYaw": -170.36
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -30.86,
   "panorama": "this.panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB",
   "distance": 1,
   "backwardYaw": 8.56
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -159.88,
   "panorama": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
   "distance": 1,
   "backwardYaw": 26.3
  },
  {
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_03F0FD15_123F_9EDE_41A7_6DCD0C4540C7",
  "this.overlay_02AE9A10_1238_FAD7_41A0_1CF205F7C3AB",
  "this.overlay_030BA923_1228_86FA_41AB_0C1EDD0136E2",
  "this.overlay_307BB5B4_12D8_89DF_41AC_BFDA23078A5E",
  "this.overlay_306245F1_12E7_8956_41B1_C371B4E444B2"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 114.7,
  "pitch": 0
 },
 "id": "camera_40233283_5252_B664_41CC_A6ADE4ED57F0",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18708970_122B_9956_4178_20839723BC76_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.64,
  "pitch": 0
 },
 "id": "camera_43B141E2_5252_B5A4_41BC_D6DAE442172D",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.28,
  "pitch": 0
 },
 "id": "camera_4381919C_5252_B263_41BF_ECE5AC5E88C4",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.19,
  "pitch": 0
 },
 "id": "camera_43FE2163_5252_B2A5_41B9_EDA6CEFEE843",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 149.14,
  "pitch": 0
 },
 "id": "camera_471010ED_5252_B3BC_41C0_11913F518155",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 80.57,
  "pitch": 0
 },
 "id": "camera_4009824B_5252_B6E4_4199_C2AEA04C5D1C",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.12,
  "pitch": 0
 },
 "id": "camera_43F58171_5252_B2A5_41C1_5BA032BBC208",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 34.81,
  "pitch": 0
 },
 "id": "camera_462C1FFE_5252_AD9F_41D0_A9917370C951",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "playList_46698F8F_5252_AE7C_41CB_DBFC808F6142",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -123.88,
  "pitch": 0
 },
 "id": "camera_402E4275_5252_B6AC_41AE_88549B716192",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.74,
  "pitch": 0
 },
 "id": "camera_461BFFEE_5252_ADBF_41C5_41B16574090E",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.47,
  "pitch": 0
 },
 "id": "camera_4063D22D_5252_B6BD_41AE_118195272FA5",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.71,
  "pitch": 0
 },
 "id": "camera_46BEF08C_5252_B263_41C6_3EA187592015",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18701440_1229_8EB6_418F_527D58837538_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18701440_1229_8EB6_418F_527D58837538",
 "label": "8k PANOPanorama_21",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18701440_1229_8EB6_418F_527D58837538_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 828.55,
   "class": "PanoramaMapLocation",
   "angle": 23.69,
   "y": 359.81
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_18708970_122B_9956_4178_20839723BC76",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -96.33,
   "panorama": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
   "distance": 1,
   "backwardYaw": 11.45
  },
  {
   "panorama": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 128.31,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": -171.25
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 74.02,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 133.72
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -61.87,
   "panorama": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
   "distance": 1,
   "backwardYaw": -62.77
  },
  {
   "panorama": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.18,
   "panorama": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
   "distance": 1,
   "backwardYaw": 27.72
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_07E476A7_1269_8BFA_4194_096AE2594251",
  "this.overlay_079D6F1C_126F_9ACE_41AC_29A241F411EC",
  "this.overlay_044544AE_1268_8FCA_41A9_6614063D09B7",
  "this.overlay_0402AD21_1268_9EF6_4181_40717D6AE9AE",
  "this.overlay_04EB3AE5_1279_9B7E_4170_1ACB7BD8973E",
  "this.overlay_0515D1B6_1279_89DB_417F_BE7209675B67",
  "this.overlay_051080E1_127F_8776_41AC_D12D803E9751",
  "this.overlay_050F9190_1279_89D6_41B0_CE4D31EA7742"
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
 "label": "8k PANOPanorama_22",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 996.9,
   "class": "PanoramaMapLocation",
   "angle": -223.9,
   "y": 379.12
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 28.53,
   "panorama": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
   "distance": 1,
   "backwardYaw": 80.91
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.29,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": -99.43
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 133.72,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": 74.02
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 110.37,
   "panorama": "this.panorama_18708970_122B_9956_4178_20839723BC76",
   "distance": 1,
   "backwardYaw": 2.16
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -47.74,
   "panorama": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
   "distance": 1,
   "backwardYaw": 56.12
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 172.26,
   "panorama": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
   "distance": 1,
   "backwardYaw": -65.3
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0A75F54F_1278_894A_41AA_1638482C8A99",
  "this.overlay_0A77A2E7_1279_8B7A_41B1_9DC7385FB96D",
  "this.overlay_0AD4581A_1268_86CA_41A9_AD8C602B96EF",
  "this.overlay_0B4EEDFD_126B_994E_41AF_AC5C174C6D33",
  "this.overlay_0BC2C949_126B_86B6_41A7_1FBC133741E7",
  "this.overlay_31862FAB_12D9_B9CA_4193_E28970A23034"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -22.12,
  "pitch": 0
 },
 "id": "camera_477240D1_5252_B3E4_41D2_4951AEE43F01",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  "this.PanoramaPlayListItem_4668AF8F_5252_AE77_41B1_5F21CB0640F6",
  "this.PanoramaPlayListItem_466BFF95_5252_AE6C_41D1_8D1172AC23F2",
  "this.PanoramaPlayListItem_466A3F96_5252_AE6F_41C4_3BC70F19F713",
  "this.PanoramaPlayListItem_466ABF96_5252_AE6F_419E_DFBE0811E003",
  "this.PanoramaPlayListItem_46650F96_5252_AE6C_41A2_9B2BF4C3A321",
  "this.PanoramaPlayListItem_46646F96_5252_AE6C_41D3_1D9047AA7883",
  "this.PanoramaPlayListItem_4664CF97_5252_AE6D_41C1_A7D999FEDEF2",
  "this.PanoramaPlayListItem_46670F97_5252_AE6C_41CA_52C576DD9540",
  "this.PanoramaPlayListItem_46660F97_5252_AE6C_419D_B687B281AAF9",
  "this.PanoramaPlayListItem_46617F98_5252_AE63_41D3_498136C0E5E5",
  "this.PanoramaPlayListItem_4661AF9D_5252_AD9C_41BC_63AA0FC735A0",
  "this.PanoramaPlayListItem_4660EF9D_5252_AD9C_41B4_C336B5805121",
  "this.PanoramaPlayListItem_46634F9E_5252_AD9F_41D1_4AE383F94105",
  "this.PanoramaPlayListItem_4663FF9E_5252_AD9C_4189_1E98E63897D8",
  "this.PanoramaPlayListItem_46623F9E_5252_AD9C_41AF_11308416EA3A",
  "this.PanoramaPlayListItem_467D6F9F_5252_AD9D_4199_68BA154B5E75"
 ]
},
{
 "movementMode": "constrained",
 "class": "MapPlayer",
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer"
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_186A596D_1228_994E_41A3_578D581BD574",
 "label": "8k PANOPanorama_15",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 169.8,
   "class": "PanoramaMapLocation",
   "angle": -110.76,
   "y": 492.76
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 113.26,
   "panorama": "this.panorama_1877E00F_1229_86C9_4183_4E8CE912A02B",
   "distance": 1,
   "backwardYaw": 170.4
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -152.81,
   "panorama": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
   "distance": 1,
   "backwardYaw": -43.56
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_1D1CAFD0_1239_B957_41AA_538E38EB8E12",
  "this.overlay_1DA66EE5_123B_9B79_41A5_E68D61A65DD7"
 ]
},
{
 "class": "PlayList",
 "id": "playList_4669CF8F_5252_AE7C_41C0_29E8086D3F6C",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.55,
  "pitch": 0
 },
 "id": "camera_43F24180_5252_B263_41C3_04054CB7FA96",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.82,
  "pitch": 0
 },
 "id": "camera_4631601A_5252_B264_41CA_223F82E568EB",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.98,
  "pitch": 0
 },
 "id": "camera_40030259_5252_B6E4_41A5_C92374C66346",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
 "label": "8k PANOPanorama_27",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 894.78,
   "class": "PanoramaMapLocation",
   "angle": 194.93,
   "y": 275.63
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.47,
   "panorama": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
   "distance": 1,
   "backwardYaw": -100.76
  },
  {
   "panorama": "this.panorama_18708970_122B_9956_4178_20839723BC76",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -65.3,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 172.26
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -23.93,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": -145.19
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 27.72,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": -1.18
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 89.47,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": -1.18
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0CDC715F_1238_894A_41B0_AF5718DB656E",
  "this.overlay_0CC89D17_123B_BEDA_41A5_8CC34A83BC17",
  "this.overlay_0DD4CBD7_1238_9959_41A7_6E318066280C",
  "this.overlay_32BFD390_123F_89D6_41A9_6EF5A51A03E0",
  "this.overlay_365530B8_1238_87D6_41A9_719553AB90F8"
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF",
 "label": "8k PANOPanorama_26",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 1168,
   "class": "PanoramaMapLocation",
   "angle": -45.87,
   "y": 679.94
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 43.96,
   "panorama": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
   "distance": 1,
   "backwardYaw": -39.05
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0C534409_1227_8EB6_416E_C6D82ADB4BA0"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.38,
  "pitch": 0
 },
 "id": "camera_40CFB2A1_5252_B7A5_41D3_19C364904CF3",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
 "label": "8k PANOPanorama_23",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 908.58,
   "class": "PanoramaMapLocation",
   "angle": 124.58,
   "y": 434.32
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 58.81,
   "panorama": "this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74",
   "distance": 1,
   "backwardYaw": -3.74
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -99.43,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 76.29
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 20.63,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 76.29
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 20.63,
   "panorama": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
   "distance": 1,
   "backwardYaw": 81.13
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -145.19,
   "panorama": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
   "distance": 1,
   "backwardYaw": -23.93
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 157.88,
   "panorama": "this.panorama_18708970_122B_9956_4178_20839723BC76",
   "distance": 1,
   "backwardYaw": 17.79
  },
  {
   "panorama": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -171.25,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": 128.31
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0BCBBF8C_1268_F9CF_4179_357154160B26",
  "this.overlay_0BBC8E59_1267_9B56_41B0_55C8666213E2",
  "this.overlay_0B9C31C6_1258_89BA_4196_8B3ABF03E6DF",
  "this.overlay_09638358_1258_8957_41A2_9BC2F0505230",
  "this.overlay_08CAAEC8_1258_BBB6_41A7_4774A72DE61C",
  "this.overlay_09FB0CE7_125B_BF7A_419C_946DC27E78A8",
  "this.overlay_0E86B066_1228_877A_41B1_1B6723F26537"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.13,
  "pitch": 0
 },
 "id": "camera_403AD292_5252_B664_41C6_923E80FAB629",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.84,
  "pitch": 0
 },
 "id": "camera_4014E267_5252_B6AC_41D3_FBABF0EABB3C",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.23,
  "pitch": 0
 },
 "id": "camera_439E11AA_5252_B5A4_41D1_D9F05D40C6B7",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.6,
  "pitch": 0
 },
 "id": "camera_46FAB051_5252_B2E4_41B1_296D46458A54",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -162.21,
  "pitch": 0
 },
 "id": "camera_476D80B6_5252_B3AF_41D3_693ADC70D76D",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
 "label": "8k PANOPanorama_24",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 1021.73,
   "class": "PanoramaMapLocation",
   "angle": -94.53,
   "y": 615.08
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_18708970_122B_9956_4178_20839723BC76",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -13.43,
   "panorama": "this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74",
   "distance": 1,
   "backwardYaw": 99.82
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 81.13,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": 20.63
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 80.91,
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "distance": 1,
   "backwardYaw": 28.53
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_0E70EF17_1228_BADA_41B0_CB9DA2DB8CF5",
  "this.overlay_0E80B619_1228_8AD6_4194_2C0863E99813",
  "this.overlay_0E9204EF_1228_8F4A_4188_CB0E9B0FA41F",
  "this.overlay_307AF48B_1228_8FC9_4194_D60947D999B0"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.34,
  "pitch": 0
 },
 "id": "camera_46E57044_5252_B2E3_41CD_591098360EDC",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -121.19,
  "pitch": 0
 },
 "id": "camera_43BC61D4_5252_B5EC_41D2_881A539DFA37",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.74,
  "pitch": 0
 },
 "id": "camera_40D5F2BD_5252_B79C_41C6_78D9D3ED144D",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -51.69,
  "pitch": 0
 },
 "id": "camera_477D90C3_5252_B3E4_41C4_C2E9D1481A93",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -99.09,
  "pitch": 0
 },
 "id": "camera_4074823D_5252_B69D_4196_F7B5CD5189FC",
 "automaticZoomSpeed": 10
},
{
 "maximumZoomFactor": 1.2,
 "label": "SITE PLAN",
 "id": "map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
 "initialZoomFactor": 1,
 "width": 1328,
 "class": "Map",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17.png",
    "width": 1328,
    "class": "ImageResourceLevel",
    "height": 919
   },
   {
    "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_lq.png",
    "width": 307,
    "class": "ImageResourceLevel",
    "height": 213,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideColor": "#FF0000",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "thumbnailUrl": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_t.png",
 "fieldOfViewOverlayRadiusScale": 0.2,
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "height": 919,
 "overlays": [
  "this.overlay_1BA3071F_14C8_F6D5_41A9_4E8160DE5592",
  "this.overlay_049EA15C_14C9_0D5B_41A5_FE6915F11AC5",
  "this.overlay_0460C4DE_14C9_0B57_41A8_DF744446B7AC",
  "this.overlay_05F6B383_14CF_0DAD_41AD_DE9FB0A17EEC",
  "this.overlay_05E6F4DB_14CF_0B5D_418D_308B911775D8",
  "this.overlay_05AC4B2B_14CF_1EFD_41A8_E89FF388E099",
  "this.overlay_0512FAB1_14C9_3FED_41AB_BBACA739D80D",
  "this.overlay_067628A8_14CB_3BFB_41A5_99CDFBC00FD5",
  "this.overlay_0580A7CB_14CB_15BD_41A5_525783803393",
  "this.overlay_062FC840_14C9_3AAB_41B2_9C5B7F55C5B5",
  "this.overlay_06205984_14C9_3DAB_41A0_5D7E3F0BC04C",
  "this.overlay_07F89224_14C9_0EEB_41A8_74C50E380628",
  "this.overlay_0782E16C_14C9_0D7B_41B4_133A4097057F",
  "this.overlay_076C5D1D_14C7_1AD5_41B4_C13BC8EC3664",
  "this.overlay_00E963FA_14C7_0D5F_4194_14E13743EF1E",
  "this.overlay_0074D29B_14C7_0FDD_41AF_CF38B0E584B8"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.64,
  "pitch": 0
 },
 "id": "camera_46C72028_5252_B2A3_41D3_8A73E344D6A9",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -69.63,
  "pitch": 0
 },
 "id": "camera_4703B0DF_5252_B39C_41C3_511489175A97",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -159.37,
  "pitch": 0
 },
 "id": "camera_4068221D_5252_B69C_41A5_B9CBB442F9E7",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -152.28,
  "pitch": 0
 },
 "id": "camera_4391B1B8_5252_B5A4_41BB_2C8B2EE1D3C6",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_1877E00F_1229_86C9_4183_4E8CE912A02B",
 "label": "8k PANOPanorama_16",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 202.91,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 118.81
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 170.4,
   "panorama": "this.panorama_186A596D_1228_994E_41A3_578D581BD574",
   "distance": 1,
   "backwardYaw": 113.26
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_026C292D_1238_86CE_41AE_DC3E24D0A2E8"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.67,
  "pitch": 0
 },
 "id": "camera_46D4C036_5252_B2AC_41D0_FFB3EDF4C2A8",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18701440_1229_8EB6_418F_527D58837538_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_187F8580_1228_89B6_41AD_E24BF8B36962_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 136.44,
  "pitch": 0
 },
 "id": "camera_468A4061_5252_B2A5_41C7_4CCAE789E1B2",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.04,
  "pitch": 0
 },
 "id": "camera_40E9D2CB_5252_B7E4_41C8_1B7783F316D3",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -80.18,
  "pitch": 0
 },
 "id": "camera_4057420F_5252_B67D_41D2_ED34A0B6187A",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.53,
  "pitch": 0
 },
 "id": "camera_40C302AF_5252_B7BD_41CE_A89675B28028",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
 "label": "8k PANOPanorama_20",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 741.62,
   "class": "PanoramaMapLocation",
   "angle": 199.29,
   "y": 263.21
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.77,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": -61.87
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 21.36,
   "panorama": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
   "distance": 1,
   "backwardYaw": -56.62
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -100.76,
   "panorama": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
   "distance": 1,
   "backwardYaw": 89.47
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_075986B3_1258_8BDA_41A3_7A1D6D6B43E3",
  "this.overlay_076A55DD_1267_894E_419C_2184B130AE88",
  "this.overlay_07441720_1269_8AF6_41A8_69DA097E2FE6"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.24,
  "pitch": 0
 },
 "id": "camera_46070FD6_5252_ADEC_41D0_87809381CA14",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.57,
  "pitch": 0
 },
 "id": "camera_43AB31C6_5252_B5EC_41C2_D04BC8F58108",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_186A596D_1228_994E_41A3_578D581BD574_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74",
 "label": "8k PANOPanorama_29",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 929.28,
   "class": "PanoramaMapLocation",
   "angle": -1.23,
   "y": 627.5
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 99.82,
   "panorama": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
   "distance": 1,
   "backwardYaw": -13.43
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.74,
   "panorama": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
   "distance": 1,
   "backwardYaw": 58.81
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_329AD30E_1228_8ACA_41B1_37CF0071C9B8",
  "this.overlay_3303A155_122B_895E_41A2_2D83569E2526"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.82,
  "pitch": 0
 },
 "id": "camera_4623700C_5252_B263_41C3_9017D8A6CDA3",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB",
 "label": "8k PANOPanorama_18",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 462.47,
   "class": "PanoramaMapLocation",
   "angle": 113.02,
   "y": 211.19
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
   "class": "AdjacentPanorama"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 8.56,
   "panorama": "this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7",
   "distance": 1,
   "backwardYaw": -30.86
  },
  {
   "panorama": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_03EDB5E4_1229_897E_416E_659D76F7573E",
  "this.overlay_0458355B_1228_894A_419A_3106FF6504BE",
  "this.overlay_00A46D8D_1229_79CE_419B_6E2CB89171A2",
  "this.overlay_00D690E5_1229_877E_41A6_9EB3D8A5F601"
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "id": "panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
 "label": "8k PANOPanorama_19",
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_t.jpg",
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17",
   "x": 680.08,
   "class": "PanoramaMapLocation",
   "angle": 101.72,
   "y": 325.52
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -56.62,
   "panorama": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
   "distance": 1,
   "backwardYaw": 21.36
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.45,
   "panorama": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
   "distance": 1,
   "backwardYaw": -96.33
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -170.36,
   "panorama": "this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7",
   "distance": 1,
   "backwardYaw": 109.66
  },
  {
   "panorama": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "120%",
 "partial": false,
 "overlays": [
  "this.overlay_01722ACD_1229_7B4E_41AA_CBBBB54BA576",
  "this.overlay_015C070E_1228_8ACA_41A5_F07CD7D3FEE1",
  "this.overlay_0660D281_1259_8BB6_41AD_B8E3E97BB848",
  "this.overlay_06D59652_1258_8B5A_4195_F36BD4ABDDFC",
  "this.overlay_0592C6F2_1258_8B5A_419C_ED72525BD904"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.07,
  "pitch": 0
 },
 "id": "camera_475C30A7_5252_B3AC_41C8_B6F8909739E9",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.75,
  "pitch": 0
 },
 "id": "camera_4388718E_5252_B27C_41C2_6A3F90A5ABFF",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.71,
  "pitch": 0
 },
 "id": "camera_46A8407E_5252_B29C_41C2_93E311189895",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 140.95,
  "pitch": 0
 },
 "id": "camera_43E2A154_5252_B2EC_41CA_341B2A911101",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.87,
  "pitch": 0
 },
 "id": "camera_474E509A_5252_B267_41D0_EE84B73EDDF7",
 "automaticZoomSpeed": 10
},
{
 "buttonCardboardView": "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -153.7,
  "pitch": 0
 },
 "id": "camera_405DD200_5252_B663_41B9_858C01E39F74",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.26,
  "pitch": 0
 },
 "id": "camera_46982070_5252_B2A4_41CC_B8110E4B5853",
 "automaticZoomSpeed": 10
},
{
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "data": {
  "name": "Main Viewer"
 },
 "progressBorderColor": "#000000",
 "id": "MainViewer",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingBottom": 4,
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderRadius": 0,
 "paddingRight": 0,
 "class": "ViewerArea",
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "minWidth": 100,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "minHeight": 50,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "transitionDuration": 500,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionTime": 2000,
 "playbackBarHeadShadow": true,
 "borderSize": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "paddingBottom": 0,
 "paddingLeft": 0
},
{
 "minHeight": 1,
 "paddingBottom": 0,
 "data": {
  "name": "--- MENU"
 },
 "children": [
  "this.Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
  "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
 ],
 "id": "Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "layout": "absolute",
 "borderSize": 0,
 "backgroundImageUrl": "skin/Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC.png",
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "bottom": "0%",
 "height": "12.832%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "minWidth": 1,
 "overflow": "visible",
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "propagateClick": true
},
{
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "data": {
  "name": "Floor Plan"
 },
 "progressBorderColor": "#000000",
 "id": "MapViewer",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "right": "0.16%",
 "width": "18.556%",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "height": "23.155%",
 "paddingRight": 0,
 "class": "ViewerArea",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "minWidth": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "minHeight": 1,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "transitionDuration": 500,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionTime": 2000,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "borderSize": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBottom": 2,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "top": "0.13%",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "paddingBottom": 0,
 "paddingLeft": 0
},
{
 "minHeight": 1,
 "paddingBottom": 0,
 "data": {
  "name": "Image2768"
 },
 "id": "Image_5FED247F_5256_529D_41D3_7F3AD0999B51",
 "left": "0%",
 "width": "17.111%",
 "maxWidth": 1095,
 "borderSize": 0,
 "url": "skin/Image_5FED247F_5256_529D_41D3_7F3AD0999B51.png",
 "horizontalAlign": "center",
 "shadow": false,
 "top": "0%",
 "verticalAlign": "middle",
 "maxHeight": 1095,
 "height": "21.997%",
 "paddingRight": 0,
 "class": "Image",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingLeft": 0
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_31931F80_1229_B9B6_41AF_3B5A41388E54",
   "pitch": -11.55,
   "yaw": -39.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -39.05,
   "hfov": 8.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.55
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0FF77440_1228_8EB6_41B0_B43BE5047BB2",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF, this.camera_40E9D2CB_5252_B7E4_41C8_1B7783F316D3); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.77,
   "image": "this.AnimatedImageResource_318CFF80_1229_B9B6_4164_FE5B6B78F100",
   "pitch": -34,
   "yaw": 56.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.12,
   "hfov": 8.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0C4ED831_1229_86D6_41A7_47D946656382",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_40E392DB_5252_B7E4_41D1_B584F9647C45); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 16.7,
   "image": "this.AnimatedImageResource_3180CCD1_12D9_9F56_4185_2CF515DD638D",
   "pitch": -21.22,
   "yaw": 26.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.3,
   "hfov": 16.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0_HS_0_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.22
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_026A125E_122B_8B4A_41A9_D1A7C4C32A30",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7, this.camera_43F58171_5252_B2A5_41C1_5BA032BBC208); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.05,
   "image": "this.AnimatedImageResource_319D5F78_1229_B956_4177_2832EDB9EEC0",
   "pitch": -10.93,
   "yaw": -43.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.56,
   "hfov": 10.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0_HS_1_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -10.93
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1D24C24B_1238_8B4A_41A7_91259F8DACE9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_186A596D_1228_994E_41A3_578D581BD574, this.camera_43FE2163_5252_B2A5_41B9_EDA6CEFEE843); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.96,
   "image": "this.AnimatedImageResource_318D9F82_1229_B9BA_41AE_85D132DEAF35",
   "pitch": -33.28,
   "yaw": 17.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 17.79,
   "hfov": 12.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.28
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3207B930_1238_86D6_4167_8CA8C245E9E8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_477240D1_5252_B3E4_41D2_4951AEE43F01); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.22,
   "image": "this.AnimatedImageResource_318D4F82_1229_B9BA_41A9_C2B49E412C94",
   "pitch": -11.21,
   "yaw": 2.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.16,
   "hfov": 5.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_1_HS_1_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.21
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_32FE897F_1238_F94A_4192_573472751FE8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_4703B0DF_5252_B39C_41C3_511489175A97); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 15.23,
   "image": "this.AnimatedImageResource_319E6F78_1229_B956_4170_FAFF9404C6E5",
   "pitch": -38.15,
   "yaw": -159.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.88,
   "hfov": 15.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.15
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_03F0FD15_123F_9EDE_41A7_6DCD0C4540C7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E, this.camera_405DD200_5252_B663_41B9_858C01E39F74); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.99,
   "image": "this.AnimatedImageResource_319FDF79_1229_B956_4182_B7BB748741CE",
   "pitch": -20.33,
   "yaw": -30.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.86,
   "hfov": 7.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.33
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_02AE9A10_1238_FAD7_41A0_1CF205F7C3AB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB, this.camera_4048C1F0_5252_B5A4_41D1_C0B54CD9D1E3); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.96,
   "image": "this.AnimatedImageResource_319F4F79_1229_B956_4194_4E36E8D5AB51",
   "pitch": -17.47,
   "yaw": 80.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.66,
   "hfov": 5.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -17.47
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_030BA923_1228_86FA_41AB_0C1EDD0136E2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.23,
   "image": "this.AnimatedImageResource_37184095_12E8_87DE_41A3_11A6EE50D4F8",
   "pitch": -39.32,
   "yaw": 109.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.66,
   "hfov": 9.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0_HS_5_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.32
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_307BB5B4_12D8_89DF_41AC_BFDA23078A5E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8, this.camera_43B141E2_5252_B5A4_41BC_D6DAE442172D); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.06,
   "image": "this.AnimatedImageResource_37180096_12E8_87DA_419F_685B4BB02511",
   "pitch": -13.84,
   "yaw": 113.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.51,
   "hfov": 6.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0_HS_6_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.84
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_306245F1_12E7_8956_41B1_C371B4E444B2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 19.49,
   "image": "this.AnimatedImageResource_31949F7B_1229_B94A_419C_8728D8AAD0C9",
   "pitch": -40.96,
   "yaw": -1.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.18,
   "hfov": 19.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -40.96
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_07E476A7_1269_8BFA_4194_096AE2594251",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F, this.camera_4391B1B8_5252_B5A4_41BB_2C8B2EE1D3C6); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.03,
   "image": "this.AnimatedImageResource_30CEB764_12DB_897E_417B_CAACBB1DA0D0",
   "pitch": -15.06,
   "yaw": -96.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.33,
   "hfov": 6.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0_HS_1_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.06
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_079D6F1C_126F_9ACE_41AC_29A241F411EC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8, this.camera_43F24180_5252_B263_41C3_04054CB7FA96); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.17,
   "image": "this.AnimatedImageResource_3195CF7C_1229_B94E_41A1_904011B58E56",
   "pitch": -19.04,
   "yaw": -61.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.87,
   "hfov": 9.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.04
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_044544AE_1268_8FCA_41A9_6614063D09B7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485, this.camera_439E11AA_5252_B5A4_41D1_D9F05D40C6B7); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.73,
   "image": "this.AnimatedImageResource_31958F7C_1229_B94E_41AD_E629C639B51C",
   "pitch": -24.88,
   "yaw": 74.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.02,
   "hfov": 8.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.88
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0402AD21_1268_9EF6_4181_40717D6AE9AE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_4381919C_5252_B263_41BF_ECE5AC5E88C4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.52,
   "image": "this.AnimatedImageResource_3194CF7C_1229_B94E_41A1_36399CF44910",
   "pitch": -26.12,
   "yaw": 128.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.31,
   "hfov": 8.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.12
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_04EB3AE5_1279_9B7E_4170_1ACB7BD8973E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_4388718E_5252_B27C_41C2_6A3F90A5ABFF); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.75,
   "image": "this.AnimatedImageResource_3194AF7C_1229_B94E_41AD_F2E67013F177",
   "pitch": -10.05,
   "yaw": 128.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.44,
   "hfov": 3.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_5_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -10.05
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0515D1B6_1279_89DB_417F_BE7209675B67",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.54,
   "image": "this.AnimatedImageResource_31943F7C_1229_B94E_4178_30D15A327ED1",
   "pitch": -9.91,
   "yaw": 76.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.08,
   "hfov": 5.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_6_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.91
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_051080E1_127F_8776_41AC_D12D803E9751",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.64,
   "image": "this.AnimatedImageResource_3195EF7D_1229_B94E_4192_9ABF9AB0754A",
   "pitch": -31.61,
   "yaw": -157.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.02,
   "hfov": 10.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_7_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.61
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_050F9190_1279_89D6_41B0_CE4D31EA7742",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 11.36,
   "image": "this.AnimatedImageResource_31954F7D_1229_B94E_4192_D4B14861B469",
   "pitch": -16.85,
   "yaw": -47.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.74,
   "hfov": 11.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.85
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0A75F54F_1278_894A_41AA_1638482C8A99",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1, this.camera_402E4275_5252_B6AC_41AE_88549B716192); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.66,
   "image": "this.AnimatedImageResource_3196DF7D_1229_B94E_4185_62802A1E3B3F",
   "pitch": -28.39,
   "yaw": 76.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.29,
   "hfov": 6.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.39
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0A77A2E7_1279_8B7A_41B1_9DC7385FB96D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_4009824B_5252_B6E4_4199_C2AEA04C5D1C); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.61,
   "image": "this.AnimatedImageResource_30C89766_12DB_897A_41A9_75B1DF864D1C",
   "pitch": -19.37,
   "yaw": 133.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.72,
   "hfov": 6.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.37
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0AD4581A_1268_86CA_41A9_AD8C602B96EF",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_40030259_5252_B6E4_41A5_C92374C66346); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.65,
   "image": "this.AnimatedImageResource_31967F7D_1229_B94E_418C_7AE2E731F058",
   "pitch": -20.05,
   "yaw": 110.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.37,
   "hfov": 4.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.05
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0B4EEDFD_126B_994E_41AF_AC5C174C6D33",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18708970_122B_9956_4178_20839723BC76, this.camera_4014E267_5252_B6AC_41D3_FBABF0EABB3C); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12,
   "image": "this.AnimatedImageResource_3197BF7E_1229_B94A_41AA_2D91BAC62539",
   "pitch": -26.5,
   "yaw": 172.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.26,
   "hfov": 12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_5_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.5
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0BC2C949_126B_86B6_41A7_1FBC133741E7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F, this.camera_40233283_5252_B664_41CC_A6ADE4ED57F0); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.24,
   "image": "this.AnimatedImageResource_30C84766_12DB_897A_41AE_90DD8885766E",
   "pitch": -13.19,
   "yaw": 28.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.53,
   "hfov": 5.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0_HS_6_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.19
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_31862FAB_12D9_B9CA_4193_E28970A23034",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962, this.camera_4074823D_5252_B69D_4196_F7B5CD5189FC); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "media": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4668AF8F_5252_AE77_41B1_5F21CB0640F6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4668AF8F_5252_AE77_41B1_5F21CB0640F6"
},
{
 "media": "this.panorama_186A596D_1228_994E_41A3_578D581BD574",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_186A596D_1228_994E_41A3_578D581BD574_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_466BFF95_5252_AE6C_41D1_8D1172AC23F2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_466BFF95_5252_AE6C_41D1_8D1172AC23F2"
},
{
 "media": "this.panorama_1877E00F_1229_86C9_4183_4E8CE912A02B",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_466A3F96_5252_AE6F_41C4_3BC70F19F713, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_466A3F96_5252_AE6F_41C4_3BC70F19F713"
},
{
 "media": "this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_466ABF96_5252_AE6F_419E_DFBE0811E003, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_466ABF96_5252_AE6F_419E_DFBE0811E003"
},
{
 "media": "this.panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46650F96_5252_AE6C_41A2_9B2BF4C3A321, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46650F96_5252_AE6C_41A2_9B2BF4C3A321"
},
{
 "media": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46646F96_5252_AE6C_41D3_1D9047AA7883, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46646F96_5252_AE6C_41D3_1D9047AA7883"
},
{
 "media": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4664CF97_5252_AE6D_41C1_A7D999FEDEF2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4664CF97_5252_AE6D_41C1_A7D999FEDEF2"
},
{
 "media": "this.panorama_18701440_1229_8EB6_418F_527D58837538",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18701440_1229_8EB6_418F_527D58837538_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46670F97_5252_AE6C_41CA_52C576DD9540, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46670F97_5252_AE6C_41CA_52C576DD9540"
},
{
 "media": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46660F97_5252_AE6C_419D_B687B281AAF9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46660F97_5252_AE6C_419D_B687B281AAF9"
},
{
 "media": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46617F98_5252_AE63_41D3_498136C0E5E5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46617F98_5252_AE63_41D3_498136C0E5E5"
},
{
 "media": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4661AF9D_5252_AD9C_41BC_63AA0FC735A0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4661AF9D_5252_AD9C_41BC_63AA0FC735A0"
},
{
 "media": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4660EF9D_5252_AD9C_41B4_C336B5805121, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4660EF9D_5252_AD9C_41B4_C336B5805121"
},
{
 "media": "this.panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46634F9E_5252_AD9F_41D1_4AE383F94105, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46634F9E_5252_AD9F_41D1_4AE383F94105"
},
{
 "media": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4663FF9E_5252_AD9C_4189_1E98E63897D8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4663FF9E_5252_AD9C_4189_1E98E63897D8"
},
{
 "media": "this.panorama_18708970_122B_9956_4178_20839723BC76",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_18708970_122B_9956_4178_20839723BC76_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_46623F9E_5252_AD9C_41AF_11308416EA3A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_46623F9E_5252_AD9C_41AF_11308416EA3A"
},
{
 "media": "this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_467D6F9F_5252_AD9D_4199_68BA154B5E75, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "end": "this.trigger('tourEnded')",
 "id": "PanoramaPlayListItem_467D6F9F_5252_AD9D_4199_68BA154B5E75"
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 9.51,
   "image": "this.AnimatedImageResource_30C33761_12DB_8976_41A2_DA7C446EC8A2",
   "pitch": -9.13,
   "yaw": -152.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -152.81,
   "hfov": 9.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.13
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1D1CAFD0_1239_B957_41AA_538E38EB8E12",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E, this.camera_468A4061_5252_B2A5_41C7_4CCAE789E1B2); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.57,
   "image": "this.AnimatedImageResource_30C37762_12DB_897A_417D_F43EAC449313",
   "pitch": -15.23,
   "yaw": 113.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.26,
   "hfov": 8.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.23
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1DA66EE5_123B_9B79_41A5_E68D61A65DD7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1877E00F_1229_86C9_4183_4E8CE912A02B, this.camera_46FAB051_5252_B2E4_41B1_296D46458A54); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.29,
   "image": "this.AnimatedImageResource_318DDF81_1229_B9B6_41B2_355FF3DE01AC",
   "pitch": -19.32,
   "yaw": -65.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.3,
   "hfov": 7.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.32
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0CDC715F_1238_894A_41B0_AF5718DB656E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_461BFFEE_5252_ADBF_41C5_41B16574090E); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.61,
   "image": "this.AnimatedImageResource_318DBF81_1229_B9B6_4194_25F407D26E3C",
   "pitch": -26.63,
   "yaw": 27.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 27.72,
   "hfov": 10.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_1_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.63
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0CC89D17_123B_BEDA_41A5_8CC34A83BC17",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_4623700C_5252_B263_41C3_9017D8A6CDA3); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.36,
   "image": "this.AnimatedImageResource_318D1F81_1229_B9B6_41A5_2877AC437546",
   "pitch": -17.94,
   "yaw": 89.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.47,
   "hfov": 8.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -17.94
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0DD4CBD7_1238_9959_41A7_6E318066280C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_4631601A_5252_B264_41CA_223F82E568EB); this.mainPlayList.set('selectedIndex', 7); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.47,
   "image": "this.AnimatedImageResource_318ECF81_1229_B9B6_41A0_F128BC92C2C5",
   "pitch": -14.14,
   "yaw": -23.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.93,
   "hfov": 6.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_3_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.14
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_32BFD390_123F_89D6_41A9_6EF5A51A03E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_462C1FFE_5252_AD9F_41D0_A9917370C951); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.46,
   "image": "this.AnimatedImageResource_318EAF82_1229_B9BA_4159_0527C98A705F",
   "pitch": -16.99,
   "yaw": 8.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.99,
   "hfov": 5.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_4_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.99
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_365530B8_1238_87D6_41A9_719553AB90F8",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.04,
   "image": "this.AnimatedImageResource_30D4E769_12DB_8976_41AC_B67ED4E8038D",
   "pitch": -16.23,
   "yaw": 43.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.96,
   "hfov": 8.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.23
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0C534409_1227_8EB6_416E_C6D82ADB4BA0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18714D27_1228_9EF9_4193_3EE6470472F1, this.camera_43E2A154_5252_B2EC_41CA_341B2A911101); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.07,
   "image": "this.AnimatedImageResource_31976F7E_1229_B94A_41AD_91028EC8B030",
   "pitch": -29.71,
   "yaw": -99.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -99.43,
   "hfov": 8.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.71
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0BCBBF8C_1268_F9CF_4179_357154160B26",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_46A8407E_5252_B29C_41C2_93E311189895); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.59,
   "image": "this.AnimatedImageResource_3190CF7E_1229_B94A_41AC_0C5211BF8564",
   "pitch": -14.02,
   "yaw": -61.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.87,
   "hfov": 5.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.02
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0BBC8E59_1267_9B56_41B0_55C8666213E2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.42,
   "image": "this.AnimatedImageResource_31905F7E_1229_B94A_4194_235D6FBEBF0E",
   "pitch": -18.61,
   "yaw": 20.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 20.63,
   "hfov": 5.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.61
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0B9C31C6_1258_89BA_4196_8B3ABF03E6DF",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962, this.camera_474E509A_5252_B267_41D0_EE84B73EDDF7); this.mainPlayList.set('selectedIndex', 8); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.74,
   "image": "this.AnimatedImageResource_31902F7F_1229_B94A_41A8_F004FB1F45EA",
   "pitch": -21.89,
   "yaw": 157.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 157.88,
   "hfov": 4.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.89
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_09638358_1258_8957_41A2_9BC2F0505230",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18708970_122B_9956_4178_20839723BC76, this.camera_476D80B6_5252_B3AF_41D3_693ADC70D76D); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.24,
   "image": "this.AnimatedImageResource_31919F7F_1229_B94A_4181_F891E0C2F5F8",
   "pitch": -18.17,
   "yaw": -145.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03b Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -145.19,
   "hfov": 10.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_4_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -18.17
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_08CAAEC8_1258_BBB6_41A7_4774A72DE61C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F, this.camera_475C30A7_5252_B3AC_41C8_B6F8909739E9); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.74,
   "image": "this.AnimatedImageResource_31910F7F_1229_B94A_41B0_C347DFA1E793",
   "pitch": -23.02,
   "yaw": -171.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.25,
   "hfov": 8.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_5_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.02
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_09FB0CE7_125B_BF7A_419C_946DC27E78A8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_477D90C3_5252_B3E4_41C4_C2E9D1481A93); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.12,
   "image": "this.AnimatedImageResource_3192CF7F_1229_B94A_4197_658E023E0A2D",
   "pitch": -25.93,
   "yaw": 58.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.81,
   "hfov": 10.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_6_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.93
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0E86B066_1228_877A_41B1_1B6723F26537",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74, this.camera_46982070_5252_B2A4_41CC_B8110E4B5853); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.69,
   "image": "this.AnimatedImageResource_3192AF7F_1229_B94A_4168_D067D59EFCFD",
   "pitch": -35.56,
   "yaw": -13.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.43,
   "hfov": 12.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.56
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0E70EF17_1228_BADA_41B0_CB9DA2DB8CF5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74, this.camera_4057420F_5252_B67D_41D2_ED34A0B6187A); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 13.68,
   "image": "this.AnimatedImageResource_30D59768_12DB_8976_41AA_E3AE5211D71A",
   "pitch": -19.46,
   "yaw": 81.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.13,
   "hfov": 13.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0_HS_1_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.46
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0E80B619_1228_8AD6_4194_2C0863E99813",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_4068221D_5252_B69C_41A5_B9CBB442F9E7); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.48,
   "image": "this.AnimatedImageResource_3193FF80_1229_B9B6_417D_D3D17569F4E0",
   "pitch": -14.19,
   "yaw": 80.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.91,
   "hfov": 3.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.19
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0E9204EF_1228_8F4A_4188_CB0E9B0FA41F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0, this.camera_4063D22D_5252_B6BD_41AE_118195272FA5); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.62,
   "image": "this.AnimatedImageResource_3193AF80_1229_B9B6_4192_1220BAD1F4A0",
   "pitch": -12.51,
   "yaw": 47.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.77,
   "hfov": 3.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -12.51
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_307AF48B_1228_8FC9_4194_D60947D999B0",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 64.03,
  "x": 566.92,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 18
    }
   ]
  },
  "y": 480.61,
  "offsetY": 0,
  "height": 73.97,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1BA3071F_14C8_F6D5_41A9_4E8160DE5592",
 "image": {
  "x": 566.92,
  "y": 480.61,
  "width": 64.03,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_0.png",
     "width": 64,
     "class": "ImageResourceLevel",
     "height": 73
    }
   ]
  },
  "height": 73.97
 }
},
{
 "map": {
  "width": 64.03,
  "x": 137.78,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 18
    }
   ]
  },
  "y": 455.77,
  "offsetY": 0,
  "height": 73.97,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_049EA15C_14C9_0D5B_41A5_FE6915F11AC5",
 "image": {
  "x": 137.78,
  "y": 455.77,
  "width": 64.03,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_1.png",
     "width": 64,
     "class": "ImageResourceLevel",
     "height": 73
    }
   ]
  },
  "height": 73.97
 }
},
{
 "map": {
  "width": 64.03,
  "x": 170.9,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 18
    }
   ]
  },
  "y": 81.83,
  "offsetY": 0,
  "height": 73.97,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0460C4DE_14C9_0B57_41A8_DF744446B7AC",
 "image": {
  "x": 170.9,
  "y": 81.83,
  "width": 64.03,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_2.png",
     "width": 64,
     "class": "ImageResourceLevel",
     "height": 73
    }
   ]
  },
  "height": 73.97
 }
},
{
 "map": {
  "width": 50.78,
  "x": 546.23,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 273.35,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_05F6B383_14CF_0DAD_41AD_DE9FB0A17EEC",
 "image": {
  "x": 546.23,
  "y": 273.35,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_3.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 437.08,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_4_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 180.28,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_05E6F4DB_14CF_0B5D_418D_308B911775D8",
 "image": {
  "x": 437.08,
  "y": 180.28,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_4.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 654.68,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_5_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 294.6,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_05AC4B2B_14CF_1EFD_41A8_E89FF388E099",
 "image": {
  "x": 654.68,
  "y": 294.6,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_5.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 716.23,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 232.3,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0512FAB1_14C9_3FED_41AB_BBACA739D80D",
 "image": {
  "x": 716.23,
  "y": 232.3,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_6.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 803.16,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_7_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 328.89,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_067628A8_14CB_3BFB_41A5_99CDFBC00FD5",
 "image": {
  "x": 803.16,
  "y": 328.89,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_7.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 869.39,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_8_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 244.72,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0580A7CB_14CB_15BD_41A5_525783803393",
 "image": {
  "x": 869.39,
  "y": 244.72,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_8.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 883.19,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_9_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 403.41,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_062FC840_14C9_3AAB_41B2_9C5B7F55C5B5",
 "image": {
  "x": 883.19,
  "y": 403.41,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_9.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 971.5,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 348.21,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_06205984_14C9_3DAB_41A0_5D7E3F0BC04C",
 "image": {
  "x": 971.5,
  "y": 348.21,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_10.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 903.89,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_11_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 596.59,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_07F89224_14C9_0EEB_41A8_74C50E380628",
 "image": {
  "x": 903.89,
  "y": 596.59,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_11.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 996.34,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_12_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 584.17,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0782E16C_14C9_0D7B_41B4_133A4097057F",
 "image": {
  "x": 996.34,
  "y": 584.17,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_12.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 1126.05,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_13_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 364.77,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_076C5D1D_14C7_1AD5_41B4_C13BC8EC3664",
 "image": {
  "x": 1126.05,
  "y": 364.77,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_13.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 1142.61,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_14_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 649.03,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_00E963FA_14C7_0D5F_4194_14E13743EF1E",
 "image": {
  "x": 1142.61,
  "y": 649.03,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_14.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "map": {
  "width": 50.78,
  "x": 736.92,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_15_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "y": 402.03,
  "offsetY": 0,
  "height": 61.82,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0074D29B_14C7_0FDD_41AF_CF38B0E584B8",
 "image": {
  "x": 736.92,
  "y": 402.03,
  "width": 50.78,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_1B6948AB_14D9_1BFD_4190_DF528BEEAB17_HS_15.png",
     "width": 50,
     "class": "ImageResourceLevel",
     "height": 61
    }
   ]
  },
  "height": 61.82
 }
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.51,
   "image": "this.AnimatedImageResource_319EAF78_1229_B956_419D_CB83202B010F",
   "pitch": -10.9,
   "yaw": 170.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.4,
   "hfov": 8.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -10.9
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_026C292D_1238_86CE_41AE_DC3E24D0A2E8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_186A596D_1228_994E_41A3_578D581BD574, this.camera_40D5F2BD_5252_B79C_41C6_78D9D3ED144D); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.71,
   "image": "this.AnimatedImageResource_319B9F7B_1229_B94A_4195_D38CA70CEC77",
   "pitch": -23.72,
   "yaw": 21.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.36,
   "hfov": 6.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.72
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_075986B3_1258_8BDA_41A3_7A1D6D6B43E3",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8, this.camera_40CFB2A1_5252_B7A5_41D3_19C364904CF3); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.69,
   "image": "this.AnimatedImageResource_319B7F7B_1229_B94A_41A1_BF89B16FB333",
   "pitch": -23.82,
   "yaw": -62.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.77,
   "hfov": 7.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.82
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_076A55DD_1267_894E_419C_2184B130AE88",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_403AD292_5252_B664_41C6_923E80FAB629); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 14.07,
   "image": "this.AnimatedImageResource_319B2F7B_1229_B94A_41AD_F8DD0E0E939D",
   "pitch": -26.87,
   "yaw": -100.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.76,
   "hfov": 14.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.87
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_07441720_1269_8AF6_41A8_69DA097E2FE6",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F, this.camera_40C302AF_5252_B7BD_41CE_A89675B28028); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.25,
   "image": "this.AnimatedImageResource_30D6F76A_12DB_894A_4193_5DBDBE6FE88E",
   "pitch": -4.94,
   "yaw": 99.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 99.82,
   "hfov": 6.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.94
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_329AD30E_1228_8ACA_41B1_37CF0071C9B8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187F8580_1228_89B6_41AD_E24BF8B36962, this.camera_43AB31C6_5252_B5EC_41C2_D04BC8F58108); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.47,
   "image": "this.AnimatedImageResource_30D6176A_12DB_894A_4190_74DD7DC7B751",
   "pitch": -4.3,
   "yaw": -3.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.74,
   "hfov": 6.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.3
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_3303A155_122B_895E_41A2_2D83569E2526",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5, this.camera_43BC61D4_5252_B5EC_41D2_881A539DFA37); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 14.45,
   "image": "this.AnimatedImageResource_30CDF763_12DB_897A_41AC_9BCD23D0E672",
   "pitch": -43.36,
   "yaw": 8.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.56,
   "hfov": 14.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.36
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_03EDB5E4_1229_897E_416E_659D76F7573E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7, this.camera_471010ED_5252_B3BC_41C0_11913F518155); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.05,
   "image": "this.AnimatedImageResource_31987F79_1229_B956_41A0_378EF0304D80",
   "pitch": -19.96,
   "yaw": 47.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.68,
   "hfov": 8.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.96
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0458355B_1228_894A_419A_3106FF6504BE",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.2,
   "image": "this.AnimatedImageResource_31983F7A_1229_B94A_41A4_83268FCEC328",
   "pitch": -10.72,
   "yaw": 2.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.87,
   "hfov": 7.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -10.72
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_00A46D8D_1229_79CE_419B_6E2CB89171A2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 11.04,
   "image": "this.AnimatedImageResource_31998F7A_1229_B94A_4193_1D51F99101D9",
   "pitch": -21.55,
   "yaw": 16.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 16.58,
   "hfov": 11.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_3_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.55
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_00D690E5_1229_877E_41A6_9EB3D8A5F601",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.5,
   "image": "this.AnimatedImageResource_31994F7A_1229_B94A_4167_F973BA8BD1EC",
   "pitch": -26.4,
   "yaw": 11.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.45,
   "hfov": 8.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.4
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_01722ACD_1229_7B4E_41AA_CBBBB54BA576",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_18701440_1229_8EB6_418F_527D58837538, this.camera_46D4C036_5252_B2AC_41D0_FFB3EDF4C2A8); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.14,
   "image": "this.AnimatedImageResource_31990F7A_1229_B94A_4171_479CF0CE4255",
   "pitch": -28.04,
   "yaw": -56.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.62,
   "hfov": 8.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.04
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_015C070E_1228_8ACA_41A5_F07CD7D3FEE1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485, this.camera_46C72028_5252_B2A3_41D3_8A73E344D6A9); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.67,
   "image": "this.AnimatedImageResource_319A9F7A_1229_B94A_41A4_065B2BA8DBC5",
   "pitch": -11.11,
   "yaw": 10.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 10.82,
   "hfov": 4.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -11.11
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0660D281_1259_8BB6_41AD_B8E3E97BB848",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.47,
   "image": "this.AnimatedImageResource_319A7F7A_1229_B94A_419F_C1B0A427F097",
   "pitch": -29.28,
   "yaw": -170.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.36,
   "hfov": 10.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.28
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_06D59652_1258_8B5A_4195_F36BD4ABDDFC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7, this.camera_46E57044_5252_B2E3_41CD_591098360EDC); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.05,
   "image": "this.AnimatedImageResource_319BDF7B_1229_B94A_417A_B41304BF76A0",
   "pitch": -25.47,
   "yaw": 158.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.76,
   "hfov": 10.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_4_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.47
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_0592C6F2_1258_8B5A_419C_ED72525BD904",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "cursor": "hand",
 "minHeight": 1,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "id": "IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "width": 49,
 "maxWidth": 49,
 "transparencyActive": true,
 "right": 30,
 "borderSize": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "bottom": 8,
 "height": 37,
 "iconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553.png",
 "verticalAlign": "middle",
 "mode": "push",
 "maxHeight": 37,
 "paddingRight": 0,
 "class": "IconButton",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553_rollover.png",
 "paddingTop": 0,
 "propagateClick": true,
 "paddingLeft": 0
},
{
 "minHeight": 1,
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "children": [
  "this.Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A"
 ],
 "id": "Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "bottom": "0%",
 "height": 51,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "class": "Container",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "propagateClick": true,
 "paddingLeft": 30
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31931F80_1229_B9B6_41AF_3B5A41388E54"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18714D27_1228_9EF9_4193_3EE6470472F1_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318CFF80_1229_B9B6_4164_FE5B6B78F100"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3180CCD1_12D9_9F56_4185_2CF515DD638D"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18ABCD8D_1228_99CE_4187_4FCCF556BC6E_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319D5F78_1229_B956_4177_2832EDB9EEC0"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318D9F82_1229_B9BA_41AE_85D132DEAF35"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18708970_122B_9956_4178_20839723BC76_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318D4F82_1229_B9BA_41A9_C2B49E412C94"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319E6F78_1229_B956_4170_FAFF9404C6E5"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319FDF79_1229_B956_4182_B7BB748741CE"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319F4F79_1229_B956_4194_4E36E8D5AB51"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_37184095_12E8_87DE_41A3_11A6EE50D4F8"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1876C7CB_1229_8949_41A9_AF877A6B8DA7_0_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_37180096_12E8_87DA_419F_685B4BB02511"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1050
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31949F7B_1229_B94A_419C_8728D8AAD0C9"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30CEB764_12DB_897E_417B_CAACBB1DA0D0"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3195CF7C_1229_B94E_41A1_904011B58E56"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31958F7C_1229_B94E_41AD_E629C639B51C"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3194CF7C_1229_B94E_41A1_36399CF44910"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3194AF7C_1229_B94E_41AD_F2E67013F177"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31943F7C_1229_B94E_4178_30D15A327ED1"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18701440_1229_8EB6_418F_527D58837538_1_HS_7_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3195EF7D_1229_B94E_4192_9ABF9AB0754A"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31954F7D_1229_B94E_4192_D4B14861B469"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3196DF7D_1229_B94E_4185_62802A1E3B3F"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30C89766_12DB_897A_41A9_75B1DF864D1C"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31967F7D_1229_B94E_418C_7AE2E731F058"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_1_HS_5_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1050
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3197BF7E_1229_B94A_41AA_2D91BAC62539"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187AF8C2_1228_87BA_41AA_A9C14A3F62F0_0_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30C84766_12DB_897A_41AE_90DD8885766E"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30C33761_12DB_8976_41A2_DA7C446EC8A2"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_186A596D_1228_994E_41A3_578D581BD574_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30C37762_12DB_897A_417D_F43EAC449313"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318DDF81_1229_B9B6_41B2_355FF3DE01AC"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318DBF81_1229_B9B6_4194_25F407D26E3C"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318D1F81_1229_B9B6_41A5_2877AC437546"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318ECF81_1229_B9B6_41A0_F128BC92C2C5"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1872E33D_1228_8ACE_41A7_A3B2E52FCB1F_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_318EAF82_1229_B9BA_4159_0527C98A705F"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18726417_1228_8EDA_41B0_42A5F64DA5AF_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30D4E769_12DB_8976_41AC_B67ED4E8038D"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31976F7E_1229_B94A_41AD_91028EC8B030"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3190CF7E_1229_B94A_41AC_0C5211BF8564"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31905F7E_1229_B94A_4194_235D6FBEBF0E"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31902F7F_1229_B94A_41A8_F004FB1F45EA"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_4_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 840
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31919F7F_1229_B94A_4181_F891E0C2F5F8"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31910F7F_1229_B94A_41B0_C347DFA1E793"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_187DDFAF_1228_B9CA_41A9_B4BE527974D5_1_HS_6_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3192CF7F_1229_B94A_4197_658E023E0A2D"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "levels": [
  {
   "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3192AF7F_1229_B94A_4168_D067D59EFCFD"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_0_HS_1_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30D59768_12DB_8976_41AA_E3AE5211D71A"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3193FF80_1229_B9B6_417D_D3D17569F4E0"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187F8580_1228_89B6_41AD_E24BF8B36962_1_HS_3_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_3193AF80_1229_B9B6_4192_1220BAD1F4A0"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1877E00F_1229_86C9_4183_4E8CE912A02B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319EAF78_1229_B956_419D_CB83202B010F"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319B9F7B_1229_B94A_4195_D38CA70CEC77"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319B7F7B_1229_B94A_41A1_BF89B16FB333"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187EDCAC_1229_BFCE_41A2_6FE2FA3D5485_1_HS_2_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1050
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319B2F7B_1229_B94A_41AD_F8DD0E0E939D"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30D6F76A_12DB_894A_4193_5DBDBE6FE88E"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_1873EF9A_122B_B9CA_41A1_891840FBFE74_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30D6176A_12DB_894A_4190_74DD7DC7B751"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_30CDF763_12DB_897A_41AC_9BCD23D0E672"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31987F79_1229_B956_41A0_378EF0304D80"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31983F7A_1229_B94A_41A4_83268FCEC328"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_187F5F42_1229_9ABB_41B0_B588CD9D5BFB_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31998F7A_1229_B94A_4193_1D51F99101D9"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31994F7A_1229_B94A_4167_F973BA8BD1EC"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_31990F7A_1229_B94A_4171_479CF0CE4255"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319A9F7A_1229_B94A_41A4_065B2BA8DBC5"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319A7F7A_1229_B94A_419F_C1B0A427F097"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_18748707_1229_8ABA_41AE_8DBB1D49E7E8_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_319BDF7B_1229_B94A_417A_B41304BF76A0"
},
{
 "minHeight": 1,
 "paddingBottom": 0,
 "data": {
  "name": "Image8960"
 },
 "width": "6.088%",
 "id": "Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A",
 "maxWidth": 1000,
 "borderSize": 0,
 "url": "skin/Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A.png",
 "horizontalAlign": "center",
 "shadow": false,
 "height": "100%",
 "verticalAlign": "middle",
 "click": "this.openLink('https://www.instagram.com/moon.gpt_/?utm_source=ig_web_button_share_sheet', '_blank')",
 "maxHeight": 1000,
 "paddingRight": 0,
 "class": "Image",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minWidth": 1,
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "propagateClick": false
}],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "paddingLeft": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
